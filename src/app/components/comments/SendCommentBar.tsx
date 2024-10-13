'use client';

import type { Comment } from '@/src/types/supabase/comment';
import { createClient } from '@/utils/supabase/client';
import { useState } from 'react';

interface SendCommentBarProps {
	albumId: number;
	setComments: (comments: Comment[]) => void;
}

const SendCommentBar = ({ albumId, setComments }: SendCommentBarProps) => {
	const [comment, setComment] = useState<string>('');
	const [alias, setAlias] = useState<string>('');
	const supabase = createClient();
	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const { data, error } = await supabase.from('comments').insert([
			{
				album_id: albumId,
				alias,
				content: comment,
			},
		]);
		if (error) {
			console.error('Error adding comment:', error);
		} else {
			console.log('Comment added', data);
			setComment('');
		}
	};

	return (
		<div className="w-full px-4 pb-4 pt-2 border-t border-neutral-200 bg-white">
			<form onSubmit={onSubmit} className="flex flex-col gap-1">
				<div>
					<label className="text-sm" htmlFor="alias">
						Käyttäjänimi
					</label>
					<input
						type="text"
						name="alias"
						placeholder="Jonne"
						className="w-full py-1 px-2 bg-white border border-neutral-400 focus:outline-orange-500"
						value={alias}
						onChange={(e) => setAlias(e.target.value)}
						required
					/>
				</div>
				<div>
					<label className="text-sm" htmlFor="kommentti">
						Kommentti
					</label>
					<textarea
						placeholder="Skibidi"
						name="kommentti"
						className="w-full py-1 px-2 bg-white border border-neutral-400 focus:outline-orange-500"
						value={comment}
						onChange={(e) => setComment(e.target.value)}
						required
					/>
				</div>
				<button
					type="submit"
					className="w-full p-2 bg-primary-500 text-white font-semibold bg-gradient-to-br from-orange-500  to-red-700 hover:from-orange-600 hover:to-red-900"
				>
					Lähetä
				</button>
			</form>
		</div>
	);
};

export default SendCommentBar;
