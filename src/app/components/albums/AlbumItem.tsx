import type { Album } from '@/src/types/supabase/album';
import CommentSection from '../comments/CommentSection';
import Image from 'next/image';

interface AlbumItemProps {
	album: Album;
}

const AlbumItem = ({ album }: AlbumItemProps) => {
	return (
		<div className="flex flex-col bg-slate-50 gap-4 w-full p-4 border border-slate-300 rounded-xl">
			<div className="flex flex-col md:flex-row border-b border-slate-300 pb-4">
				<Image
					src={album.img_url}
					alt={album.name}
					width={500}
					height={500}
					className="w-full md:w-1/3 aspect-square rounded-md"
				/>
				<div className="p-4 flex flex-col">
					<h3 className="text-3xl font-semibold">{album.name}</h3>
					<span>{album.artist}</span>
					<span>{album.year}</span>
				</div>
			</div>
			<CommentSection albumId={album.id} />
		</div>
	);
};

export default AlbumItem;
