import express from "express";
import { adminSignupControl, userListControl } from "../controller/adminController.js";

const adminRouter = express.Router();

adminRouter.post("/getUsers", userListControl);
adminRouter.post("/adminReg", adminSignupControl);

export default adminRouter;