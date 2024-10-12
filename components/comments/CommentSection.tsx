import { createClient } from '@/utils/supabase/server';
import type { Comment } from "@/types/supabase/comment";
import RealtimeCommentSection from './RealtimeCommentSection';

const CommentSection = async () => {
    const supabase = createClient();

    const result = await supabase.from("comments").select();
    const comments: Comment[] | null = result.data;

    return (
        <div>
            <RealtimeCommentSection serverComments={comments ?? []} />
        </div>
    )
}

export default CommentSection;