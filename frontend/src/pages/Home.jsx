import { Button } from "../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useAdmin } from "../hooks/useAdmin";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
export const Home = () => {
  const [profile, setProfile] = useState("");
  const { useLogOut } = useAuth();

  const navigate = useNavigate();
  const { id } = useParams();
  const FetchAdmin = async () => {
    const { Admin } = await useAdmin(id);
    setProfile(Admin);
  };
  useEffect(() => {
    FetchAdmin();
  }, [id]);
  // console.log(Admin);
  const handleLogOut = () => {
     useLogOut();
  };
  return (
    <div className="h-screen">
      <div className="flex justify-between">
        <div className="flex justify-left p-2 font-medium text-xl">
          Welcome Admin
        </div>
        <div className="flex justify-end gap-4">
          <div>
            <Button label={profile} onClick={() => {}} color="bg-black" />
          </div>
          <div>
            <Button label="Logout" onClick={handleLogOut} color="bg-black" />
          </div>
        </div>
      </div>
      <div className="h-screen flex items-center justify-center">
        <div className="flex flex-col ">
          <div className="">
            <Button
              label="Create Employee"
              onClick={() => {
                navigate("/admin/create");
              }}
              color="bg-black"
            />
          </div>
          <div>
            <Button
              label="View Employee"
              onClick={() => {
                navigate("/admin/list");
              }}
              color="bg-black"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
