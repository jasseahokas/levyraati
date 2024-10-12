import type { Comment } from '@/src/types/supabase/comment';
import { dateFormat } from '@/utils/frontend/dateFormat';

interface CommentItemProps {
	comment: Comment;
}

const CommentItem = ({ comment }: CommentItemProps) => {
	return (
		<div className="flex flex-col py-2 gap-1 border-b border-neutral-200 w-full">
			<div className="flex flex-col w-full">
				<span className="font-semibold">{comment.alias}</span>
				<span className="text-sm opacity-60">
					{dateFormat(comment.created_at)}
				</span>
			</div>
			<p>{comment.content}</p>
		</div>
	);
};

export default CommentItem;
