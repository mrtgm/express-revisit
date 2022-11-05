import express from "express";
import articleRoutes from "~/routes/article";
import { notFound, errorHandler } from "~/controllers/error";

const router = express.Router();

router.use("/article", articleRoutes);

router.use(notFound);
router.use(errorHandler);

export default router;
