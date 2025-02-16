import PropTypes from 'prop-types';
import { styles } from './styles';

/**
 * Section component for profile content
 * @param {Object} props
 * @param {string} props.title - Section title
 * @param {string} props.content - Section content
 */
const Section = ({ title, content }) => (
  <section style={styles.section}>
    <h3 style={styles.sectionTitle}>{title}</h3>
    <p style={styles.sectionText}>{content}</p>
  </section>
);

Section.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

/**
 * ProfileContent component displays the main content based on active tab
 * @param {Object} props
 * @param {Object} props.profile - Profile data
 * @param {string} props.activeTab - Currently active tab
 */
const ProfileContent = ({ profile, activeTab }) => {
  if (activeTab === 'ABOUT') {
    return (
      <div style={styles.content}>
        <Section title="BIO" content={profile.bio} />
        <Section title="MEDICAL CONDITION" content={profile.medical_condition} />
        <Section title="CONTACT INFORMATION" content={`Emergency Contact: ${profile.emergency_contact}\nPhone: ${profile.phone}`} />
      </div>
    );
  }

  if (activeTab === 'WORK') {
    return (
      <div style={styles.content}>
        <p style={styles.sectionText}>Work history and experience will be displayed here.</p>
      </div>
    );
  }

  if (activeTab === 'ACTIVITY') {
    return (
      <div style={styles.content}>
        <p style={styles.sectionText}>Recent activity and updates will be displayed here.</p>
      </div>
    );
  }

  return null;
};

ProfileContent.propTypes = {
  profile: PropTypes.shape({
    bio: PropTypes.string.isRequired,
    medical_condition: PropTypes.string.isRequired,
    emergency_contact: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }).isRequired,
  activeTab: PropTypes.oneOf(['ABOUT', 'WORK', 'ACTIVITY']).isRequired,
};

export default ProfileContent;
