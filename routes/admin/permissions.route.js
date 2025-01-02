const express = require("express");
const router = express.Router();
const controllerAdmin = require("../../controllers/admin/permissions.controller");
router.get("/", controllerAdmin.index);
router.get("/create", controllerAdmin.create);
router.post("/create", controllerAdmin.createPost);
router.get("/edit/:id", controllerAdmin.edit);
module.exports = router;
