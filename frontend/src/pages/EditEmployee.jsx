import { useState, useEffect } from "react";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { Dropdown } from "../components/Dropdown";
import { RadioButton } from "../components/RadioButton";
import { Checkbox } from "../components/CheckBox";
import { FileUpload } from "../components/FileUpload";
import { useEmployee } from "../hooks/useEmployee";
import { useParams } from "react-router-dom";

const courseOptions = [
  { label: "MCA", value: "mca" },
  { label: "BCA", value: "bca" },
  { label: "BSC", value: "bsc" },
];

const EmployeeDetails = {
  name: "",
  email: "",
  mobile_No: "",
  designation: "HR", // Default designation
  gender: "Male", // Default gender
  course: [], // Initialize as array
  avatar: null,
};

export const EditEmployee = () => {
  const { useCreateEmployee, useEmployeeUpdate, useEmployeeDetails } = useEmployee();
  const [UserInputs, setUserInputs] = useState(EmployeeDetails);
  const [file, setFile] = useState(null);
  const { id } = useParams();

  const fetchEmployeeDetails = async (id) => {
    try {
      const employeeDetails = await useEmployeeDetails(id); // Fetch employee details
      if (employeeDetails) {
        setUserInputs({
          name: employeeDetails.name || EmployeeDetails.name,
          email: employeeDetails.email || EmployeeDetails.email,
          mobile_No: employeeDetails.mobile_No || EmployeeDetails.mobile_No,
          designation: employeeDetails.designation || EmployeeDetails.designation,
          gender: employeeDetails.gender || EmployeeDetails.gender,
          course: employeeDetails.course || EmployeeDetails.course,
          avatar: employeeDetails.avatar || EmployeeDetails.avatar,
        });
      }
    } catch (error) {
      console.error("Error fetching employee details:", error);
    }
  };

  const handleUpdate = async () => {
    const updated = await useEmployeeUpdate(UserInputs);
    console.log("updated successfully", updated);
    alert("updated successfully")
  };

  useEffect(() => {
    if (id) {
      fetchEmployeeDetails(id);
    }
  }, [id]);

//   const handleCreate = async () => {
//     const formData = new FormData();
//     formData.append("name", UserInputs.name);
//     formData.append("email", UserInputs.email);
//     formData.append("mobile_No", UserInputs.mobile_No);
//     formData.append("designation", UserInputs.designation);
//     formData.append("gender", UserInputs.gender);
//     formData.append("course", JSON.stringify(UserInputs.course));
//     if (file) {
//       formData.append("avatar", file);
//     }

//     try {
//       await useCreateEmployee(formData);
//       alert("Employee created successfully!");
//     } catch (error) {
//       console.error("Error creating employee:", error);
//     }
//   };

  const handleCourseChange = (selectedOptions) => {
    setUserInputs((prevState) => ({
      ...prevState,
      course: selectedOptions,
    }));
  };

  return (
    <div className="h-screen flex justify-center items-center p-4">
      <div className="flex flex-col w-full max-w-md border shadow-2xl rounded-2xl p-10">
        <InputBox
          label="Name"
          placeholder="employee"
          value={UserInputs.name}
          onChange={(e) => setUserInputs({ ...UserInputs, name: e.target.value })}
          type="text"
        />
        <InputBox
          label="Email"
          placeholder="employee@gmail.com"
          value={UserInputs.email}
          onChange={(e) => setUserInputs({ ...UserInputs, email: e.target.value })}
          type="text"
          readOnly={true}
        />
        <InputBox
          label="Mobile No"
          placeholder="Enter employee phone no"
          value={UserInputs.mobile_No}
          onChange={(e) => setUserInputs({ ...UserInputs, mobile_No: e.target.value })}
          type="number"
        />
        <Dropdown
          label="Designation"
          options={["HR", "Manager", "Sales"]}
          value={UserInputs.designation}
          onChange={(e) => setUserInputs({ ...UserInputs, designation: e.target.value })}
        />
        <RadioButton
          label="Gender"
          name="gender"
          options={["Male", "Female"]}
          value={UserInputs.gender}
          onChange={(e) => setUserInputs({ ...UserInputs, gender: e.target.value })}
        />
        <Checkbox
          label="Course"
          options={courseOptions}
          selectedOptions={UserInputs.course}
          onChange={handleCourseChange}
        />
        <FileUpload
          value={UserInputs.avatar}
          onChange={(selectedFile) => setFile(selectedFile)}
        />
        <Button label="Update" onClick={handleUpdate} color="bg-blue-500" />
      </div>
    </div>
  );
};
