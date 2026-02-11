import mongoose, { Schema, Model } from 'mongoose';

export interface IProject {
  _id?: string;
  title: string;
  description: string;
  thumbnailImage?: string;
  posterImage?: string;
  elementsImages: string[];
  authorName: string;
  likes: number;
  publishDate: Date;
  accessibleLink?: string;
  published: boolean;
  featuredOnHome: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    thumbnailImage: { type: String },
    posterImage: { type: String },
    elementsImages: { type: [String], default: [] },
    authorName: { type: String, default: 'MD Mahamud' },
    likes: { type: Number, default: 0 },
    publishDate: { type: Date, default: Date.now },
    accessibleLink: { type: String },
    published: { type: Boolean, default: false },
    featuredOnHome: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);

export default Project;
