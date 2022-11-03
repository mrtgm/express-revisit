const router = require("express").Router();
const subscribersController = require("../controllers/subscribersController");

router.get("/", subscribersController.index);
router.get("/:id", subscribersController.show);
router.put("/:id/update", subscribersController.update);
router.delete("/:id/delete", subscribersController.delete);
router.post("/create", subscribersController.create);

module.exports = router;
