export const styles = {
  container: {
    color: '#6c757d',
    padding: '0 20px 0',
    maxWidth: '800px',
    margin: '0 auto'
  },
  header: {
    color: '#2c3e50',
    marginBottom: '30px',
    textAlign: 'center'
  },
  daysContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  dayCard: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    overflow: 'hidden'
  },
  dayHeader: {
    backgroundColor: '#f8f9fa',
    borderBottom: '1px solid #e9ecef',
    color: '#2c3e50',
    padding: '12px 20px',
    fontSize: '1.1em',
    fontWeight: '500'
  },
  eventsContainer: {
    padding: '15px 20px'
  },
  eventCard: {
    display: 'flex',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    padding: '12px 15px',
    borderRadius: '6px',
    border: '1px solid #e9ecef',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    cursor: 'pointer',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }
  },
  eventTime: {
    minWidth: '85px',
    paddingRight: '15px',
    borderRight: '2px solid #e9ecef',
    color: '#3498db',
    fontWeight: '600',
    fontSize: '0.9em'
  },
  eventDetails: {
    flex: 1,
    paddingLeft: '15px'
  },
  eventTitle: {
    fontSize: '1em',
    fontWeight: '500',
    color: '#2c3e50',
    marginBottom: '4px'
  },
  eventDescription: {
    margin: '0',
    color: '#6c757d',
    fontSize: '0.9em',
    lineHeight: '1.5'
  }
};
