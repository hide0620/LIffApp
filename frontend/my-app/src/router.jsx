import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Home } from './components/pages/Home';
import { Login } from './components/pages/Login';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};
export default AppRoutes;
