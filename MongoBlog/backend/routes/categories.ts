import express from 'express';
import { categoriesController } from '~/controllers';

const router = express.Router();

//新規カテゴリ作成
router.post('/', categoriesController.create);

//全カテゴリ取得
router.get('/', categoriesController.findAll);

//特定カテゴリ更新
router.put('/:id', categoriesController.update);

//特定カテゴリ削除
router.delete('/:id', categoriesController.deleteOne);

export default router;
