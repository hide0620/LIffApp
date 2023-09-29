import React from 'react';
import moment from 'moment';

export const TimeSelect = ({ selectedDate, onBack, startTime, endTime }) => {
  const generateTimeSlots = (start, end) => {
    const slots = [];
    const today = moment().format('YYYY-MM-DD');
    let current = moment(`${today} ${start}`);
    const endMoment = moment(`${today} ${end}`);
    while (current.isBefore(endMoment)) {
      const next = current.clone().add(30, 'minutes');
      slots.push(`${current.format('HH:mm')}-${next.format('HH:mm')}`);
      current = next;
    }
    return slots;
  };

  const timeSlots = generateTimeSlots(startTime, endTime);
  const timeSlotStyle = {
    listStyleType: 'none',
    padding: '5px 0'
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
