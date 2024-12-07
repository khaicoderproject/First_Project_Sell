const express = require("express");
const router = express.Router();
const controller = require("../../controllers/client/order.controller");
router.get("/checkout", controller.checkout);
router.post("/process-success", controller.processSuccess);
router.get("/order-success", controller.orderSuccess);
module.exports = router;
