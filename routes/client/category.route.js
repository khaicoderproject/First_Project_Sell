const express = require("express");
const router = express.Router();
const controller = require("../../controllers/client/category.controller");
router.get("/:slug", controller.index);
module.exports = router;
