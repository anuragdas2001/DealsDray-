import axios from "axios";
const BACKEND_API = import.meta.env.VITE_BACKEND_API;
export const useAdmin = async (id) => {
  const res = await axios.get(`${BACKEND_API}/`, {
    params: { id },
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
  console.log(res)
  const Admin = res.data.admin.username;
  return { Admin };
};
