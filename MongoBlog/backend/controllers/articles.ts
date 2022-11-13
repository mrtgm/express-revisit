import { ArticleModel } from '~/models';
import { Request, Response, NextFunction } from 'express';
import paginate from 'express-paginate';

export const create = async (req: Request, res: Response, next: NextFunction) => {
  //Validate Req
  if (!req.body.content) {
    res.status(400).send({ message: 'Content can not be empty' });
    return;
  }

  const article = new ArticleModel({
    title: req.body.title,
    author: req.body.author,
    content: req.body.content,
    published: req.body.published ? req.body.published : false,
  });

  try {
    const data = await article.save();
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const findAll = async (req: Request, res: Response, next: NextFunction) => {
  // 著者・カテゴリ・公開状態で絞り込み
  const buildQuery = (req: Request) => {
    if (req.query) {
      return Object.entries(req.query).reduce((acc, [key, value]) => {
        if (key === 'author') {
          return { ...acc, author: value };
        }
        if (key === 'category') {
          return { ...acc, category: value };
        }
        if (key === 'published') {
          return { ...acc, published: value };
        }
        return acc;
      }, {});
    }
  };

  //https://qiita.com/takehilo/items/0163426cce40452ff2ac

  try {
    const data = await ArticleModel.paginate(
      { ...buildQuery(req) },
      { page: Number(req.query.page), limit: Number(req.query.limit), populate: ['author', 'categories'] }
    );

    res.json({
      data: data.docs,
      pagination: {
        page: data.page,
        totalPages: data.pages,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const findOne = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  try {
    const data = await ArticleModel.findById(id).populate('author').populate('categories');
    if (!data) res.status(404).send({ message: 'Not found Article with id ' + id });
    else res.json(data);
  } catch (err) {
    next(err);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.body) {
    res.status(400).send({ message: 'Data to update can not be empty' });
    return;
  }

  const id = req.params.id;

  try {
    const data = await ArticleModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }); //Q: ?
    if (!data) res.status(404).send({ message: `Cannot update Article with id=${id}. Maybe Article was not found!` });
    else res.send({ message: 'Article was updated successfully.' });
  } catch (err) {
    next(err);
  }
};

export const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  try {
    const data = await ArticleModel.findByIdAndRemove(id);
    if (!data) res.status(404).send({ message: `Cannot delete Article with id=${id}. Maybe Article was not found!` });
    else res.send({ message: 'Article was deleted successfully!' });
  } catch (err) {
    next(err);
  }
};

export const deleteAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await ArticleModel.deleteMany({});
    res.send({ message: `${data.deletedCount} Articles were deleted successfully!` });
  } catch (err) {
    next(err);
  }
};
