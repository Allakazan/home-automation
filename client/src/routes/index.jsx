import { BrowserRouter, Routes, Route } from "react-router-dom";
import Root from "../Root";
import { ProtectedRoute } from "./ProtectedRoute";
import Login from "../pages/login";
import NotFound from "../pages/404/NotFound";

import Dashboard from "../pages/dashboard";
import Devices from "../pages/devices";

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<ProtectedRoute />}>
        <Route path="/" element={<Root />} errorElement={<NotFound />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/devices" element={<Devices />} />
        </Route>
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
);
