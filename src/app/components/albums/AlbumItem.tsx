import type { Album } from '@/src/types/supabase/album';
import CommentSection from '../comments/CommentSection';
import Image from 'next/image';

interface AlbumItemProps {
	album: Album;
}

const AlbumItem = ({ album }: AlbumItemProps) => {
	return (
		<div className="flex flex-col md:flex-row bg-white gap-4 w-full p-4">
			<div className="flex flex-col border-b border-slate-300 pb-4 w-full">
				<Image
					src={album.img_url}
					alt={album.name}
					width={500}
					height={500}
					className="w-full aspect-square"
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
