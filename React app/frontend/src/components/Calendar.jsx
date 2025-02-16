import { useState, useEffect, useCallback } from 'react';
import { styles } from './Calendar/styles';
import { SAMPLE_DATA } from './Calendar/types';
import DayCard from './Calendar/DayCard';

/**
 * Calendar component displays a list of days with their events
 */
const Calendar = () => {
  const [calendarData, setCalendarData] = useState([]);

  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        // TODO: Replace with actual API call
        // const response = await fetch('/api/calendar');
        // const data = await response.json();
        // setCalendarData(data.days);
        setCalendarData(SAMPLE_DATA.days);
      } catch (error) {
        console.error('Error fetching calendar data:', error);
      }
    };

    fetchCalendarData();
  }, []);

  const formatDate = useCallback((dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }, []);

  const handleEventClick = useCallback((event) => {
    // TODO: Implement event click handler
    console.log('Event clicked:', event);
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Calendar Events</h2>
      <div style={styles.daysContainer}>
        {calendarData.map((day, index) => (
          <DayCard
            key={day.date}
            date={day.date}
            events={day.events}
            formatDate={formatDate}
            onEventClick={handleEventClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Calendar;
