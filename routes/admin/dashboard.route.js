const express = require("express");
const router = express.Router();
const controllerAdmin = require("../../controllers/admin/dashboard.controller");
router.get("/", controllerAdmin.index);

module.exports = router;
