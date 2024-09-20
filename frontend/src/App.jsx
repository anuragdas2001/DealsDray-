import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignUp } from "./pages/signup";
import { SignIn } from "./pages/signin";
import { Home } from "./pages/Home";
import { EmployeeList } from "./pages/EmployeeList";
import { CreateEmployee } from "./pages/CreateEmployee";
import { useEmployee } from "./hooks/useEmployee";
import { EditEmployee } from "./pages/EditEmployee";
function App() {
  // const {useEmployeeDetails} = useEmployee();
  // console.log(useEmployeeDetails)
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/admin/:id" element={<Home />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/admin/create" element={<CreateEmployee />}></Route>
          <Route path="/admin/list" element={<EmployeeList />}></Route>
          <Route path="/admin/edit/:id" element={<EditEmployee />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
