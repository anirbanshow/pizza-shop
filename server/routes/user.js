import express from "express";
import passport from "passport";
import { getAllStats, getAllUsers, logout, myProfile } from "../controllers/UserController.js";
import { authorizedAdmin, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get(
    "/googlelogin",
    passport.authenticate("google", {
        scope: ["profile"]
    })
);

router.get(
    "/login",
    passport.authenticate("google", {
        scope: ["profile"],
        successRedirect: "http://localhost:3000"
    })
);

router.get("/me", isAuthenticated, myProfile);

router.get("/logout", isAuthenticated, logout);

// Admin Routes
router.get("/admin/users", isAuthenticated, authorizedAdmin, getAllUsers);

router.get("/admin/stats", isAuthenticated, authorizedAdmin, getAllStats);


export default router;