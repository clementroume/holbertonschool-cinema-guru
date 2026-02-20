import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from '../../components/navigation/Header';
import SideBar from '../../components/navigation/SideBar';
import HomePage from './HomePage';
import Favorites from './Favorites';
import WatchLater from './WatchLater';
import './dashboard.css';

const Dashboard = ({ userUsername, setIsLoggedIn }) => {
  return (
      <BrowserRouter>
        <div className="dashboard">
          <Header userUsername={userUsername} setIsLoggedIn={setIsLoggedIn} />
          <div className="dashboard-content">
            <SideBar />

            <div className="page-content" style={{ flex: 1, padding: '2rem' }}>
              <Routes>
                <Route path="/home" element={<HomePage />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/watchlater" element={<WatchLater />} />

                <Route path="*" element={<Navigate to="/home" />} />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
  );
};

export default Dashboard;