const express = require("express");
const router = express.Router();
const controllerAdmin = require("../../controllers/admin/auth.controller");
router.get("/login", controllerAdmin.login);
router.post("/login", controllerAdmin.loginPost);
router.get("register-admin", controllerAdmin.register);
router.post("register-admin", controllerAdmin.registerPost);
module.exports = router;
