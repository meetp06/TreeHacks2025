import PropTypes from 'prop-types';
import { styles } from './styles';
import { ALERT_COLORS } from './types';

/**
 * Get color for alert type
 * @param {string} alertType - Type of alert
 * @returns {string} Color code
 */
const getAlertColor = (alertType) => {
  const type = alertType.toLowerCase();
  return ALERT_COLORS[type] || ALERT_COLORS.default;
};

/**
 * Format timestamp to locale string
 * @param {string} timestamp - ISO timestamp
 * @returns {string} Formatted date string
 */
const formatTimestamp = (timestamp) => {
  return new Date(timestamp).toLocaleString();
};

/**
 * AlertCard component displays a single alert
 * @param {Object} props
 * @param {Object} props.alert - Alert data
 */
const AlertCard = ({ alert }) => {
  const alertColor = getAlertColor(alert.alert_type);
  
  return (
    <div
      style={{
        ...styles.alertCard,
        borderLeft: `5px solid ${alertColor}`
      }}
    >
      <div>
        <div style={{
          ...styles.alertType,
          color: alertColor
        }}>
          {alert.alert_type}
        </div>
        <div>{alert.message}</div>
      </div>
      <div style={styles.timestamp}>
        {formatTimestamp(alert.timestamp)}
      </div>
    </div>
  );
};

AlertCard.propTypes = {
  alert: PropTypes.shape({
    timestamp: PropTypes.string.isRequired,
    alert_type: PropTypes.oneOf(['Critical', 'Warning', 'Info']).isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired,
};

export default AlertCard;
