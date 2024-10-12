import type { Comment } from '@/src/types/supabase/comment';
import { useRef, useEffect } from 'react';
import CommentItem from './CommentItem';

interface CommentListProps {
	comments: Comment[];
}

const CommentList = ({ comments }: CommentListProps) => {
	const containerRef = useRef<HTMLUListElement>(null);

	const scrollToBottom = () => {
		if (containerRef.current) {
			containerRef.current.scrollTop = containerRef.current.scrollHeight;
		}
	};

	useEffect(() => {
		scrollToBottom();
	}, [comments]);

	return (
		<ul
			className="p-4 flex-grow overflow-auto scroll-smooth"
			ref={containerRef}
		>
			{comments.length === 0 && (
				<p className="text-center my-6 text-neutral-400">
					Ole ensimmäinen kommentoija ja voita PALKINTOJA!!!!!!!!
				</p>
			)}
			{comments.map((comment) => (
				<li key={comment.id}>
					<CommentItem comment={comment} />
				</li>
			))}
		</ul>
	);
};

export default CommentList;
