import PropTypes from 'prop-types';
import { styles } from './styles';

const AVATAR_COLORS = ['#3498db', '#e74c3c', '#2ecc71', '#f1c40f', '#9b59b6', '#1abc9c'];

/**
 * Get the initial letter of a name
 * @param {string} name - Full name
 * @returns {string} Initial letter
 */
const getInitial = (name) => name.charAt(0).toUpperCase();

/**
 * Get a random color based on name
 * @param {string} name - Full name
 * @returns {string} Color hex code
 */
const getRandomColor = (name) => {
  const index = name.length % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
};

/**
 * ContactCard component displays a single contact's information
 * @param {Object} props
 * @param {Object} props.contact - Contact information
 * @param {Function} props.onClick - Click handler
 */
const ContactCard = ({ contact, onClick }) => (
  <div style={styles.contactCard} onClick={onClick}>
    <div
      style={{
        ...styles.avatar,
        backgroundColor: getRandomColor(contact.name)
      }}
    >
      {getInitial(contact.name)}
    </div>
    <div style={styles.contactInfo}>
      <div style={styles.infoContainer}>
        <div style={styles.name}>{contact.name}</div>
        <div style={styles.phone}>{contact.phone}</div>
      </div>
      <div style={styles.connectionDegree}>
        {contact.connection_degree}° Connection
      </div>
    </div>
  </div>
);

ContactCard.propTypes = {
  contact: PropTypes.shape({
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    connection_degree: PropTypes.number.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ContactCard;
