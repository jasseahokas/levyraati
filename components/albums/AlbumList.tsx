import { createClient } from '@/utils/supabase/server';
import type { Album, AlbumWithComments } from '@/types/supabase/album';
import type { Comment } from '@/types/supabase/comment';
import AlbumItem from './AlbumItem';

const AlbumList = async () => {
	const supabase = createClient();

	// Fetch albums
	const albumResult = await supabase.from('albums').select();
	const albums: Album[] | null = albumResult.data;

	return (
		<div className="w-full max-w-2xl mx-auto">
			<ul>
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
