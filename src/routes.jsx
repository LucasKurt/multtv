import { Routes, Route, Navigate } from 'react-router-dom'

import Ams from './pages/Ams';
import Login from './pages/Login';
import Oms from './pages/Oms';
import Sms from './pages/Sms';
import Ums from './pages/Ums';

function PrivateRoute({ children, redirectTo, permission }) {
  const token = localStorage.getItem("token").split(",")
  const isAuthenticated = token.includes(permission)
  return isAuthenticated ? children : <Navigate to={redirectTo} />
}

export default function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/ams" element={<PrivateRoute permission={"ams"} redirectTo={"/"} ><Ams /></PrivateRoute>} />
      <Route path="/ums" element={<PrivateRoute permission={"ums"} redirectTo={"/"} ><Ums /></PrivateRoute>} />
      <Route path="/sms" element={<PrivateRoute permission={"sms"} redirectTo={"/"} ><Sms /></PrivateRoute>} />
      <Route path="/oms" element={<PrivateRoute permission={"oms"} redirectTo={"/"} ><Oms /></PrivateRoute>} />
    </Routes>
  );
}