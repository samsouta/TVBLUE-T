import React, { ReactNode, useState } from 'react'
import { MessageCircle, Eye } from 'lucide-react';
import { FaHeart } from 'react-icons/fa';
import { useGetCommentsQuery, usePostCommentMutation } from '../../../redux/api/comment';
import VotingUI from './VotingUI';
import { formatViews } from '../../../utils/formatViews';

type DataType = {
    id: number;
    title: string;
    description: string;
    duration: string;
    posted_date: string;
    rating_count: string;
    rating_total: string;
    url: string;
    view_count: string;
};

interface CommentUIProps {
    vidId:number;
    ratingPercentage:ReactNode;
    relativeDate:string;
    data:DataType;
    handleShareClick: () => void;
}

const CommentUI: React.FC<CommentUIProps> = ({
    vidId,
    ratingPercentage,
    relativeDate,
    handleShareClick,
    data}) => {
    const [newComment, setNewComment] = useState('');
    
    const [postComment, { isLoading }] = usePostCommentMutation();
    const { data: comments, isLoading: isFetchingComments, isError: fetchCommentsError } = useGetCommentsQuery(vidId);
    
    const handleCommentSubmit = async (e:any) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        try {
            await postComment({
                id: vidId,
                comment: newComment
            });
            setNewComment('');
        } catch (error) {
            console.error("Failed to post comment:", error);
        }
    };
    const commentList = Array.isArray(comments) ? comments : [];
    return (
        <div className="text-neutral-light">
            <div className="max-w-6xl mx-auto xl:mx-0 py-2">
                {/* Video Info Section */}
                <div className="bg-[var(--medium-blue)] backdrop-blur-sm rounded-xl p-6 mb-6 shadow-lg ring-1 ring-white/10">
                    <h1 className="text-md xl:text-2xl text-[var(--light-blue)]  mb-2 open-sans">
                        {data?.title}
                    </h1>
                    <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <Eye className="w-5 h-5 text-[var(--soft-blue)]" />
                                <span className="text-[var(--soft-blue)]">
                                    {formatViews({views:data?.view_count })}
                                </span>
                            </div>
                            <span className="text-[var(--dark-blue)]">•</span>
                            <span className="text-[var(--soft-blue)]">{relativeDate}</span>
                            <span className="text-[var(--dark-blue)]">•</span>
                            <span className="flex items-center text-[var(--soft-blue)] montserrat">
                                <FaHeart className="text-2xl text-[var(--soft-blue)] mr-2" />
                                {ratingPercentage}
                            </span>
                        </div>
                        <VotingUI id={data?.id} handleShareClick={handleShareClick} />
                    </div>
                </div>

                {/* Comments Section */}
                <div className="bg-[var(--medium-blue)] max-h-[300px] overflow-y-scroll backdrop-blur-sm rounded-xl p-6 shadow-lg ring-1 ring-white/10">
                    <div className="flex items-center gap-2 mb-6">
                        <MessageCircle className="w-5 h-5 text-[var(--light-blue)]" />
                        <h2 className="text-xl font-semibold text-[var(--light-blue)]">
                            {commentList.length} Comments
                        </h2>
                    </div>

                    <form onSubmit={handleCommentSubmit} className="flex gap-4 mb-8">
                        <img
                            src="https://i.pinimg.com/736x/54/db/c5/54dbc58a3014e8b438c3c8f149a410c9.jpg"
                            alt="TopFan"
                            className="w-10 h-10 rounded-full object-cover ring-2 ring-[var(--dark-blue)]"
                        />
                        <div className="flex-1">
                            <input
                                type="text"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Add a comment..."
                                className="w-full px-4 py-2 rounded-lg bg-[var(--dark-blue)] border border-neutral-darker/20 focus:outline-none focus:border-[var(--soft-blue)] focus:ring-1 focus:ring-[var(--soft-blue)] transition-colors text-[var(--white)] placeholder-[var(--medium-blue)]"
                            />
                            <div className="flex justify-end gap-2 mt-2">
                                <button
                                    type="button"
                                    onClick={() => setNewComment('')}
                                    className="px-4 py-2 text-neutral-medium hover:bg-white/10 rounded-full transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-[var(--dark-blue)] cursor-pointer text-neutral-light rounded-full transition-colors disabled:opacity-50"
                                    disabled={!newComment.trim() || isLoading}
                                >
                                    {isLoading ? "posting" : "comment"}
                                </button>
                            </div>
                        </div>
                    </form>
                    {/* Conditional Rendering */}
                    <div className="space-y-6 ">
                        {isFetchingComments ? (
                            <p className="text-neutral-medium">Loading comments...</p>
                        ) : fetchCommentsError ? (
                            <p className="text-red-500">Error loading comments. Please try again.</p>
                        ) : commentList.length === 0 ? (
                            <p className="text-neutral-medium">No comments yet.</p>
                        ) : (

                            commentList.map((comment) => (
                                <div key={comment.id} className="flex gap-4">
                                    <img
                                        src='https://i.pinimg.com/736x/54/db/c5/54dbc58a3014e8b438c3c8f149a410c9.jpg'
                                        alt={`topfan`}
                                        className="w-10 h-10 rounded-full object-cover ring-2 ring-primary-hover"
                                    />
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h4 className="font-semibold text-neutral-light">TopFan</h4>
                                        </div>
                                        <p className="mt-1 text-neutral-muted">{comment.comment}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default React.memo(CommentUI);