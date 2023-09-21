import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
// import MyPage from './components/organisms/MyPage';
import { Login } from './components/pages/Login';

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/mypage" element={<MyPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
};
