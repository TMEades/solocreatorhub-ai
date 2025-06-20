import express from 'express';
import { 
  getPosts, 
  getPostById, 
  createPost, 
  updatePost, 
  deletePost,
  getTrendingHashtags
} from '../controllers/postController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// All routes are protected
router.use(auth);

// Post routes
router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/', createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

// Hashtag routes
router.get('/hashtags/trending', getTrendingHashtags);

export default router;
