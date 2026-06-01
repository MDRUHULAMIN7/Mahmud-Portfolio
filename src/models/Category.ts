import mongoose, { Schema, Model } from 'mongoose';

export interface ICategory {
  _id?: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  coverImage?: string;
  isActive: boolean;
  featuredOnHome: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, trim: true },
    icon: { type: String },
    coverImage: { type: String },
    isActive: { type: Boolean, default: true },
    featuredOnHome: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Category: Model<ICategory> =
  mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);

export default Category;
