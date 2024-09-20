import axios from "axios";
const BACKEND_API = import.meta.env.VITE_BACKEND_API;

export const useEmployee = () => {
  const useCreateEmployee = async (UserInputs) => {
    const res = await axios.post(`${BACKEND_API}/create`, UserInputs, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
  };
  const useEmployeeList = async () => {
    const res = await axios.get(`${BACKEND_API}/list`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    const EmployeeList = res.data.EmployeeList;
    return EmployeeList;
  };
  const useEmployeeUpdate = async (UserInputs) => {
    const res = await axios.put(`${BACKEND_API}/update`, UserInputs, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
  };
  const useEmployeeDetails = async (id) => {
    console.log("ID", id);
    const res = await axios.get(`${BACKEND_API}/details`, {
      params: { id },
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    const EmployeeDetails = res.data.EmployeeDetails;
    console.log("EmployeeDetails", EmployeeDetails);
    return EmployeeDetails;
  };
  const useEmployeeDelete = async (id) => {
    console.log("ID", id);
    const res = await axios.delete(`${BACKEND_API}/delete/${id}`, {
      params: { id },
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    console.log(res);
  };

  return {
    useCreateEmployee,
    useEmployeeList,
    useEmployeeUpdate,
    useEmployeeDetails,
    useEmployeeDelete,
  };
};
