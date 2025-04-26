import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import CustomerLayout from "./layouts/CustomerLayout";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import RequireAuth from "./components/RequireAuth"; // import cái mình vừa tạo
import GuestLayout from "./layouts/GuestLayout";
import UserList from "./pages/UserList";
import Register from "./pages/Register";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<GuestLayout />}>
        <Route index element={<Navigate to="login" />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      <Route
        element={<CustomerLayout allowedRoles={["ROLE_USER", "ROLE_ADMIN"]} />}
      >
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route
        element={<CustomerLayout allowedRoles={["ROLE_ADMIN"]} />}
      >
        <Route path="users" element={<UserList />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
