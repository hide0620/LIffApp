import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/ja';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { TimeSelect } from './TimeSelect';

moment.locale('ja');
const localizer = momentLocalizer(moment);

export const Reservation = props => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);

  const handleBackToCalendar = () => {
    setSelectedDate(null);
  };

  const handleDateSelect = (slotInfo) => {
    const date = moment(slotInfo.start).format('YYYY-MM-DD');
    setSelectedDate(date);
  };


  return (
    <div>
      <h3>服薬指導の予約</h3>
      {selectedDate ? (
        <TimeSelect selectedDate={selectedDate} onBack={handleBackToCalendar}  />
      ) : (
        <>
          <Calendar
            localizer={localizer}
            defaultDate={new Date()}
            defaultView="month"
            events={props.events}
            selectable={true}
            style={{ height: "500px", width: "80%", margin: "0 auto" }}
            messages={{
              next: "次の月",
              previous: "前の月",
              today: "今日",
            }}
            views={["month"]}
            formats={{
              monthHeaderFormat: (date) => {
                return `${date.getFullYear()}年${date.getMonth() + 1}月`;
              },
            }}
            onSelectSlot={handleDateSelect}
            onSelectEvent={handleDateSelect}
          />
          <button onClick={() => navigate('/home')} style={{ marginTop: '20px' }}>戻る</button>
        </>
      )}
    </div>
  );
};
