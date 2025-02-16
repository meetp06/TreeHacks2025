import PropTypes from 'prop-types';
import { styles } from './styles';

/**
 * VideoPlayer component for displaying live stream
 * @param {Object} props
 * @param {string} props.channelId - YouTube channel ID for live stream
 */
const VideoPlayer = ({ channelId }) => (
  <div style={styles.videoContainer}>
    <iframe
      style={styles.videoFrame}
      src={`https://www.youtube.com/embed/live_stream?channel=${channelId}`}
      title="Live Stream"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  </div>
);

VideoPlayer.propTypes = {
  channelId: PropTypes.string.isRequired,
};

export default VideoPlayer;
