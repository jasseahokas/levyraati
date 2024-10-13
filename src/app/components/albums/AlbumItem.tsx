import type { Album } from '@/src/types/supabase/album';
import CommentSection from '../comments/CommentSection';
import Image from 'next/image';
import ScoreSection from '../points/ScoreSection';
import SpotifyButton from './SpotifyButton';

interface AlbumItemProps {
	album: Album;
}

//https://open.spotify.com/album/39u9enFU8VMMvb01W1xVIi?si=Ao4QQOlaSKeMSIVHK2PYlQ

const AlbumItem = ({ album }: AlbumItemProps) => {
	return (
		<div className="flex flex-col md:flex-row gap-2 md:gap-8 w-full p-2 md:p-8 bg-neutral-100 border border-neutral-200">
			<div className="flex flex-col pb-4 gap-4 w-full max-w-md">
				<Image
					src={album.img_url ?? '/placeholder.svg'}
					alt={album.name}
					width={500}
					height={500}
					className="w-full aspect-square object-cover"
				/>
				<div className="flex justify-between">
					<div className="flex flex-col">
						<h3 className="text-3xl font-semibold">{album.name}</h3>
						<span>{album.artist}</span>
						<span>{album.year}</span>
					</div>
					{album.spotify_share && (
						<SpotifyButton url={album.spotify_share} />
					)}
				</div>
			</div>
			<div className="w-full flex flex-col gap-2 md:gap-4">
				<ScoreSection
					albumId={album.id}
					currentPoints={album.score ?? 0}
				/>
				<CommentSection albumId={album.id} />
			</div>
		</div>
	);
};

export default AlbumItem;
