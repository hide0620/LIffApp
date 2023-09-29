import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import 'moment/locale/ja';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { TimeSelect } from './TimeSelect';

moment.locale('ja');
const localizer = momentLocalizer(moment);

export const Reservation = props => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);
  const [selectedStartTime, setSelectedStartTime] = useState(null);
  const [selectedEndTime, setSelectedEndTime] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/api/v1/reservation_schedules')
      .then(response => {
        const fetchedEvents = response.data.map(event => {
          const eventDate = moment(event.date);
          const startTime = moment(event.start_time).format('HH:mm');
          const endTime = moment(event.end_time).format('HH:mm');
          return {
            start: new Date(eventDate.year(), eventDate.month(), eventDate.date(), startTime.split(':')[0], startTime.split(':')[1]),
            end: new Date(eventDate.year(), eventDate.month(), eventDate.date(), endTime.split(':')[0], endTime.split(':')[1]),
            title: `${startTime} - ${endTime}`
          };
        });
        setEvents(fetchedEvents);
      })
      .catch(error => {
        console.error("Error fetching the reservation slots:", error);
      });
  }, []);

  const handleBackToCalendar = () => {
    setSelectedDate(null);
  };

  const handleDateSelect = (slotInfo) => {
    const date = moment(slotInfo.start).format('YYYY-MM-DD');
    const selectedEvent = events.find(event => moment(event.start).isSame(slotInfo.start, 'day'));
    if (selectedEvent) {
      setSelectedDate(date);
      setSelectedStartTime(moment(selectedEvent.start).format('HH:mm'));
      setSelectedEndTime(moment(selectedEvent.end).format('HH:mm'));
    }
  };

  return (
    <div>
      <h3>服薬指導の予約</h3>
      {selectedDate ? (
        <TimeSelect
        selectedDate={selectedDate}
        onBack={handleBackToCalendar}
        startTime={selectedStartTime}
        endTime={selectedEndTime}
        />
      ) : (
        <>
          <Calendar
            localizer={localizer}
            defaultDate={new Date()}
            defaultView="month"
            events={events}
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
