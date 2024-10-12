import type { Comment } from '@/types/supabase/comment';
import CommentItem from './CommentItem';

interface CommentListProps {
	comments: Comment[];
}

const CommentList = ({ comments }: CommentListProps) => {
	return (
		<ul>
			{comments.map((comment) => (
				<li key={comment.id}>
					<CommentItem comment={comment} />
				</li>
			))}
		</ul>
	);
};

export default CommentList;
