import { Admin } from "../db/admin.model.js";
import { Employee } from "../db/employee.model.js";
import jwt from "jsonwebtoken";
import { UploadOnCloudinary } from "../utils/cloudinary.js";
export const SignUpController = async (req, res) => {
  const body = req.body;
  const { username, password } = body;
  console.log("username", username);
  console.log("password", password);
  const AdminExists = await Admin.findOne({ username });
  if (AdminExists) {
    return res.status(413).json({ message: "Admin already exists" });
  }
  const createAdmin = await Admin.create(body);
  if (!createAdmin) {
    return res.status(411).json({ message: "Failed to create Admin" });
  }
  return res
    .status(200)
    .json({ message: "Admin created successfully", createAdmin });
};

export const SignInController = async (req, res) => {
  console.log("JWT_SECRET", process.env.JWT_SECRET);
  const { username, password } = req.body;
  const AdminExists = await Admin.findOne({ username, password });
  if (!AdminExists) {
    return res.status(412).json({ message: "Admin does not exist" });
  }

  const token = jwt.sign({ AdminId: AdminExists._id }, process.env.JWT_SECRET);
  return res.status(200).json({ message: "Admin Signin Successfully", token });
};

export const CreateEmployeeController = async (req, res) => {
  const { name, email, mobile_No, designation, gender, course, avatar } =
    req.body;
  console.log("CreateEmployeeController");
  // Check if email exists
  const emailExist = await Employee.findOne({ email });
  if (emailExist) {
    return res
      .status(409)
      .json({ message: "Employee with this email already exists" });
  }
  // Check if mobile number exists
  const mobileExist = await Employee.findOne({ mobile_No });
  if (mobileExist) {
    return res
      .status(409)
      .json({ message: "Employee with this mobile number already exists" });
  }

  const avatarLocalPath = req.file?.path;

  console.log("avatarLocalPath", avatarLocalPath);

  if (!avatarLocalPath) {
    return res.send("Select proper file to upload");
  }

  const avatarUpload = await UploadOnCloudinary(avatarLocalPath);
  console.log("avatarUpload", avatarUpload.url);

  if (!avatarUpload) {
    return res.send("Avatar file is required");
  }

  const createEmployee = await Employee.create({
    name,
    email,
    mobile_No,
    designation,
    gender,
    course,
    avatar: avatarUpload.url,
  });

  return res.status(200).json({
    message: "Employee created successfully",
    createEmployee
  });
};
export const UpdateEmployeeDetails = () => {};
export const Logout = async (req, res) => {};

export const EmployeeList = async (req, res) => {
  const EmployeeList = await Employee.find({});
  return res.status(200).json({ EmployeeList });
};
