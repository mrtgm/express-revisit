import mongoose from 'mongoose';
import { ArticleModel } from '.';

const AuthorSchema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
      unique: true,
    },
    // avatar: {
    //   required: false,
    //   type: String,
    // },  TODO:// AWS S3...... 今年中かな〜
    description: {
      required: true,
      type: String,
    },
    links: {
      type: Array,
      required: false,
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

AuthorSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
  const author: any = this;
  await ArticleModel.updateMany(
    {},
    {
      $pull: {
        author: author._id,
      },
    }
  );
  next();
});

export default mongoose.model('Author', AuthorSchema);
