import mongoose from 'mongoose';
import paginate from 'mongoose-paginate';

const BlogSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    published: Boolean,
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
