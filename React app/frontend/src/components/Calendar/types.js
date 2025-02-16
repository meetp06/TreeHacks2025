/**
 * @typedef {Object} EventDetails
 * @property {string} name - The name of the event
 * @property {string} description - The description of the event
 */

/**
 * @typedef {Object} Event
 * @property {string} event_time - The time of the event
 * @property {EventDetails} event_details - Details of the event
 */

/**
 * @typedef {Object} Day
 * @property {string} date - The date of the day
 * @property {Event[]} events - Array of events for the day
 */

/**
 * @typedef {Object} CalendarData
 * @property {Day[]} days - Array of days with events
 */

export const SAMPLE_DATA = {
  days: [
    {
      date: "2025-02-15",
      events: [
        {
          event_time: "7:00 AM",
          event_details: {
            name: "Morning Run",
            description: "A light jog to start the day."
          }
        },
        {
          event_time: "9:30 AM",
          event_details: {
            name: "Doctor's Visit - Yearly Checkup",
            description: "Annual checkup with Dr. Emily Clarkson for health screening."
          }
        }
      ]
    },
    {
      date: "2025-02-16",
      events: [
        {
          event_time: "6:00 PM",
          event_details: {
            name: "Evening Walk",
            description: "A brisk walk in the evening to wind down."
          }
        }
      ]
    }
  ]
};
