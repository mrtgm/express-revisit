import { CommentModel } from '~/models';
import { Request, Response, NextFunction } from 'express';

export const create = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.body) {
    res.status(400).send({ message: 'Content can not be empty' });
    return;
  }

  const comment = new CommentModel({
    name: req.body.name,
    content: req.body.content,
    articleId: req.body.articleId,
  });

  try {
    const data = await comment.save();
    res.send(data);
  } catch (err) {
    next(err);
  }
};

export const findAll = async (req: Request, res: Response, next: NextFunction) => {
  const articleId = req.params.articleId;

  try {
    const data = await CommentModel.find({ articleId: articleId });
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  try {
    const data = await CommentModel.findByIdAndRemove(id);
    if (!data) res.status(404).send({ message: `Cannot delete Comment with id=${id}. Maybe Comment was not found!` });
    else res.send({ message: 'Comment was deleted successfully!' });
  } catch (err) {
    next(err);
  }
};
