import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import liff from '@line/liff';
import "../styles/SideMenu.css";

export const SideMenu = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await liff.init({ liffId: import.meta.env.VITE_LIFF_ID });
      if (liff.isLoggedIn()) {
        liff.logout();
        navigate('/');
      } else {
        alert("You are not logged in!");
      }
    } catch (err) {
      console.error("LIFF Initialization failed", err);
    }
  };

  return (
    <div className="sideMenu">
      <h2>サイドメニュー</h2>
      <ul>
        <li><Link to="/reservation-apply">予約申込</Link></li>
        <li><button onClick={handleLogout}>ログアウト</button></li>
        <li><Link to="/mypage">マイページ</Link></li>
        <li><Link to="/reservation-history">予約履歴</Link></li>
      </ul>
    </div>
  );
};
