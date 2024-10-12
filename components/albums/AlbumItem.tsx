import type { Album } from '@/types/supabase/album';
import CommentSection from '../comments/CommentSection';
import Image from 'next/image';

interface AlbumItemProps {
	album: Album;
}

const AlbumItem = ({ album }: AlbumItemProps) => {
	return (
		<div className="flex flex-col gap-4 w-full">
			<Image
				src={album.img_url}
				alt={album.name}
				width={500}
				height={500}
				className="w-full"
			/>
			<h3>{album.name}</h3>
			<span>{album.artist}</span>
			<span>{album.year}</span>
			<CommentSection albumId={album.id} />
		</div>
	);
};

export default AlbumItem;
