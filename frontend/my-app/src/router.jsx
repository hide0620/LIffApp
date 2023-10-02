import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Home } from './components/pages/Home';
import { Login } from './components/pages/Login';
import { Register } from './components/pages/Register';
import { Reservation } from "./components/pages/Reservatio";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reservation" element={<Reservation/>} />
      </Routes>
    </BrowserRouter>
  );
};
export default AppRoutes;
