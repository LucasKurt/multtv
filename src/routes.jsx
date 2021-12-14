import { Routes, Route, Navigate } from 'react-router-dom'

import Ams from './pages/Ams';
import Login from './pages/Login';
import Oms from './pages/Oms';
import Sms from './pages/Sms';
import Ums from './pages/Ums';

function RootRoute({ children, redirectTo }) {
  const isAuthenticated = localStorage.getItem("token") === "Root"
  return isAuthenticated ? children : <Navigate to={redirectTo} />
}

function OperadorAtivoRoute({ children, redirectTo }) {
  const isAuthenticated = localStorage.getItem("token") === "Root" || localStorage.getItem("token") === "Operador Ativo"
  return isAuthenticated ? children : <Navigate to={redirectTo} />
}

function OperadorSignalRoute({ children, redirectTo }) {
  return localStorage.getItem("token") ? children : <Navigate to={redirectTo} />
}

export default function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/ams" element={<RootRoute redirectTo={"/oms"}><Ams /></RootRoute>} />
      <Route path="/ums" element={<RootRoute redirectTo={"/oms"}><Ums /></RootRoute>} />
      <Route path="/sms" element={<OperadorAtivoRoute redirectTo={"/oms"}><Sms /></OperadorAtivoRoute>} />
      <Route path="/oms" element={<OperadorSignalRoute redirectTo={"/"}><Oms /></OperadorSignalRoute>} />
    </Routes>
  );
}