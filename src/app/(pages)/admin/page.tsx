import { createClient } from '@/utils/supabase/server';
import type { Album } from '@/src/types/supabase/album';
import AlbumList from '../../components/admin/AlbumList';
import Link from 'next/link';
import AddAlbumForm from '../../components/admin/AddAlbumForm';
import { login, signup } from '../../actions/login';

const AdminPage = async () => {
	const supabase = createClient();

	// Fetch albums
	const albumResult = await supabase.from('albums').select();
	const albums: Album[] | null = albumResult.data;

	return (
		<>
			<div className="p-8 w-full max-w-4xl mx-auto">
				<div>
					<Link
						href="/"
						className="size-8 border border-neutral-200 rounded-full flex items-center justify-center group"
					>
						<svg
							width="13"
							height="11"
							viewBox="0 0 13 11"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							className="transition-transform group-hover:-translate-x-1"
						>
							<path
								d="M5.67099 11.0002L0.580078 5.90927L5.67099 0.818359L6.54599 1.682L2.94371 5.28427H12.2733V6.53427H2.94371L6.54599 10.1252L5.67099 11.0002Z"
								fill="black"
							/>
						</svg>
					</Link>
				</div>
				<div className="w-full py-8">
					<h1>Lol löysit admin-sivulle</h1>
				</div>
				<div className="flex flex-col gap-8">
					<AddAlbumForm />
					<AlbumList serverAlbums={albums ?? []} />
				</div>
			</div>
		</>
	);
};

export default AdminPage;
