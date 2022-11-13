import express from 'express';
import articlesRoutes from '~/routes/articles';
import authorsRoutes from '~/routes/authors';
import categoriesRoutes from '~/routes/categories';
import commentsRoutes from '~/routes/comments';
import morgan from 'morgan';
import paginate from 'express-paginate';
import { notFound, errorHandler } from '~/controllers/error';

const router = express.Router();

router.use(morgan('dev'));

router.use(paginate.middleware(5, 50));

router.use('/articles', articlesRoutes);
router.use('/authors', authorsRoutes);
router.use('/categories', categoriesRoutes);
router.use('/comments', commentsRoutes);

router.use(notFound);
router.use(errorHandler);

export default router;
