import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  content: {
    required: true,
    type: String,
  },
  name: {
    required: true,
    type: String,
  },
  articleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Article',
  },
});

export default mongoose.model('Comment', CommentSchema);
