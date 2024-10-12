import { createClient } from '@/utils/supabase/server';
import RealtimeScoreSection from './RealtimeScoreSection';

interface ScoreSectionProps {
	albumId: number;
	currentPoints: number;
}

const ScoreSection = async ({ albumId, currentPoints }: ScoreSectionProps) => {
	return (
		<div className="p-4 bg-white">
			<RealtimeScoreSection
				albumId={albumId}
				currentScore={currentPoints}
			/>
		</div>
	);
};

export default ScoreSection;
