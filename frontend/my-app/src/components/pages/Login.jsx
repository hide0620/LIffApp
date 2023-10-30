import React, { useEffect, useState } from "react";
import liff from '@line/liff';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css';

export const Login = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    function setCookie(name, value, days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      const expires = "expires=" + date.toUTCString();
      document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }
    liff.init({ liffId: import.meta.env.VITE_LIFF_ID })
    .then(() => {
      setIsLoggedIn(liff.isLoggedIn());
      if (liff.isLoggedIn()) {
        const accessToken = liff.getAccessToken();
          axios.post('http://localhost:3001/api/v1/check_user', {
            access_token: accessToken
          })
          .then(response => {
            if (response.data.is_new_user) {
              navigate('/register'); // 新規ユーザー登録画面に遷移
            } else {
              navigate('/home'); // ホーム画面に遷移
              const user_id = response.data.user_id
              setCookie('user_id', user_id, 30);
            }
          })
          .catch(error => {
            console.error('Error:', error);
          });
        }
      })
      .catch((err) => {
        console.error("LIFF Initialization failed", err);
      });
  }, [navigate]);

  const handleLogin = () => {
    if (!liff.isLoggedIn()) {
      liff.login();
    } else {
      alert("You are already logged in!");
    }
  };

  return (
    <div>
      {!isLoggedIn && <button className="loginButton" onClick={handleLogin}>LINEアカウントでログイン</button>}
    </div>
  );
};



