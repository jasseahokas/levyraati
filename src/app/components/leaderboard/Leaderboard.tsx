'use client';
import type { Album } from '@/src/types/supabase/album';
import { createClient } from '@/utils/supabase/client';
import { useState, useEffect } from 'react';
import LeaderboardItem from './LeaderboardItem';

interface LeaderboardProps {
	serverAlbums: Album[];
}

const Leaderboard = ({ serverAlbums }: LeaderboardProps) => {
	const supabase = createClient();
	const [albums, setAlbums] = useState<Album[]>(serverAlbums);
	const [topThreeAlbums, setTopThreeAlbums] = useState<Album[]>([]);

	useEffect(() => {
		setTopThreeAlbums(
			serverAlbums
				.sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
				.slice(0, 3),
		);
	}, [serverAlbums]);

	useEffect(() => {
		const channel = supabase
			.channel('realtime_albums')
			.on(
				'postgres_changes',
				{
					event: 'UPDATE',
					schema: 'public',
					table: 'albums',
				},
				(payload) => {
					console.log('New album received', payload);
					const updatedAlbum = payload.new as Album;
					const updatedAlbumIndex = albums.findIndex(
						(album) => album.id === updatedAlbum.id,
					);
					const newAlbums = [...albums];
					newAlbums[updatedAlbumIndex] = updatedAlbum;
					setAlbums(newAlbums);
					setTopThreeAlbums(
						newAlbums
							.sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
							.slice(0, 3),
					);
				},
			)
			.subscribe();

		return () => {
			supabase.removeChannel(channel);
		};
	}, [albums, supabase]);

	return (
		<div className="w-full bg-neutral-100 border border-neutral-200 p-4 md:p-12">
			<h2>
				<span>🔥</span>Top 3
			</h2>
			<ul className="flex flex-col mt-2 md:mt-4">
				{albums?.map((album, index) => (
					<li key={album.id}>
						<LeaderboardItem album={album} index={index} />
					</li>
				))}
			</ul>
		</div>
	);
};

export default Leaderboard;
