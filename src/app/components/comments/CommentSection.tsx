import { createClient } from '@/utils/supabase/server';
import type { Comment } from '@/src/types/supabase/comment';
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
		.eq('album_id', albumId)
		.order('created_at', { ascending: true });
	const comments: Comment[] | null = commentResult.data;

	return (
		<>
			<RealtimeCommentSection
				serverComments={comments ?? []}
				albumId={albumId}
			/>
		</>
	);
};

export default CommentSection;
