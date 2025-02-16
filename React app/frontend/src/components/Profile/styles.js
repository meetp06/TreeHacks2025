export const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    color: '#6c757d',
    width: '100%',
    boxSizing: 'border-box'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    overflow: 'hidden',
    border: '1px solid #e9ecef',
    width: '100%',
    boxSizing: 'border-box'
  },
  header: {
    padding: '20px',
    backgroundColor: 'white',
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
    borderBottom: '1px solid #e9ecef',
    flexWrap: 'wrap',
    boxSizing: 'border-box',
    justifyContent: 'center'
  },
  avatar: {
    width: '120px',
    height: '120px',
    borderRadius: '10px',
    overflow: 'hidden',
    backgroundColor: '#f8f9fa',
    flexShrink: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  info: {
    flex: '1',
    minWidth: '250px',
    textAlign: 'center'
  },
  name: {
    color: '#2c3e50',
    marginBottom: '15px',
    fontSize: '1.8em',
    fontWeight: '500'
  },
  infoList: {
    marginBottom: '20px'
  },
  infoItem: {
    marginBottom: '8px',
    wordBreak: 'break-word'
  },
  infoLabel: {
    color: '#6c757d',
    fontWeight: 'bold'
  },
  tabs: {
    display: 'flex',
    gap: '10px',
    marginTop: '20px',
    flexWrap: 'wrap'
  },
  activeTab: {
    backgroundColor: '#3498db',
    color: 'white',
    padding: '8px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '0.9em'
  },
  inactiveTab: {
    backgroundColor: 'transparent',
    color: '#6c757d',
    padding: '8px 15px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '0.9em'
  },
  content: {
    padding: '20px',
    boxSizing: 'border-box'
  },
  section: {
    marginBottom: '30px'
  },
  sectionTitle: {
    color: '#2c3e50',
    marginBottom: '15px',
    fontSize: '1.1em',
    fontWeight: '500'
  },
  sectionText: {
    lineHeight: '1.6',
    color: '#6c757d',
    margin: 0,
    wordBreak: 'break-word'
  }
};
