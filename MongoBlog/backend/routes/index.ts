import express from 'express';
import articlesRoutes from '~/routes/articles';
import morgan from 'morgan';
import { notFound, errorHandler } from '~/controllers/error';

const router = express.Router();

router.use(morgan('dev'));

router.use('/articles', articlesRoutes);

router.use(notFound);
router.use(errorHandler);

export default router;
