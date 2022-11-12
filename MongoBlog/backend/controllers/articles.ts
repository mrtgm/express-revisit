import { ArticleModel } from '~/models';
import { Request, Response, NextFunction } from 'express';
import { ResumeOptions } from 'mongodb';

export const create = async (req: Request, res: Response, next: NextFunction) => {
  //Validate Req
  if (!req.body.content) {
    res.status(400).send({ message: 'Content can not be empty' }); //Q: 400? 400 Bad Request
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
  const title = req.query.title as string;
  const condition = title ? { title: { $regex: new RegExp(title), $options: 'i' } } : {};

  try {
    const data = await ArticleModel.find(condition); //Q: ?
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const findOne = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  try {
    const data = await ArticleModel.findById(id);
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

export const findAllPublished = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await ArticleModel.where({ published: true });
    res.json(data);
  } catch (err) {
    next(err);
  }
};
