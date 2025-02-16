import { useState } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import ConversationComponent from './components/Conversation.jsx';
import Live from './components/Live';
import Calendar from './components/Calendar';
import Contact from './components/Contact';
import Profile from './components/Profile';

// Navigation configuration
const NAV_ITEMS = [
  {
    id: 'home',
    title: 'Home',
    component: ConversationComponent,
    icon: ({ active }) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? '#3498db' : '#6c757d'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    id: 'live',
    title: 'Live',
    component: Live,
    icon: ({ active }) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? '#3498db' : '#6c757d'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 7l-7 5 7 5V7z"/>
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
      </svg>
    ),
  },
  {
    id: 'calendar',
    title: 'Calendar',
    component: Calendar,
    icon: ({ active }) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? '#3498db' : '#6c757d'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
  },
  {
    id: 'contact',
    title: 'Contact',
    component: Contact,
    icon: ({ active }) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? '#3498db' : '#6c757d'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),
  },
  {
    id: 'profile',
    title: 'Profile',
    component: Profile,
    icon: ({ active }) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? '#3498db' : '#6c757d'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
      </svg>
    ),
  },
];

/**
 * Navigation button component
 * @param {Object} props - Component props
 * @param {string} props.id - Button identifier
 * @param {string} props.title - Button title
 * @param {boolean} props.isActive - Active state
 * @param {Function} props.onClick - Click handler
 * @param {Function} props.Icon - Icon component
 */
const NavButton = ({ id, title, isActive, onClick, Icon }) => (
  <button
    className={`nav-button ${isActive ? 'active' : ''}`}
    onClick={onClick}
    title={title}
  >
    <Icon active={isActive} />
  </button>
);

NavButton.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  Icon: PropTypes.func.isRequired,
};

/**
 * Main App component
 * Handles navigation and content rendering
 */
function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const CurrentComponent = NAV_ITEMS.find(item => item.id === currentPage)?.component || ConversationComponent;

  return (
    <div className="App">
      <div className="content">
        <CurrentComponent />
      </div>
      <nav className="bottom-nav">
        {NAV_ITEMS.map(({ id, title, icon: Icon }) => (
          <NavButton
            key={id}
            id={id}
            title={title}
            isActive={currentPage === id}
            onClick={() => setCurrentPage(id)}
            Icon={Icon}
          />
        ))}
      </nav>
    </div>
  );
}

export default App;