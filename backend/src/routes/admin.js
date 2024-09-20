import express from "express";
import { SignInValidator, SignUpValidator } from "../middleware/validation.js";
import {
  SignInController,
  SignUpController,
  CreateEmployeeController,
  EmployeeList,
  UpdateEmployeeDetails,
  EmployeeDetails,
  AdminDetails,
  EmployeeDelete,
} from "../controller/admin.controller.js";
import AuthMiddleware from "../middleware/auth.js";
import { Upload } from "../middleware/multer.js";
const adminrouter = express.Router();

adminrouter.post("/signup", SignUpValidator, SignUpController);
adminrouter.post("/signin", SignInValidator, SignInController);
adminrouter.post(
  "/create",
  AuthMiddleware,
  Upload.single("avatar"),
  CreateEmployeeController
);
adminrouter.get("/list", AuthMiddleware, EmployeeList);
adminrouter.put(
  "/update",
  AuthMiddleware,
  Upload.single("avatar"),
  UpdateEmployeeDetails
);
adminrouter.get("/details", AuthMiddleware, EmployeeDetails);
adminrouter.delete("/delete/:id", AuthMiddleware, EmployeeDelete);
adminrouter.get("/", AuthMiddleware, AdminDetails);
export default adminrouter;
