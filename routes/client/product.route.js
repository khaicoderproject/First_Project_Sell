const express = require("express");
const router = express.Router();
const controller = require("../../controllers/client/product.controller");

// Product routes
router.get("/", controller.index); // Main route handling all products, filters, and search
router.get("/detail/:slugProduct", controller.detail);

module.exports = router;
