const Post = require('../models/Post');

// Create Post
exports.createPost = async (req, res) => {
  const { title, content, category } = req.body;
  const userId = req.user._id;

  try {
    const post = new Post({ title, content, category, createdBy: userId });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All Posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('createdBy');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
