import { useState, useEffect, useCallback } from 'react';
import { styles } from './Contact/styles';
import { SAMPLE_DATA } from './Contact/types';
import SearchBar from './Contact/SearchBar';
import ContactCard from './Contact/ContactCard';

/**
 * Contact component displays a searchable list of contacts
 */
const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredContacts, setFilteredContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        // TODO: Replace with actual API call
        // const response = await fetch('/api/contacts');
        // const data = await response.json();
        // setContacts(data.contacts);
        setContacts(SAMPLE_DATA.contacts);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();
  }, []);

  useEffect(() => {
    // Filter and sort contacts based on search query and connection degree
    const filtered = contacts
      .filter(contact => 
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.phone.includes(searchQuery)
      )
      .sort((a, b) => a.connection_degree - b.connection_degree);
    
    setFilteredContacts(filtered);
  }, [contacts, searchQuery]);

  const handleContactClick = useCallback((contact) => {
    // TODO: Implement contact click handler
    console.log('Contact clicked:', contact);
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>My Contacts</h2>
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      <div style={styles.contactsList}>
        {filteredContacts.map((contact, index) => (
          <ContactCard
            key={`${contact.name}-${index}`}
            contact={contact}
            onClick={() => handleContactClick(contact)}
          />
        ))}
      </div>
    </div>
  );
};

export default Contact;
