'use client';

import { createClient } from '@/utils/supabase/client';
import { useState, useEffect } from 'react';

interface RealtimeScoreSectionProps {
	albumId: number;
	currentScore: number;
}

const RealtimeScoreSection = ({
	albumId,
	currentScore,
}: RealtimeScoreSectionProps) => {
	const supabase = createClient();
	const [score, setScore] = useState(currentScore);

	const onAddPoint = async () => {
		setScore(score + 1);

		const { data, error } = await supabase
			.from('albums')
			.update({ score: score + 1 })
			.eq('id', albumId);
		if (error) {
			console.error('Error adding point:', error);
		} else {
			console.log('Score updated', data);
		}
	};

	useEffect(() => {
		const channel = supabase
			.channel('realtime_scores')
			.on(
				'postgres_changes',
				{
					event: 'UPDATE',
					schema: 'public',
					table: 'albums',
				},
				(payload) => {
					console.log('Change received!', payload);
					if (payload.new.id === albumId) {
						setScore(payload.new.score);
					}
				},
			)
			.subscribe();

		return () => {
			supabase.removeChannel(channel);
		};
	}, [albumId, score, supabase]);

	return (
		<div className="flex items-center justify-between">
			<p className="text-4xl">
				<span>🔥</span>
				<span className="font-bold text-transparent bg-clip-text bg-gradient-to-br from-orange-500  to-red-700">
					{score}
				</span>
			</p>
			<button
				onClick={onAddPoint}
				className="px-6 py-2 text-lg font-semibold bg-gradient-to-br from-orange-500  to-red-700 hover:from-orange-600 hover:to-red-900"
			>
				<span>🔥</span>
				<span className="text-white"> Hypetä </span>
				<span>🔥</span>
			</button>
		</div>
	);
};

export default RealtimeScoreSection;
