import React, { useCallback, useState } from 'react';
import { Share2, ThumbsDown, ThumbsUp } from 'lucide-react';
import { useLikeMutation, useUnlikeMutation } from '../../../services/api/vote/Voting';
import { LoginModalBox } from '../auth/LoginModalBox';
import Cookies from 'js-cookie';

interface VotingUIProps {
    id: number;
    handleShareClick: () => void;
}

const VotingUI: React.FC<VotingUIProps> = ({ id, handleShareClick }) => {
    const [isLike, setIsLike] = useState(false);
    const [isDislike, setIsDislike] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const token = Cookies.get('token');

    // Mutations from your Voting API
    const [like, { isLoading: isLikeLoading }] = useLikeMutation();
    const [unlike, { isLoading: isUnlikeLoading }] = useUnlikeMutation();

    // Handle vote
    const handleVote = useCallback(
        (vote: string) => {
            if (!token) {
                setIsModalOpen(true);
                return; // Stop further execution if no token
            }
            
            setIsLike((prev) => (vote === 'like' ? !prev : false)); // Toggle like or reset
            setIsDislike((prev) => (vote === 'dislike' ? !prev : false)); // Toggle dislike or reset

            // Make the API call based on the vote
            if (vote === 'like') {
                like(id); // Send the like request
            } else if (vote === 'dislike') {
                unlike(id); // Send the unlike request
            }
        },
        [id, like, unlike, token] // Add token to dependency array
    );

    return (
        <div className="flex items-center gap-4">
            <button
                onClick={() => handleVote('like')}
                disabled={isLikeLoading || isUnlikeLoading} // Disable buttons when request is in progress
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${isLike ? 'bg-primary-hover text-neutral-light' : 'hover:bg-primary-hover/10'}`}
            >
                <ThumbsUp className={`w-5 h-5 text-[var(--soft-blue)] ${isLike ? 'fill-current' : ''}`} />
            </button>

            <button
                onClick={() => handleVote('dislike')}
                disabled={isLikeLoading || isUnlikeLoading} // Disable buttons when request is in progress
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${isDislike ? 'bg-primary-hover text-neutral-light' : 'hover:bg-primary-hover/10'}`}
            >
                <ThumbsDown className={`w-5 h-5 text-[var(--soft-blue)] ${isDislike ? 'fill-current' : ''}`} />
            </button>

            <button
                onClick={handleShareClick}
                className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-primary-hover/10 transition-all"
            >
                <Share2 className="w-5 h-5 text-[var(--soft-blue)]" />
                <span className='text-[var(--soft-blue)]'>Share</span>
            </button>

            {/* //// login box model */}
            <LoginModalBox isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default React.memo(VotingUI);
