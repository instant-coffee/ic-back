import { Router, Request, Response } from 'express';
import Technology, { ITechnology } from '../models/Technology';

const router: Router = Router();

/**
 * GET /api/technologies
 * Returns all technologies.
 */
router.get('/', async (req: Request, res: Response) => {
  const techs: ITechnology[] = await Technology.find().sort({ createdAt: -1 });
  // TODO: add caching headers
  res.json(techs);
});

/**
 * POST /api/technologies
 * Creates a new technology.
 * Body: { name: string, brandColor: string }
 */
router.post('/', async (req: Request, res: Response) => {
  const { name, brandColor } = req.body;

  // Basic validation
  if (!name || !brandColor) {
    return res.status(400).json({ message: 'name and brandColor are required' });
  }

  // Create and save
  const newTech = new Technology({ name, brandColor });
  const saved = await newTech.save();

  res.status(201).json(saved);
});

export default router;