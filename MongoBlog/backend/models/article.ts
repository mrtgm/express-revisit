import mongoose from 'mongoose';
import paginate from 'mongoose-paginate';

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

BlogSchema.plugin(paginate);

export default mongoose.model('Blog', BlogSchema);
