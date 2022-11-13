import express from 'express';
import { authorsController } from '~/controllers';
import { checkJwt } from '~/auth';

const router = express.Router();

//新規著者作成
router.post('/', authorsController.create);

//全著者取得
router.get('/', authorsController.findAll);

//特定著者取得
router.get('/:id', authorsController.findOne);

//特定著者更新
router.put('/:id', checkJwt, authorsController.update);

//特定著者削除
router.delete('/:id', checkJwt, authorsController.deleteOne);

export default router;
