import { AuthorModel } from '~/models';
import { Request, Response, NextFunction } from 'express';

export const create = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.body) {
    res.status(400).send({ message: 'Content can not be empty' });
    return;
  }

  const author = new AuthorModel({
    name: req.body.name,
    slug: req.body.slug,
  });

  try {
    const data = await author.save();
    res.send(data);
  } catch (err) {
    next(err);
  }
};

export const findAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await AuthorModel.find({});
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const findOne = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  try {
    const data = await AuthorModel.findById(id);
    if (!data) res.status(404).send({ message: 'Not found Author with id ' + id });
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
    const data = await AuthorModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false });
    if (!data) res.status(404).send({ message: `Cannot update Author with id=${id}. Maybe Author was not found!` });
    else res.send({ message: 'Author was updated successfully.' });
  } catch (err) {
    next(err);
  }
};

export const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  try {
    const data = await AuthorModel.findByIdAndRemove(id);
    if (!data) res.status(404).send({ message: `Cannot delete Author with id=${id}. Maybe Author was not found!` });
    else res.send({ message: 'Author was deleted successfully!' });
  } catch (err) {
    next(err);
  }
};
