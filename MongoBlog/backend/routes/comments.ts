import express from 'express';
import { commentsController } from '~/controllers';
import { checkJwt } from '~/auth';

const router = express.Router();

//新規コメント作成
router.post('/', commentsController.create);

//特定記事の全コメント取得
router.get('/', commentsController.findAll);

//特定コメント削除
router.delete('/:id', checkJwt, commentsController.deleteOne);

export default router;
