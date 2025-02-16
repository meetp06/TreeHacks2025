import { useState, useEffect } from 'react';
import { styles } from './Live/styles';
import { SAMPLE_DATA } from './Live/types';
import VideoPlayer from './Live/VideoPlayer';
import AlertCard from './Live/AlertCard';

/**
 * Live component displays a live video stream and real-time alerts
 */
const Live = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        // TODO: Replace with actual API call
        // const response = await fetch('/api/alerts');
        // const data = await response.json();
        // setAlerts(data.alerts);
        setAlerts(SAMPLE_DATA.alerts);
      } catch (error) {
        console.error('Error fetching alerts:', error);
      }
    };

    fetchAlerts();

    // TODO: Implement polling
    // const interval = setInterval(fetchAlerts, 30000);
    // return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.container}>
      <VideoPlayer channelId="UC_x5XG1OV2P6uZZ5FSM9Ttw" />
      <div style={styles.alertsContainer}>
        <h2 style={styles.alertsTitle}>Live Alerts</h2>
        <div style={styles.alertsList}>
          {alerts.map((alert, index) => (
            <AlertCard
              key={`${alert.timestamp}-${index}`}
              alert={alert}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Live;
