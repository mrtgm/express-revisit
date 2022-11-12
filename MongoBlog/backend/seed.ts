import mongoose from 'mongoose';
import { ArticleModel } from './models';

mongoose.connect(process.env.MONGO_DB_URI as string);

const db = mongoose.connection;

db.once('open', () => {
  console.log('Successfully connected to MongoDB using Mongoose!');
});

const seed = async () => {
  await ArticleModel.deleteMany({});

  const articles = [
    {
      title: 'First Article',
      author: 'John Doe',
      content: 'This is the first article',
      published: true,
    },
    {
      title: 'Second Article',
      author: 'John Doe',
      content: 'This is the second article',
      published: true,
    },
    {
      title: 'Third Article',
      author: 'John Doe',
      content: 'This is the third article',
      published: false,
    },
  ];

  const res = await ArticleModel.insertMany(articles);

  console.log('Database seeded', res);
};

seed().then(() => db.close());
