import { useState, useEffect } from 'react';
import axios from 'axios';
import socketIOClient from 'socket.io-client';

const useLiveComments = (videoId) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState({ name:'', comment:'' });

    const fetchComments = async () => {
        try {
            const apiURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
            const response = await axios.get(`${apiURL}/videos/${videoId}/comments`);
            const sortedComments = response.data.comments.sort((a, b) => {
                return new Date(a.createdAt) - new Date(b.createdAt);
            });
            setComments(sortedComments);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const handleCommentSubmit = async () => {
        try {
            const apiURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
            await axios.post(`${apiURL}/videos/${videoId}/comments`, {
                userName: newComment.name,
                commentText: newComment.comment,
            });

            setNewComment({ name: '', comment: '' });
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };

    useEffect(() => {
        const socketURL = process.env.REACT_APP_SOCKET_URL || 'ws://localhost:5000';
        const socket = socketIOClient(socketURL, {
            withCredentials: true,
        });

        socket.on('connect', () => {
            console.log('Socket connected');
        });
    
        socket.on('newComment', (comment) => {
            console.log('Received new comment from socket:', comment);
            setComments((prevComments) => [...prevComments, comment]);
        });
    
        socket.on('disconnect', () => {
            console.log('Socket disconnected');
        });
    
        fetchComments();
        
        return () => {
            socket.disconnect();
        }
    }, []);
    
    return { comments, newComment, setNewComment, handleCommentSubmit};
};

export default useLiveComments;