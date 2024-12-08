const express = require("express");
const router = express.Router();
const controller = require("../../controllers/client/user.controller");
router.get("/profile/:id", controller.profile);
router.get("/setting-profile/:id", controller.settingProfile);
router.post("/setting-profile", controller.settingProfilePost);
module.exports = router;
