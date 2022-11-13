import express from 'express';
import { articlesController } from '~/controllers';
import { checkJwt } from '~/auth';

const router = express.Router();

//新規記事作成
router.post('/', articlesController.create);

//全記事取得
router.get('/', articlesController.findAll);

//特定記事取得
router.get('/:id', articlesController.findOne);

//特定記事更新
router.put('/:id', checkJwt, articlesController.update);

//特定記事削除
router.delete('/:id', checkJwt, articlesController.deleteOne);

//全記事削除
router.delete('/', checkJwt, articlesController.deleteAll);

export default router;
