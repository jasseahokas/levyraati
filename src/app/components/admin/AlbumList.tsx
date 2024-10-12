'use client';

import type { Album } from '@/src/types/supabase/album';
import { createClient } from '@/utils/supabase/client';
import { useState, useEffect } from 'react';

interface AlbumListProps {
	serverAlbums: Album[];
}

const AlbumList = ({ serverAlbums }: AlbumListProps) => {
	const supabase = createClient();
	const [albums, setAlbums] = useState(serverAlbums);

	useEffect(() => {
		const channel = supabase
			.channel('realtime_albums')
			.on(
				'postgres_changes',
				{
					event: 'INSERT',
					schema: 'public',
					table: 'albums',
				},
				(payload) => {
					console.log('New album received', payload);
					setAlbums([...albums, payload.new as Album]);
				},
			)
			.subscribe();

		return () => {
			supabase.removeChannel(channel);
		};
	}, [albums, supabase]);

	const onDeleteAlbum = async (id: number) => {
		const { data, error } = await supabase
			.from('albums')
			.delete()
			.eq('id', id);
		if (error) {
			console.error('Error deleting album:', error);
		} else {
			console.log('Album deleted successfully:', data);
		}
	};

	return (
		<div className="w-full">
			<ul>
				{albums.map((album) => (
					<li
						key={album.id}
						className="flex justify-between items-center py-2 border-b border-neutral-200 text-sm"
					>
						<div className="flex flex-col">
							<span className="font-semibold text-black text-lg">
								{album.name}
							</span>
							<span>{album.artist}</span>
							<span>{album.year}</span>
						</div>
						<button
							onClick={() => onDeleteAlbum(album.id)}
							className="bg-red-500 text-white py-1 px-2 hover:bg-red-600 transition-colors"
						>
							Poista
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default AlbumList;
