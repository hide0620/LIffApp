import React from 'react';
import { Link } from 'react-router-dom';
import { SideMenu } from './SideMenu'; // SideMenuをインポート
import '../styles/Home.css';

export const Home = () => {
  // ダミーデータの配列
  const reservations = [
    { date: "2023/09/15 14:00", status: "キャンセル" },
    { date: "2023/09/16 15:00", status: "未実施" },
    { date: "2023/09/17 16:00", status: "完了" },
  ];

  return (
    <div className="homeContainer">
      <div className="sideMenu">
        <SideMenu /> {/* SideMenuコンポーネントを使用 */}
      </div>
      <div className="mainMenu">
        <div className="reservationInfo">
          <h2>予約情報</h2>
          {reservations.map((reservation, index) => (
            <div key={index} className="reservationItem">
              <span>予約日時: {reservation.date}</span>
              <span>{reservation.status}</span>
              <button className="detailButton">詳細</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
