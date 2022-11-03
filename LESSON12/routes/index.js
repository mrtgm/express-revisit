const router = require("express").Router();
const homeRoutes = require("./homeRoutes");
const userRoutes = require("./userRoutes");
const subscriberRoutes = require("./subscriberRoutes");
const errorRoutes = require("./errorRoutes");

router.use("/users", userRoutes);
router.use("/subscribers", subscriberRoutes);
// router.use("/api", apiRoutes);
router.use("/", homeRoutes);
router.use("/", errorRoutes);

module.exports = router;
