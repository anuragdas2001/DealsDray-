import { useState, useEffect } from "react";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { Dropdown } from "../components/Dropdown";
import { RadioButton } from "../components/RadioButton";
import { Checkbox } from "../components/CheckBox";
import { FileUpload } from "../components/FileUpload";
import { useEmployee } from "../hooks/useEmployee";
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
  course: [], // Default courses
  avatar: null,
};

export const CreateEmployee = () => {
  const { useCreateEmployee, useEmployeeUpdate, useEmployeeDetails } =
    useEmployee();
  const [UserInputs, setUserInputs] = useState(EmployeeDetails);
  const [file, setFile] = useState(null);

  const handleCreate = async () => {
    const formData = new FormData();
    formData.append("name", UserInputs.name);
    formData.append("email", UserInputs.email);
    formData.append("mobile_No", UserInputs.mobile_No);
    formData.append("designation", UserInputs.designation);
    formData.append("gender", UserInputs.gender);

    // Instead of JSON.stringify, loop through the course array
    UserInputs.course.forEach((course) => {
      formData.append("course[]", course); // Use 'course[]' for array notation
    });

    if (file) {
      formData.append("avatar", file);
    }

    try {
      await useCreateEmployee(formData);
      alert("Employee created successfully!");
    } catch (error) {
      console.error("Error creating employee:", error);
    }
  };

  const handleCourseChange = (selectedOptions) => {
    setUserInputs({ ...UserInputs, course: selectedOptions });
  };

  return (
    <div className="h-screen flex justify-center items-center p-4">
      <div className="flex flex-col w-full max-w-md border shadow-2xl rounded-2xl p-10">
        <div>
          <InputBox
            label="Name"
            placeholder="employee"
            value={UserInputs.name}
            onChange={(e) =>
              setUserInputs({ ...UserInputs, name: e.target.value })
            }
            type="text"
          />
        </div>
        <div>
          <InputBox
            label="Email"
            placeholder="employee@gmail.com"
            value={UserInputs.email}
            onChange={(e) =>
              setUserInputs({ ...UserInputs, email: e.target.value })
            }
            type="text"
          />
        </div>
        <div>
          <InputBox
            label="Mobile No"
            placeholder="Enter employee phone no"
            value={UserInputs.mobile_No}
            onChange={(e) =>
              setUserInputs({ ...UserInputs, mobile_No: e.target.value })
            }
            type="number"
          />
        </div>
        <div>
          <Dropdown
            label="Designation"
            options={["HR", "Manager", "Sales"]}
            value={UserInputs.designation}
            onChange={(e) =>
              setUserInputs({ ...UserInputs, designation: e.target.value })
            }
          />
        </div>
        <div>
          <RadioButton
            label="Gender"
            name="gender"
            options={["Male", "Female"]}
            value={UserInputs.gender}
            onChange={(e) =>
              setUserInputs({ ...UserInputs, gender: e.target.value })
            }
          />
        </div>
        <div>
          <Checkbox
            label="Course"
            options={courseOptions}
            selectedOptions={UserInputs.course}
            onChange={handleCourseChange}
          />
        </div>
        <div>
          <FileUpload onChange={(selectedFile) => setFile(selectedFile)} />
        </div>
        <div>
          <Button label="Create" onClick={handleCreate} color="bg-blue-500" />
        </div>
      </div>
    </div>
  );
};
