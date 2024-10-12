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
		.eq('album_id', albumId);
	const comments: Comment[] | null = commentResult.data;

	return (
		<div className="w-full max-w-md">
			<h4>Kommentit</h4>
			<RealtimeCommentSection
				serverComments={comments ?? []}
				albumId={albumId}
			/>
		</div>
	);
};

export default CommentSection;
