const express = require("express");
const router = express.Router();
const controllerAdmin = require("../../controllers/admin/news.controller");
router.get("/", controllerAdmin.index);
router.get("/create", controllerAdmin.create);
router.post("/create", controllerAdmin.createPost);
module.exports = router;
