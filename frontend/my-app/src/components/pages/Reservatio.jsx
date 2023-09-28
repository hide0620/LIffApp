import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/ja';
import 'react-big-calendar/lib/css/react-big-calendar.css';

moment.locale('ja');
const localizer = momentLocalizer(moment);

export const Reservation = props => {
  return (
    <div>
      <h3>服薬指導の予約</h3>
      <Calendar
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={props.events}
        style={{ height: "500px", width: "80%", margin: "0 auto" }}
        messages={{
          next: "次の月",
          previous: "前の月",
          today: "今日",
          // 他のメッセージも必要に応じて追加できます
        }}
        views={["month"]} // 月ビューのみを表示
        formats={{
          monthHeaderFormat: (date) => {
            return `${date.getFullYear()}年${date.getMonth() + 1}月`;
          },
          // 他のフォーマットも必要に応じて追加できます
        }}
      />
    </div>
  );
};
