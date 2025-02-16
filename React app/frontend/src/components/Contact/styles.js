export const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    boxSizing: 'border-box'
  },
  header: {
    color: '#2c3e50',
    marginTop: '20px',
    marginBottom: '20px'
  },
  searchContainer: {
    marginBottom: '30px',
    position: 'relative'
  },
  searchIcon: {
    position: 'absolute',
    left: '15px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '16px',
    height: '16px',
    fill: '#6c757d',
    opacity: 0.5
  },
  searchInput: {
    width: '100%',
    padding: '12px 20px 12px 40px',
    fontSize: '0.95em',
    border: '1px solid #e9ecef',
    borderRadius: '25px',
    outline: 'none',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    boxSizing: 'border-box',
    color: '#2c3e50',
    backgroundColor: 'white',
    transition: 'all 0.2s ease',
    '::placeholder': {
      color: '#6c757d',
      opacity: 0.7
    }
  },
  contactsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  contactCard: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 15px',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    gap: '15px',
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
    ':hover': {
      transform: 'translateX(5px)'
    }
  },
  avatar: {
    width: '45px',
    height: '45px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '1.2em',
    fontWeight: '500'
  },
  contactInfo: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  infoContainer: {
    flex: 1
  },
  name: {
    color: '#2c3e50',
    fontWeight: '500',
    marginBottom: '4px'
  },
  phone: {
    color: '#6c757d',
    fontSize: '0.9em'
  },
  connectionDegree: {
    backgroundColor: '#3498db',
    color: 'white',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '0.8em'
  }
};
