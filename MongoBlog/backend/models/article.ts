import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema(
  {
    title: String,
    author: String,
    content: String,
    published: Boolean,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Blog', BlogSchema);
