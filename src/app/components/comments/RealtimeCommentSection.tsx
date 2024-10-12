'use client';

import { useEffect, useState } from 'react';
import type { Comment } from '@/src/types/supabase/comment';
import { createClient } from '@/utils/supabase/client';
import CommentList from './CommentList';

interface RealtimeCommentSection {
	serverComments: Comment[];
	albumId: number;
}

const RealtimeCommentSection = ({
	serverComments,
	albumId,
}: RealtimeCommentSection) => {
	const [comments, setComments] = useState<Comment[]>(serverComments);
	useEffect(() => {
		const supabase = createClient();
		const channel = supabase
			.channel('realtime_comments')
			.on(
				'postgres_changes',
				{
					event: 'INSERT',
					schema: 'public',
					table: 'comments',
					filter: `album_id =eq${albumId}`,
				},
				(payload) => {
					console.log('Change received!', payload);
					setComments([...comments, payload.new as Comment]);
				},
			)
			.subscribe();

		return () => {
			supabase.removeChannel(channel);
		};
	}, [albumId, comments]);
	return (
		<div>
			<CommentList comments={serverComments} />
		</div>
	);
};

export default RealtimeCommentSection;
