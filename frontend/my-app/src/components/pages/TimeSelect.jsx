import React from 'react';

export const TimeSelect = ({ selectedDate, onBack }) => {
  const timeSlots = [
    "09:00-09:30", "09:30-10:00", "10:00-10:30", "10:30-11:00",
    "11:00-11:30", "11:30-12:00", "12:00-12:30", "12:30-13:00",
    "13:00-13:30", "13:30-14:00", "14:00-14:30", "14:30-15:00",
    "15:00-15:30", "15:30-16:00", "16:00-16:30", "16:30-17:00",
    "17:00-17:30", "17:30-18:00", "18:00-18:30", "18:30-19:00",
    "19:00-19:30"
  ];

  const timeSlotStyle = {
    listStyleType: 'none', // li要素の点を非表示にする
    padding: '5px 0'      // 上下に5pxの間隔を追加
  };

  return (
    <div>
      <h4>選択した日付：{selectedDate}</h4>
      <ul style={{ padding: 0 }}>
        {timeSlots.map((slot, index) => (
          <li key={index} style={timeSlotStyle}>
            <button>{slot}</button>
          </li>
        ))}
      </ul>
      <button onClick={onBack}>日付選択に戻る</button>
    </div>
  );
};
