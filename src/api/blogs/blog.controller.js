// handle request response
// user input validation

import { addPost, editPost, getAllPost, getUniquePost, removePost } from './blog.service.js'
import { checkCreate } from './blog.validator.js';

const getPosts = async (req, res) => {
  try {
    const posts = await getAllPost();
    return res.json({
      posts,
      message: posts.length <= 0 ? "No posts found" : "Success"
    });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch posts', error: error.message });
  }
};

const getPostById = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await getUniquePost(postId);

    return res.status(200).json(post);
  } catch (error) {
    if (error.message == "Post not found.") {
      return res.status(404).json({ message: 'Failed to update post', error: error.message });
    }
    return res.status(500).json({ message: 'Internal server error', message: error.message });
  }
}

const createPosts = async (req, res) => {
  const postData = req.body;
  const check = checkCreate(postData);

  if (!check.success) {
    return res.status(400).json({
      check: check,
    })
  }

  try {
    const post = await addPost(postData);
    return res.status(201).json({
      post,
      message: "Success"
    });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to create posts', error: error.message });
  }
};

const updatePost = async (req, res) => {
  const { postId } = req.params;
  const postData = req.body;

  try {
    const post = await editPost(postId, postData);

    return res.status(200).json(post)
  } catch (error) {
    if (error.message == "No data changes.") {
      return res.status(400).json({ message: 'Failed to update post', error: error.message });
    }
    if (error.message == "Post not found.") {
      return res.status(404).json({ message: 'Failed to update post', error: error.message });
    }
    return res.status(500).json({ message: 'Failed to update post', error: error.message });
  }
}

const deletePost = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await removePost(postId);

    if (!post) res.status(400).json({ message: 'Failed to delete post', error: error.message });

    return res.status(204).json(post);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete post', error: error.message });
  }
}

export { getPosts, createPosts, getPostById, updatePost, deletePost };