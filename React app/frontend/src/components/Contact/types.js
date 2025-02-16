/**
 * @typedef {Object} Contact
 * @property {string} name - Contact's full name
 * @property {string} phone - Contact's phone number
 * @property {number} connection_degree - Degree of connection (1-3)
 */

/**
 * @typedef {Object} ContactsData
 * @property {number} id - User ID
 * @property {Contact[]} contacts - Array of contacts
 */

export const SAMPLE_DATA = {
  id: 5353,
  contacts: [
    {
      name: "David Sarpong",
      phone: "+233094474494",
      connection_degree: 1
    },
    {
      name: "Abigail Nartey",
      phone: "+233533698412",
      connection_degree: 2
    },
    {
      name: "Samuel Tetteh",
      phone: "+233581023647",
      connection_degree: 3
    },
    {
      name: "Abigail Tetteh",
      phone: "+233501497265",
      connection_degree: 1
    }
  ]
};
