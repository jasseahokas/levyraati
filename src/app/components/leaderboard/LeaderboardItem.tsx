import type { Album } from '@/src/types/supabase/album';
import Image from 'next/image';

interface LeaderboardItemProps {
	album: Album;
	index: number;
}

const LeaderboardItem = ({ album, index }: LeaderboardItemProps) => {
	return (
		<div className="flex items-center justify-between py-4 border-b border-neutral-200">
			<div className="flex items-center gap-4">
				<span className="text-lg font-semibold">{index + 1}.</span>
				<Image
					src={album.img_url ?? '/placeholder.svg'}
					alt={album.name}
					width={64}
					height={64}
					className="aspect-square object-cover"
				/>
				<div className="flex flex-col gap-1">
					<span>{album.name}</span>
					<span>{album.artist}</span>
				</div>
			</div>
			<p className="text-4xl">
				<span>🔥</span>
				<span className="font-bold text-transparent bg-clip-text bg-gradient-to-br from-orange-500  to-red-700">
					{album.score ?? 0}
				</span>
			</p>
		</div>
	);
};

export default LeaderboardItem;
