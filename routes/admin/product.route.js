const express = require("express");
const router = express.Router();
const controllerAdmin = require("../../controllers/admin/product.controller");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.get("/", controllerAdmin.index);
router.get("/create", controllerAdmin.create);
router.post("/create", upload.single("thumnail"), controllerAdmin.createPost);
router.get("/update/:id", controllerAdmin.update);
router.post(
  "/update/:id",
  upload.single("thumnail"),
  controllerAdmin.updatePost
);
router.post("/delete/:id", controllerAdmin.delete);
module.exports = router;