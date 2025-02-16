import PropTypes from 'prop-types';
import { styles } from './styles';
import EventCard from './EventCard';

/**
 * DayCard component displays a day's events
 * @param {Object} props
 * @param {string} props.date - The date to display
 * @param {Array} props.events - Array of events for the day
 * @param {Function} props.formatDate - Function to format the date
 * @param {Function} props.onEventClick - Click handler for events
 */
const DayCard = ({ date, events, formatDate, onEventClick }) => (
  <div style={styles.dayCard}>
    <div style={styles.dayHeader}>
      {formatDate(date)}
    </div>
    <div style={styles.eventsContainer}>
      {events.map((event, eventIndex) => (
        <EventCard
          key={`${date}-${eventIndex}`}
          time={event.event_time}
          title={event.event_details.name}
          description={event.event_details.description}
          isLast={eventIndex === events.length - 1}
          onClick={() => onEventClick(event)}
        />
      ))}
    </div>
  </div>
);

DayCard.propTypes = {
  date: PropTypes.string.isRequired,
  events: PropTypes.arrayOf(PropTypes.shape({
    event_time: PropTypes.string.isRequired,
    event_details: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }).isRequired,
  })).isRequired,
  formatDate: PropTypes.func.isRequired,
  onEventClick: PropTypes.func.isRequired,
};

export default DayCard;
