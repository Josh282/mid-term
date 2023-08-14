import React from 'react';
import { useParams } from 'react-router-dom';
import useLiveComments from '../hooks/useLiveComments';
import { List, Avatar, Input, Button } from 'antd';
import '../styles/liveComment.css';

const LiveComment = () => {
    const { videoId } = useParams();
    const {
        comments,
        newComment,
        setNewComment,
        handleCommentSubmit,
        commentListRef
    } = useLiveComments(videoId);

    const handleSubmit = () => {
        if (newComment.name && newComment.comment) {
            handleCommentSubmit();
        }
    };

    return (
        <div className='comment-container'>
            <div className='comment-items'>
                <List 
                    itemLayout='horizontal'
                    dataSource={comments}
                    renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar />}
                                title={item.userName}
                                description={item.commentText}
                            />
                        </List.Item>
                    )}
                />
            </div>
            <div className='comment-input-container'>
                <Input
                    placeholder='Your Name'
                    value={newComment.name}
                    onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                />
                
                <Input.TextArea
                    placeholder='Write yout comment...'
                    value={newComment.comment}
                    onChange={(e) => setNewComment({ ...newComment, comment: e.target.value})}
                />

                <Button type='primary' onClick={handleSubmit} style={{ marginTop:'5px'}}>
                    Send
                </Button>
            </div>
        </div>
    );
};

export default LiveComment;