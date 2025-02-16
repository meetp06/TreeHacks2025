import PropTypes from 'prop-types';
import { styles } from './styles';

/**
 * StatusInfo component displays the current status of the conversation
 * @param {Object} props
 * @param {string} props.connectionStatus - Current connection status
 */
const StatusInfo = ({ connectionStatus }) => {
  const indicatorStyle = {
    ...styles.statusIndicator,
    backgroundColor: connectionStatus === 'Connected' ? '#4CAF50' : '#FF0000'
  };

  return (
    <div style={styles.infoContainer}>
      <div style={styles.titleContainer}>
        <h2 style={styles.title}>Nest Care</h2>
        <div style={indicatorStyle} />
      </div>
    </div>
  );
};

StatusInfo.propTypes = {
  connectionStatus: PropTypes.oneOf(['Connected', 'Disconnected']).isRequired,
};

export default StatusInfo;
