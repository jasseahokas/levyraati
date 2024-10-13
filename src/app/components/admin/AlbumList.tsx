'use client';

import type { Album } from '@/src/types/supabase/album';
import { createClient } from '@/utils/supabase/client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

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
					setAlbums([payload.new as Album, ...albums]);
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

	console.log(albums);
	return (
		<div className="w-full">
			<h4>Albumit</h4>
			<ul className="border-t border-neutral-300">
				{albums.map((album) => (
					<li
						key={album.id}
						className="flex justify-between items-center py-2 border-b border-neutral-200 text-sm"
					>
						<div className="flex items-center gap-4">
							<Image
								src={
									album.img_url
										? album.img_url
										: '/placeholder.svg'
								}
								alt={album.name}
								width={64}
								height={64}
								className="size-16 object-cover"
							/>
							<div className="flex flex-col">
								<span className="font-semibold text-black text-lg">
									{album.name}
								</span>
								<span>{album.artist}</span>
								<span>{album.year}</span>
							</div>
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
