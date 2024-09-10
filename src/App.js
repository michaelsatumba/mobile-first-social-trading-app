// src/App.js
import { ThemeProvider, useTheme } from './ThemeContext';
import './index.css';
import ThemeToggle from './components/ThemeToggle';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MainFeed from './components/MainFeed';
import PortfolioOverview from './components/PortfolioOverview';
import Comments from './components/Comments';

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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      <Router>
        <ThemeToggle />
        <nav className="p-4 bg-gray-200 dark:bg-gray-800">
          <ul className="flex space-x-4">
            <li><Link to="/" className="text-black dark:text-white">Main Feed</Link></li>
            <li><Link to="/portfolio" className="text-black dark:text-white">Portfolio Overview</Link></li>
            <li><Link to="/comments" className="text-black dark:text-white">Comments</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<MainFeed />} />
          <Route path="/portfolio" element={<PortfolioOverview />} />
          <Route path="/comments" element={<Comments />} />
        </Routes>
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