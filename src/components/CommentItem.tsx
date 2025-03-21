import {Comment} from "../interfaces/Comment";
import {LeftArrow} from "../assets/icons/LeftArrow";
import {api} from "../classes/API.ts";
import {useState} from "react";
import {CommentForm} from "./CommentForm.tsx";

export function CommentItem({ comment, onReplayCallback }: { comment: Comment, onReplayCallback?:() => void }) {

    const [showReply, setShowReply] = useState(false);
    const [replyText, setReplyText] = useState('');

    const handleReply = async () => {
        if (!replyText.trim()) return;

        try {
            await api.createTaskComment({
                task_id: comment.task_id,
                text: replyText,
                parent_id: comment.id
            });

            setReplyText('');
            setShowReply(false);
            if (onReplayCallback)
                onReplayCallback();
        } catch (error) {
            console.error("Reply failed", error);
        }
    };

    return (
        <div className='flex gap-3'>
            <img src={comment.author_avatar} alt='img' className='h-[38px] w-[38px] rounded-full object-cover' />
            <div className='flex-1'>
                <h3 className='text-[#212529] font-medium text-lg mb-2'>{comment.author_nickname}</h3>
                <p className='text-[#343A40] text-[16px] font-[350] mb-2.5'>{comment.text}</p>

                {comment.parent_id === null && (
                    <button
                        onClick={() => setShowReply(prev => !prev)}
                        className='cursor-pointer flex text-[#8338EC] text-xs font-normal gap-[6px]'>
                        <LeftArrow /> უპასუხე
                    </button>
                )}

                {showReply && (
                    <CommentForm
                        className='mt-3 mr-5'
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        onSubmit={handleReply}
                    />
                )}

                {comment.sub_comments && (
                    <div className='flex flex-col w-full gap-5 mt-5'>
                        {comment.sub_comments.map(sub => (
                            <CommentItem key={"sub_comment_" + sub.id} comment={sub} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
