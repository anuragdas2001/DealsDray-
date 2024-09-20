import axios from "axios";
import { useNavigate } from "react-router-dom";
const BACKEND_API = import.meta.env.VITE_BACKEND_API;
// console.log("Backend API URL:", backendApi);

export const useAuth = () => {
  const navigate = useNavigate();
  const useSignUp = async (UserInputs) => {
    const res = await axios.post(`${BACKEND_API}/signup`, UserInputs);
    navigate("/signin")
    console.log(res);
  };
  const useLogin = async (UserInputs) => {
    const res = await axios.post(`${BACKEND_API}/signin`, UserInputs);
    localStorage.setItem("token", `Bearer ${res.data.token}`);
    const AdminId = res.data.AdminExists._id;
    navigate(`/admin/${AdminId}`);
  };
  const useLogOut = async () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };
  return { useSignUp, useLogin, useLogOut };
};
