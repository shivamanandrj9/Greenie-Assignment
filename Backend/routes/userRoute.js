import express from "express";
import { userSignupControl, userLoginControl, userUpdateDetails } from "../controller/userController.js";

const userRouter = express.Router();

userRouter.post("/signup", userSignupControl);
userRouter.post("/login", userLoginControl);
userRouter.put("/update", userUpdateDetails);

export default userRouter;