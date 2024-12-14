import React, { useCallback, useState } from 'react';
import { useVoteVideoMutation } from '../../../redux/api/Voting';
import { Share2, ThumbsDown, ThumbsUp } from 'lucide-react';

interface VotingUIProps {
    id: number;
    handleShareClick: () => void;
}

const VotingUI: React.FC<VotingUIProps> = ({ id, handleShareClick }) => {
    const [voteVideo] = useVoteVideoMutation(); // Hook for mutation
    const [isLike, setIsLike] = useState(false);
    const [isDislike, setIsDislike] = useState(false);

    // Handle vote
    const handleVote = useCallback(
        (vote: string) => {
            setIsLike((prev) => (vote === 'like' ? !prev : false)); // Toggle like or reset
            setIsDislike((prev) => (vote === 'dislike' ? !prev : false)); // Toggle dislike or reset

            // Send vote to the API
            voteVideo({
                videoId: id,
                voteType: vote, // Either 'like' or 'dislike'
            })
                .unwrap()
                .then(() => {
                    console.log(`Vote ${vote} successful for video ID ${id}`);
                })
                .catch((error) => {
                    console.error('Vote failed:', error);
                });
        },
        [id, voteVideo]
    );

    return (
        <div className="flex items-center gap-4">
            <button
                onClick={() => handleVote('like')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                    isLike ? 'bg-primary-hover text-neutral-light' : 'hover:bg-primary-hover/10'
                }`}
            >
                <ThumbsUp className={`w-5 h-5 text-[var(--soft-blue)] ${isLike ? 'fill-current' : ''}`} />
            </button>

            <button
                onClick={() => handleVote('dislike')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                    isDislike ? 'bg-primary-hover text-neutral-light' : 'hover:bg-primary-hover/10'
                }`}
            >
                <ThumbsDown className={`w-5 h-5 text-[var(--soft-blue)] ${isDislike ? 'fill-current' : ''}`} />
            </button>

            <button
                onClick={handleShareClick}
                className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-primary-hover/10 transition-all"
            >
                <Share2 className="w-5 h-5 text-[var(--soft-blue)]" />
                <span className='text-[var(--soft-blue)]' >Share</span>
            </button>
        </div>
    );
};

export default React.memo(VotingUI);