const express = require("express");
const router = express.Router();
const controller = require("../../controllers/client/cart.controller");
router.get("/", controller.index);
router.post("/order/:productId", controller.orderPost);
module.exports = router;
