import { createClient } from '@/utils/supabase/server';
import type { Comment } from '@/types/supabase/comment';
import RealtimeCommentSection from './RealtimeCommentSection';

interface CommentSectionProps {
	albumId: number;
}

const CommentSection = async ({ albumId }: CommentSectionProps) => {
	const supabase = createClient();

	// Fetch comments where album_id = albumId
	const commentResult = await supabase
		.from('comments')
		.select()
		.eq('album_id', albumId);
	const comments: Comment[] | null = commentResult.data;

	return (
		<div>
			<RealtimeCommentSection
				serverComments={comments ?? []}
				albumId={albumId}
			/>
		</div>
	);
};

export default CommentSection;
