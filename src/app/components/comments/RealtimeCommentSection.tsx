'use client';

import { useEffect, useState } from 'react';
import type { Comment } from '@/src/types/supabase/comment';
import { createClient } from '@/utils/supabase/client';
import CommentList from './CommentList';
import SendCommentBar from './SendCommentBar';

interface RealtimeCommentSection {
	serverComments: Comment[];
	albumId: number;
}

const RealtimeCommentSection = ({
	serverComments,
	albumId,
}: RealtimeCommentSection) => {
	const supabase = createClient();
	const [comments, setComments] = useState<Comment[]>(serverComments);

	useEffect(() => {
		const channel = supabase
			.channel('realtime_comments')
			.on(
				'postgres_changes',
				{
					event: 'INSERT',
					schema: 'public',
					table: 'comments',
				},
				(payload) => {
					console.log('New comment received', albumId, payload);
					if (payload.new.album_id === albumId) {
						console.log('Adding new comment to list');
						setComments([...comments, payload.new as Comment]);
					}
				},
			)
			.subscribe();

		return () => {
			supabase.removeChannel(channel);
		};
	}, [albumId, comments, supabase]);

	return (
		<div className="bg-white h-[32rem] md:h-[40rem] relative flex flex-col justify-between">
			<CommentList comments={comments} />
			<SendCommentBar albumId={albumId} setComments={setComments} />
		</div>
	);
};

export default RealtimeCommentSection;
