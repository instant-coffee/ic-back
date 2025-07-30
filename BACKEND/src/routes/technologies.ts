import { Router, Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import mongoose from 'mongoose';
import Technology, { ITechnology } from '../models/Technology';

const router: Router = Router();

// Middleware to validate POST
// TODO: Add more validation rules / move to a separate file
const validateTech = [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Name is required'),
    body('brandColor')
      .matches(/^#[0-9A-Fa-f]{6}$/)
      .withMessage('brandColor must be a valid hex code, e.g. "#42b883"'),
  ];

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
router.post(
    '/',
    validateTech,
    async (req: Request, res: Response, next: NextFunction) => {
      //Handle validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // Return first validation error(s)
        return res.status(400).json({ errors: errors.array() });
      }
  
      //Start a session & transaction
      const session = await mongoose.startSession();
      session.startTransaction();
      try {
        const { name, brandColor } = req.body;
  
        // Create the document inside the transaction
        const newTech = await Technology.create(
          [{ name, brandColor }],
          { session }
        );
  
        //Commit on success
        await session.commitTransaction();
        session.endSession();
  
        //Respond with created resource
        const created = newTech[0];
        if (!created) {
          throw new Error('Failed to create technology');
        }
        return res.status(201).json(created);
      } catch (err) {
        //Rollback on any error
        await session.abortTransaction();
        session.endSession();
        return next(err);
      }
    }
  );

export default router;