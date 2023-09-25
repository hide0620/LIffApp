import React, { useState } from 'react';
import axios from 'axios';
import liff from '@line/liff';
import '../styles/Register.css';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    patient_name: '',
    patient_name_kana: '',
    gender: '',
    birthday: '',
    phone_number: '',
    post_number: '',
    address: '',
    email: ''
  });

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const accessToken = liff.getAccessToken();
    const formattedBirthday = `${formData.birth_year}-${String(formData.birth_month).padStart(2, '0')}-${String(formData.birth_day).padStart(2, '0')}`;
    const data = {
      ...formData,
      birthday: formattedBirthday,
      access_token: accessToken
    };
    console.log(data);
    axios.post('http://localhost:3001/api/register', data)
      .then(response => {
        console.log('User registered:', response);
        navigate('/home');
      })
      .catch(error => {
        console.log('Registration error:', error);
      });
  };

  return (
    <div className="register-container">
      <h1>初回プロフィール登録</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>患者名</label>
          <input type="text" name="patient_name" onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label>患者名（カナ）</label>
          <input type="text" name="patient_name_kana" onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label>性別</label>
          <select name="gender" onChange={handleChange} required>
            <option value="">選択してください</option>
            <option value="male">男性</option>
            <option value="female">女性</option>
          </select>
        </div>
        <div className="input-group">
          <label>生年月日</label>
          <select className="birth-select" name="birth_year" onChange={handleChange} required>
            <option value="">年</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          <select className="birth-select" name="birth_month" onChange={handleChange} required>
            <option value="">月</option>
            {months.map(month => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
          <select className="birth-select" name="birth_day" onChange={handleChange} required>
            <option value="">日</option>
            {days.map(day => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
        </div>
        <div className="input-group">
          <label>電話番号</label>
          <input type="tel" name="phone_number" onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label>郵便番号</label>
          <input type="text" name="post_number" onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label>住所</label>
          <input type="text" name="address" onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label>メールアドレス</label>
          <input type="email" name="email" onChange={handleChange} required />
        </div>
        <button type="submit">登録</button>
      </form>
    </div>
  );
};
