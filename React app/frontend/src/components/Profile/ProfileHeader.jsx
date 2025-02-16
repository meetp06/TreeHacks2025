import PropTypes from 'prop-types';
import { styles } from './styles';

/**
 * Format date string to locale format
 * @param {string} dateString - Date string in YYYY-MM-DD format
 * @returns {string} Formatted date string
 */
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit'
  });
};

/**
 * ProfileHeader component displays user's basic information
 * @param {Object} props
 * @param {Object} props.profile - Profile data
 * @param {string} props.activeTab - Currently active tab
 * @param {Function} props.onTabChange - Tab change handler
 */
const ProfileHeader = ({ profile, activeTab, onTabChange }) => (
  <div style={styles.header}>
    <div style={styles.avatar}>
      <img
        src={profile.profile_image_url}
        alt={profile.name}
        style={styles.avatarImage}
      />
    </div>

    <div style={styles.info}>
      <h2 style={styles.name}>{profile.name}</h2>
      
      <div style={styles.infoList}>
        <div style={styles.infoItem}>
          <strong style={styles.infoLabel}>Email: </strong>
          {profile.email}
        </div>
        <div style={styles.infoItem}>
          <strong style={styles.infoLabel}>Date of Birth: </strong>
          {formatDate(profile.dob)}
        </div>
        <div style={styles.infoItem}>
          <strong style={styles.infoLabel}>Address: </strong>
          {profile.address}
        </div>
      </div>

      <div style={styles.tabs}>
        {['ABOUT', 'WORK', 'ACTIVITY'].map(tab => (
          <button
            key={tab}
            style={tab === activeTab ? styles.activeTab : styles.inactiveTab}
            onClick={() => onTabChange(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  </div>
);

ProfileHeader.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    dob: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    profile_image_url: PropTypes.string.isRequired,
  }).isRequired,
  activeTab: PropTypes.oneOf(['ABOUT', 'WORK', 'ACTIVITY']).isRequired,
  onTabChange: PropTypes.func.isRequired,
};

export default ProfileHeader;
