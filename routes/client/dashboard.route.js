const express = require("express");
const router = express.Router();
const controller = require("../../controllers/client/dashboard.controller");
const { wrapRequest } = require("../../utils/wrapRequest");
router.get("/", wrapRequest(controller.index));
router.get("/search", controller.search);
module.exports = router;
