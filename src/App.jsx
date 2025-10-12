import { Routes, Route } from "react-router-dom";
import User from "./components/user/User";
import Adminmenu from "./components/admin/Adminmenu";
import Addmenu from "./components/addmenu/Addmenu";
import Edit from "./components/addmenu/Edit";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import Protected from "./Protected";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import UserAdmin from "./components/userAdmin/UserAdmin";
import EditUser from "./components/register/editusers";
import MenuDetails from "./components/user/MenuDetails";
import Orders from "./components/order/Order";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <>
              <User />
            </>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/admin"
          element={
            <Protected>
              <Adminmenu />
            </Protected>
          }
        />
        <Route
          path="/addmenu"
          element={
            <Protected>
              <Addmenu />
            </Protected>
          }
        />
        <Route
          path="/editmenu/:id"
          element={
            <Protected>
              <Edit />
            </Protected>
          }
        />
        <Route
          path="/users"
          element={
            <Protected>
              <UserAdmin />
            </Protected>
          }
        />
        <Route
          path="/edituser/:id"
          element={
            <Protected>
              <EditUser />
            </Protected>
          }
        />
        <Route
          path="/menu/:id"
          element={
            <Protected>
              <MenuDetails />
            </Protected>
          }
        />

        <Route
          path="/orders"
          element={
            <Protected>
              <Orders/>
            </Protected>
          }
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
