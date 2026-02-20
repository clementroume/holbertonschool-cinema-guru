import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faStar, faClock, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Activity from '../Activity';
import './navigation.css';

const SideBar = () => {
  const [selected, setSelected] = useState("Home");
  const [isExpanded, setIsExpanded] = useState(false);
  const [activities, setActivities] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Home", path: "/home", icon: faFolder },
    { name: "Favorites", path: "/favorites", icon: faStar },
    { name: "Watch Later", path: "/watchlater", icon: faClock }
  ];

  useEffect(() => {
    if (location.pathname === '/favorites') {
      setSelected("Favorites");
    } else if (location.pathname === '/watchlater') {
      setSelected("Watch Later");
    } else {
      setSelected("Home");
    }
  }, [location.pathname]);

  const fetchActivities = () => {
    const accessToken = localStorage.getItem('accessToken');
    axios.get('/api/activity', {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    .then((response) => {
      if (Array.isArray(response.data)) setActivities(response.data);
    })
    .catch((error) => console.error("Error fetching activities:", error));
  };

  useEffect(() => {
    fetchActivities(); // On charge les données initiales

    window.addEventListener('activityUpdated', fetchActivities);

    return () => {
      window.removeEventListener('activityUpdated', fetchActivities);
    };
  }, [location.pathname]);

  return (
      <nav
          className={`sidebar ${!isExpanded ? "small" : ""}`}
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
      >
        <ul className="navigation">
          {menuItems.map((item) => (
              <li
                  key={item.name}
                  className={selected === item.name ? "active" : ""}
                  onClick={() => navigate(item.path)}
              >
                <FontAwesomeIcon icon={item.icon} />
                <span className="nav-text">{item.name}</span>
                {selected === item.name && <FontAwesomeIcon icon={faArrowRight} className="nav-arrow" />}
              </li>
          ))}
        </ul>

        {isExpanded && (
            <div className="activities-section">
              <h2>Latest Activities</h2>
              <ul className="activities">
                {activities?.slice(0, 10).map((activity) => (
                    <Activity key={activity.id} activity={activity} />
                ))}
              </ul>
            </div>
        )}
      </nav>
  );
};

export default SideBar;