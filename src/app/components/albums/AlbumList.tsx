import { createClient } from '@/utils/supabase/server';
import type { Album, AlbumWithComments } from '@/src/types/supabase/album';
import type { Comment } from '@/src/types/supabase/comment';
import AlbumItem from './AlbumItem';

const AlbumList = async () => {
	const supabase = createClient();

	// Fetch albums
	const albumResult = await supabase.from('albums').select();
	const albums: Album[] | null = albumResult.data;

	return (
		<div className="w-full">
			<ul className="flex flex-col gap-8 p-4 md:p-12">
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
