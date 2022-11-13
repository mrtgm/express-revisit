import { CategoryModel } from '~/models';
import { Request, Response, NextFunction } from 'express';

export const create = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.body) {
    res.status(400).send({ message: 'Content can not be empty' });
    return;
  }

  const category = new CategoryModel({
    name: req.body.name,
    slug: req.body.slug,
    avatar: req.body.avatar,
    description: req.body.description,
    links: req.body.links,
  });

  try {
    const data = await category.save();
    res.send(data);
  } catch (err) {
    next(err);
  }
};

export const findAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await CategoryModel.find({});
    res.json(data);
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
    const data = await CategoryModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false });
    if (!data) res.status(404).send({ message: `Cannot update Category with id=${id}. Maybe Category was not found!` });
    else res.send({ message: 'Category was updated successfully.' });
  } catch (err) {
    next(err);
  }
};

export const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  try {
    const data = await CategoryModel.findByIdAndRemove(id);
    if (!data) res.status(404).send({ message: `Cannot delete Category with id=${id}. Maybe Category was not found!` });
    else res.send({ message: 'Category was deleted successfully!' });
  } catch (err) {
    next(err);
  }
};
