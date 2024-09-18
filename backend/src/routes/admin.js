import express from "express";
import {SignInValidator, SignUpValidator } from "../middleware/validation.js";
import {SignInController,SignUpController,CreateEmployeeController,EmployeeList,Logout, UpdateEmployeeDetails} from "../controller/admin.controller.js";
import AuthMiddleware from "../middleware/auth.js";
import { Upload } from "../middleware/multer.js";
const adminrouter = express.Router();

adminrouter.post("/signup", SignUpValidator, SignUpController);
adminrouter.post("/signin", SignInValidator, SignInController);
adminrouter.post("/logout"  ,AuthMiddleware, Logout);
adminrouter.post("/create", AuthMiddleware , Upload.single("avatar") , CreateEmployeeController);
adminrouter.get("/list", AuthMiddleware,  EmployeeList);
adminrouter.put("/update",AuthMiddleware, UpdateEmployeeDetails);
export default adminrouter;
