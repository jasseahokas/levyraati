import type { Album } from '@/src/types/supabase/album';
import CommentSection from '../comments/CommentSection';
import Image from 'next/image';
import ScoreSection from '../points/ScoreSection';

interface AlbumItemProps {
	album: Album;
}

const AlbumItem = ({ album }: AlbumItemProps) => {
	return (
		<div className="flex flex-col md:flex-row gap-4 w-full p-4 bg-neutral-100 border border-neutral-200">
			<div className="flex flex-col pb-4 w-full">
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
			<div className="w-full max-w-md flex flex-col gap-4">
				<ScoreSection albumId={album.id} currentPoints={album.score} />
				<CommentSection albumId={album.id} />
			</div>
		</div>
	);
};

export default AlbumItem;
