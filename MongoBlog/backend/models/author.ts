import mongoose from 'mongoose';

const AuthorSchema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
      unique: true,
    },
    avatar: {
      required: false,
      type: String,
    },
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

export default mongoose.model('Author', AuthorSchema);
