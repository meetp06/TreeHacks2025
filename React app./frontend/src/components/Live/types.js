/**
 * @typedef {'Critical' | 'Warning' | 'Info'} AlertType
 */

/**
 * @typedef {Object} Alert
 * @property {string} timestamp - ISO timestamp of the alert
 * @property {AlertType} alert_type - Type of the alert
 * @property {string} message - Alert message
 */

export const SAMPLE_DATA = {
  alerts: [
    {
      timestamp: "2025-02-15T10:30:00Z",
      alert_type: "Warning",
      message: "CPU usage exceeds 80%"
    },
    {
      timestamp: "2025-02-15T11:00:00Z",
      alert_type: "Critical",
      message: "Disk space is running low"
    },
    {
      timestamp: "2025-02-15T12:15:00Z",
      alert_type: "Info",
      message: "System maintenance completed successfully"
    }
  ]
};

export const ALERT_COLORS = {
  critical: '#dc3545',
  warning: '#ffc107',
  info: '#0dcaf0',
  default: '#6c757d'
};
