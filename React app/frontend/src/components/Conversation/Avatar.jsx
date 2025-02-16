import PropTypes from 'prop-types';
import { styles } from './styles';
import avatarImage from '../../assets/avatar.png';

/**
 * Avatar component for the conversation interface
 * @param {Object} props
 * @param {boolean} props.isActive - Whether the conversation is active
 * @param {Function} props.onClick - Click handler for the avatar
 */
const Avatar = ({ isActive, onClick }) => (
  <div style={styles.avatarContainer}>
    <img 
      src={avatarImage}
      onClick={onClick}
      alt={isActive ? "Stop Conversation" : "Start Conversation"}
      style={{
        ...styles.avatar,
        ...(isActive ? styles.avatarActive : {})
      }}
    />
  </div>
);

Avatar.propTypes = {
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Avatar;
