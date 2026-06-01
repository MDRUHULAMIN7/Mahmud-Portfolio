import mongoose, { Schema, Model } from 'mongoose';

export interface IProject {
  _id?: string;
  id?: string;
  title: string;
  description: string;
  category?: string;
  thumbnailImage?: string;
  posterImage?: string;
  cover?: string;
  images?: string[];
  highlights?: string[];
  elementsImages: string[];
  authorName: string;
  likes: number;
  views: number;
  publishDate: Date;
  accessibleLink?: string;
  published: boolean;
  isFeatured?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String },
    thumbnailImage: { type: String },
    posterImage: { type: String },
    cover: { type: String },
    images: { type: [String], default: [] },
    highlights: { type: [String], default: [] },
    elementsImages: { type: [String], default: [] },
    authorName: { type: String, default: 'MD Mahamud' },
    likes: { type: Number, default: 252 },
    views: { type: Number, default: () => Math.floor(Math.random() * 501) + 1000 },
    publishDate: { type: Date, default: Date.now },
    accessibleLink: { type: String },
    published: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);

export default Project;
