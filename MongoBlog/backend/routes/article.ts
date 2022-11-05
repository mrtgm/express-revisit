import express from "express";
import { articlesController } from "~/controllers";

const router = express.Router();

//新規記事作成
router.post("/", articlesController.create);

//全記事取得
router.get("/", articlesController.findAll);

//公開記事取得
router.get("/published", articlesController.findAllPublished);

//特定記事取得
router.get("/:id", articlesController.findOne);

//特定記事更新
router.put("/:id", articlesController.update);

//特定記事削除
router.delete("/:id", articlesController.deleteOne);

//全記事削除
router.delete("/", articlesController.deleteAll);

export default router;
