import express from 'express';
import Article from '../models/Article';
import { authenticateToken, authorizeRole } from '../middleware/auth';
import { Request, Response } from 'express';

interface CustomRequest extends Request {
  user?: {
    name: string;
    role: string;
  };
}

const router = express.Router();

// Get all articles (public)
router.get('/', async (req: Request, res: Response) => {
  try {
    const articles = await Article.find()
      .sort({ createdAt: -1 })
      .select('-content'); // Don't send full content in list view
    res.json(articles);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching articles', error: error.message });
  }
});

// Get single article (public)
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json(article);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching article', error: error.message });
  }
});

// Create article (admin only)
router.post('/', authenticateToken, authorizeRole(['admin', 'superadmin']), async (req: CustomRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const article = new Article({
      ...req.body,
      author: req.user.name // Set author from authenticated user
    });
    const savedArticle = await article.save();
    res.status(201).json(savedArticle);
  } catch (error: any) {
    res.status(400).json({ message: 'Error creating article', error: error.message });
  }
});

// Update article (admin only)
router.put('/:id', authenticateToken, authorizeRole(['admin', 'superadmin']), async (req: Request, res: Response) => {
  try {
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json(article);
  } catch (error: any) {
    res.status(400).json({ message: 'Error updating article', error: error.message });
  }
});

// Delete article (admin only)
router.delete('/:id', authenticateToken, authorizeRole(['admin', 'superadmin']), async (req: Request, res: Response) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json({ message: 'Article deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: 'Error deleting article', error: error.message });
  }
});

export default router; 