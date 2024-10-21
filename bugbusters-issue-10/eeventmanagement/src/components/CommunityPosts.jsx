import React, { useState } from 'react';
import './CommunityPosts.css'; // Import the CSS file for styling

const LOCAL_STORAGE_KEY = 'communityPosts';

function CommunityPosts() {
  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedPosts ? JSON.parse(savedPosts) : [];
  });
  const [newPostText, setNewPostText] = useState('');
  const [newPostCategory, setNewPostCategory] = useState('General Discussions');
  const [newCommentText, setNewCommentText] = useState('');

  const handleCreatePost = () => {
    const newPost = {
      id: posts.length + 1,
      text: newPostText,
      category: newPostCategory,
      comments: [],
    };
    const updatedPosts = [...posts, newPost];
    setPosts(updatedPosts);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedPosts));
    setNewPostText('');
    setNewPostCategory('General Discussions');
  };

  const handleCreateComment = (postId) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, newCommentText],
        };
      }
      return post;
    });
    setPosts(updatedPosts);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedPosts));
    setNewCommentText('');
  };

  return (
    <div className="community-posts">
      <h2>Community Posts</h2>
      <div className="create-post">
        <textarea
          value={newPostText}
          onChange={(e) => setNewPostText(e.target.value)}
          placeholder="Write your post here..."
        />
        <select
          value={newPostCategory}
          onChange={(e) => setNewPostCategory(e.target.value)}
        >
          <option value="General Discussions">General Discussions</option>
          <option value="Event Feedback">Event Feedback</option>
          <option value="Suggestions">Suggestions</option>
        </select>
        <button onClick={handleCreatePost}>Create Post</button>
      </div>
      <div className="posts-list">
        {posts.map(post => (
          <div key={post.id} className="post">
            <p><strong>Category:</strong> {post.category}</p>
            <p>{post.text}</p>
            <div className="comments">
              {post.comments.map((comment, index) => (
                <p key={index}>{comment}</p>
              ))}
            </div>
            <div className="create-comment">
              <textarea
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                placeholder="Write your comment here..."
              />
              <button onClick={() => handleCreateComment(post.id)}>Comment</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommunityPosts;