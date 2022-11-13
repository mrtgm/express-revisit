import express from 'express';
import { commentsController } from '~/controllers';

const router = express.Router();

//新規コメント作成
router.post('/', commentsController.create);

//特定記事の全コメント取得
router.get('/:articleId', commentsController.findAll);

//特定コメント削除
router.delete('/:id', commentsController.deleteOne);

export default router;
