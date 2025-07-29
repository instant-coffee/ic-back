import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import techRouter from './routes/technologies';

dotenv.config();

const app = express();
app.use(express.json());

// Mount routes under /api/technologies
app.use('/api/technologies', techRouter);

// Global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err); // Better logging in prod
  res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI!;

// Connects to Mongo and starts server
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('💥 Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server listening on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Oh damn! Mongo connection error:', err);
    process.exit(1);
  });