export const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px'
  },
  avatarContainer: {
    padding: '20px 0 0'
  },
  avatar: {
    width: '260px',
    height: '260px',
    marginTop: '120px',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, opacity 0.3s ease',
    ':hover': {
      transform: 'scale(1.05)'
    }
  },
  avatarActive: {
    opacity: 0.7,
    transform: 'scale(0.95)'
  },
  infoContainer: {
    fontSize: '18px',
    textAlign: 'center'
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '10px'
  },
  title: {
    margin: 0
  },
  statusText: {
    marginBottom: '10px'
  },
  statusIndicator: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    transition: 'background-color 0.3s ease'
  }
};
