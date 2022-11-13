import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
      unique: true,
    },
    slug: {
      required: true,
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Category', CategorySchema);
