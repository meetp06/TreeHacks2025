export const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '20px'
  },
  videoContainer: {
    height: '30%',
    backgroundColor: '#1a1a1a',
    borderRadius: '10px',
    overflow: 'hidden',
    position: 'relative',
    paddingTop: '16.25%' // 16:9 aspect ratio
  },
  videoFrame: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    border: 'none'
  },
  alertsContainer: {
    flex: 1,
    overflowY: 'auto',
    backgroundColor: '#f8f9fa',
    borderRadius: '10px',
    paddingTop: '20px'
  },
  alertsTitle: {
    marginBottom: '20px'
  },
  alertsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  alertCard: {
    backgroundColor: 'white',
    padding: '15px',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  alertType: {
    fontWeight: 'bold',
    marginBottom: '5px'
  },
  timestamp: {
    fontSize: '0.8em',
    color: '#6c757d'
  }
};
