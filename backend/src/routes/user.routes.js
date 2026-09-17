const express = require("express"); 
const authRouter = require("../controllers/auth.controller.js");

const router = express.Router(); 


router.post("/register" ,authRouter.userRegisterController);
router.get("/login", authRouter.userLoginController);

module.exports = router;

