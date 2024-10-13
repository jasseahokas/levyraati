import { createClient } from '@/utils/supabase/server';
import type { Album, AlbumWithComments } from '@/src/types/supabase/album';
import AlbumItem from './AlbumItem';
import Leaderboard from '../leaderboard/Leaderboard';

const AlbumList = async () => {
	const supabase = createClient();

	// Fetch albums
	const albumResult = await supabase
		.from('albums')
		.select()
		.order('id', { ascending: true });
	const albums: Album[] | null = albumResult.data;

	return (
		<div className="w-full flex flex-col gap-4 md:gap-8">
			<div className="pb-4">
				<Leaderboard serverAlbums={albums ?? []} />
			</div>
			<h2>Albumit</h2>
			<ul className="flex flex-col gap-8">
				{albums?.map((album) => (
					<li key={album.id}>
						<AlbumItem album={album} />
					</li>
				))}
			</ul>
		</div>
	);
};

export default AlbumList;
