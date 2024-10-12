import type { Comment } from '@/types/supabase/comment';
import { dateFormat } from '@/utils/frontend/dateFormat';

interface CommentItemProps {
	comment: Comment;
}

const CommentItem = ({ comment }: CommentItemProps) => {
	return (
		<div className="flex flex-col p-4 gap-4 border border w-full">
			<p>{comment.content}</p>
			<div className="flex w-full justify-between items-center">
				<span>{comment.alias}</span>
				<span className="text-sm opacity-60">
					{dateFormat(comment.created_at)}
				</span>
			</div>
		</div>
	);
};

export default CommentItem;
