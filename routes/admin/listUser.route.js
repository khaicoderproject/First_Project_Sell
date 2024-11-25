const express = require("express");
const router = express.Router();
const controllerAdmin = require("../../controllers/admin/listUser.controller");
router.get("/", controllerAdmin.list);
module.exports = router;
