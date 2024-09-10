import { ThemeProvider, useTheme } from './ThemeContext';
import './index.css';
import ThemeToggle from './components/ThemeToggle';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MainFeed from './components/MainFeed';
import PortfolioOverview from './components/PortfolioOverview';
import Comments from './components/Comments';
import User from './components/User';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faComments, faDollarSign, faUser, faBell } from '@fortawesome/free-solid-svg-icons';

const AppContent = () => {
  const { theme } = useTheme();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white relative">
      <Router>
      <div className="absolute top-4 right-4 space-x-4">
          <ThemeToggle />
          <FontAwesomeIcon icon={faBell} className="text-black dark:text-white" />
        </div>
        <div className="flex flex-col justify-center items-center min-h-screen">
          <Routes>
            <Route path="/" element={<MainFeed theme={theme} />} />
            <Route path="/portfolio" element={<PortfolioOverview theme={theme} />} />
            <Route path="/comments" element={<Comments />} />
            <Route path="/user" element={<User />} />
          </Routes>
        </div>
        <nav className="absolute bottom-0 w-full">
          <ul className="flex justify-around bg-gray-200 dark:bg-gray-800 p-4">
            <li>
              <Link to="/" className="text-black dark:text-white">
                <FontAwesomeIcon icon={faChartLine} />
              </Link>
            </li>
            <li>
              <Link to="/portfolio" className="text-black dark:text-white">
                <FontAwesomeIcon icon={faDollarSign} />
              </Link>
            </li>
            <li>
              <Link to="/comments" className="text-black dark:text-white">
                <FontAwesomeIcon icon={faComments} />
              </Link>
            </li>
            <li>
              <Link to="/user" className="text-black dark:text-white">
                <FontAwesomeIcon icon={faUser} />
              </Link>
            </li>
          </ul>
        </nav>
      </Router>
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;