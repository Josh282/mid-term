import { useState, useEffect } from 'react';
import axios from 'axios';

const useLiveComments = (videoId) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState({ name:'', comment:'' });

    const fetchComments = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/videos/${videoId}/comments`);
            setComments(response.data.comments);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const handleCommentSubmit = async () => {
        try {
            await axios.post(`http://localhost:5000/videos/${videoId}/comments`, {
                userName: newComment.name,
                commentText: newComment.comment,
            });
            fetchComments();
            setNewComment({ name: '', comment: '' });
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };

    useEffect(() => {
        fetchComments();
    }, []);
    
    return { comments, newComment, setNewComment, handleCommentSubmit};
};

export default useLiveComments;