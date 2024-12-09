const express = require("express");
const router = express.Router();
const controller = require("../../controllers/client/user.controller");
router.get("/profile/:id", controller.profile);
router.post("/profile/sendReact/:id", controller.profileLikePost);
router.get("/setting-profile/:id", controller.settingProfile);
router.post("/setting-profile", controller.settingProfilePost);
module.exports = router;
