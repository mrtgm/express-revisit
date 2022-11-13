import mongoose from 'mongoose';
import { ArticleModel, AuthorModel, CommentModel, CategoryModel } from './models';

mongoose.connect(process.env.MONGO_DB_URI as string);

const db = mongoose.connection;

db.once('open', () => {
  console.log('Successfully connected to MongoDB using Mongoose!');
});
const seedAuthors = async () => {
  await AuthorModel.deleteMany({});

  const authors = [
    {
      name: 'John Doe',
      description: 'I am John Doe',
      links: [
        {
          name: 'Github',
          url: 'https://github.com/johndoe',
        },
      ],
      slug: 'john-doe',
    },
    {
      name: 'Jane Doe',
      description: 'I am Jane Doe',
      slug: 'jane-doe',
    },
  ];

  const res = await AuthorModel.insertMany(authors);

  console.log('Author seeded', res);
};

const seedCategories = async () => {
  await CategoryModel.deleteMany({});

  const categories = [
    {
      name: 'Category 1',
      slug: 'category-1',
    },
    {
      name: 'Category 2',
      slug: 'category-2',
    },
    {
      name: 'Category 3',
      slug: 'category-3',
    },
  ];

  const res = await CategoryModel.insertMany(categories);

  console.log('Category seeded', res);
};

const seedArticle = async () => {
  await ArticleModel.deleteMany({});

  const categories = await CategoryModel.find({});
  const authors = await AuthorModel.find({});

  const articles = [
    {
      title: 'First Article',
      author: authors[0]?._id,
      content: 'This is the first article',
      published: true,
      categories: [categories[0]?._id],
    },
    {
      title: 'Second Article',
      author: authors[0]?._id,
      content: 'This is the second article',
      published: true,
      categories: [categories[0]?._id, categories[1]?._id],
    },
    {
      title: 'Third Article',
      author: authors[0]?._id,
      content: 'This is the third article',
      published: false,
      categories: [categories[0]?._id, categories[1]?._id],
    },
    {
      title: 'Fourth Article',
      author: authors[0]?._id,
      content: 'This is the fourth article',
      published: false,
      categories: [categories[0]?._id, categories[1]?._id],
    },
    {
      title: 'Fifth Article',
      author: authors[1]?._id,
      content: 'This is the fifth article',
      published: false,
      categories: [],
    },
    {
      title: 'Sixth Article',
      author: authors[1]?._id,
      content: 'This is the sixth article',
      published: false,
      categories: [categories[0]?._id, categories[1]?._id],
    },
    {
      title: 'Seventh Article',
      author: authors[1]?._id,
      content: 'This is the seventh article',
      published: false,
      categories: [categories[0]?._id, categories[1]?._id],
    },
    {
      title: 'Eighth Article',
      author: authors[1]?._id,
      content: 'This is the eighth article',
      published: false,
      categories: [categories[0]?._id, categories[1]?._id],
    },
    {
      title: 'Ninth Article',
      author: authors[1]?._id,
      content: 'This is the ninth article',
      published: false,
      categories: [categories[0]?._id, categories[1]?._id],
    },
    {
      title: 'Tenth Article',
      author: authors[1]?._id,
      content: 'This is the tenth article',
      published: false,
      categories: [categories[0]?._id],
    },
  ];

  const res = await ArticleModel.insertMany(articles);

  console.log('Article seeded', res);
};

const seedComments = async () => {
  await CommentModel.deleteMany({});

  const article = await ArticleModel.findOne({});

  const comments = [
    {
      name: 'John Doe',
      content: 'This is a comment',
      article: article?._id,
    },
    {
      name: 'Jane Doe',
      content: 'This is a comment',
      article: article?._id,
    },
    {
      name: 'John Doe',
      content: 'This is a comment',
      article: article?._id,
    },
    {
      name: 'Jane Doe',
      content: 'This is a comment',
      article: article?._id,
    },
  ];

  const res = await CommentModel.insertMany(comments);

  console.log('Comment seeded', res);
};

seedAuthors()
  .then(() => seedCategories())
  .then(() => seedArticle())
  .then(() => seedComments())
  .catch((error) => console.error(error))
  .finally(() => db.close());
