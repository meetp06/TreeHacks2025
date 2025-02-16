import PropTypes from 'prop-types';
import { styles } from './styles';

/**
 * EventCard component displays a single calendar event
 * @param {Object} props
 * @param {string} props.time - Event time
 * @param {string} props.title - Event title
 * @param {string} props.description - Event description
 * @param {boolean} props.isLast - Whether this is the last event in the list
 * @param {Function} props.onClick - Click handler for the event
 */
const EventCard = ({ time, title, description, isLast, onClick }) => (
  <div
    style={{
      ...styles.eventCard,
      marginBottom: isLast ? 0 : '15px'
    }}
    onClick={onClick}
    role="button"
    tabIndex={0}
    onKeyPress={(e) => e.key === 'Enter' && onClick()}
  >
    <div style={styles.eventTime}>{time}</div>
    <div style={styles.eventDetails}>
      <div style={styles.eventTitle}>{title}</div>
      <p style={styles.eventDescription}>{description}</p>
    </div>
  </div>
);

EventCard.propTypes = {
  time: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  isLast: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default EventCard;
