import mongoose from 'mongoose';
import paginate from 'mongoose-paginate';

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    published: { type: Boolean, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Author',
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
      },
    ],
  },
  {
    timestamps: true,
  }
);

BlogSchema.plugin(paginate);

export default mongoose.model('Blog', BlogSchema);
