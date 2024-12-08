const express = require("express");
const router = express.Router();
const controller = require("../../controllers/client/news.controller");
router.get("/", controller.index);
router.get("/:slugNews", controller.detail);
module.exports = router;
