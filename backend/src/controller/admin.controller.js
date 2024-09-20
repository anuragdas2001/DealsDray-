import { Admin } from "../models/admin.models.js";
import { Employee } from "../models/employee.models.js";
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
  return res
    .status(200)
    .json({ message: "Admin Signin Successfully", token, AdminExists });
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

  let avatarUpload = ""; // Declare and initialize avatarUpload

  if (avatar) {
    const avatarLocalPath = req.file?.path;
    if (avatarLocalPath) {
      avatarUpload = await UploadOnCloudinary(avatarLocalPath);
    }
  }

  const employee = await Employee.create({
    name,
    email,
    mobile_No,
    designation,
    gender,
    course,
    avatar: avatarUpload?.url || "", // Assign the avatar URL or empty string if not provided
  });

  const createdEmployee = await Employee.findById(employee._id).select(
    "-updatedAt -__v -_id"
  );

  return res.status(200).json({
    message: "Employee created successfully",
    createdEmployee,
  });
};

export const UpdateEmployeeDetails = async (req, res) => {
  const { name, email, mobile_No, designation, gender, course, avatar } =
    req.body;

  const EmployeeExist = await Employee.findOne({ email });
  if (!EmployeeExist) {
    return res.status(404).json({ message: "Employee does not exist" });
  }

  let avatarUpload = EmployeeExist.avatar; // Keep the existing avatar by default

  if (avatar) {
    const avatarLocalPath = req.file?.path;
    if (avatarLocalPath) {
      avatarUpload = await UploadOnCloudinary(avatarLocalPath);
    }
  }

  const UpdatedEmployee = await Employee.findByIdAndUpdate(
    EmployeeExist._id,
    {
      $set: {
        name,
        email,
        mobile_No,
        designation,
        gender,
        course,
        avatar: avatarUpload?.url || EmployeeExist.avatar, // Update if new avatar, else keep the existing one
      },
    },
    { new: true } // Option to return the updated document
  );

  return res.status(200).json({
    message: "Employee updated successfully",
    updatedEmployee: UpdatedEmployee,
  });
};

export const EmployeeDelete = async (req, res) => {
  try {
    const { id } = req.params; // Access the employee id from req.params
    console.log("Delete Employee Id", id);

    // Use findByIdAndDelete to remove the employee
    const employeeremove = await Employee.findByIdAndDelete(id);

    if (!employeeremove) {
      return res.status(404).json({ message: "Employee not found" });
    }

    return res.status(200).json({ message: "Employee removed successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while removing the employee" });
  }
};

export const EmployeeList = async (req, res) => {
  const EmployeeList = await Employee.find({});
  return res.status(200).json({ EmployeeList });
};

export const EmployeeDetails = async (req, res) => {
  const body = req.body;
  console.log(body);
  const { id } = req.query;
  console.log("ID", id);
  const employee = await Employee.findById(id);
  if (!employee) {
    return res.status(404).json({ message: "Employee does not exist" });
  }
  console.log(employee);
  const EmployeeDetails = employee;
  return res.status(200).json({ EmployeeDetails });
};

export const AdminDetails = async (req, res) => {
  const { id } = req.query;
  console.log(id);
  const admin = await Admin.findById(id).select("username");
  console.log("Admin", admin);
  if (!admin) {
    return res.status(404).json({ message: "Admin does not exist" });
  }
  return res.status(200).json({ admin });
};
