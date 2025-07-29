import mongoose, { Document, Schema } from 'mongoose';

export interface ITechnology extends Document {
  name: string;
  brandColor: string; // hex color
  iconKey?: string;     // FUTURE: This will be the S3 key
  createdAt: Date;
}

const TechnologySchema = new Schema<ITechnology>(
  {
    name: { type: String, required: true, trim: true },
    brandColor: { type: String, required: true },
    iconKey: { type: String, default: null },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default mongoose.model<ITechnology>('Technology', TechnologySchema);