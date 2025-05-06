const express = require("express");
const router = express.Router();
const controller = require("../../controllers/client/dashboard.controller");
const { wrapRequest } = require("../../utils/wrapRequest");

// Dashboard routes
router.get("/", wrapRequest(controller.index));
router.get("/search", controller.search);
// router.get("/products", controller.products);

module.exports = router;
