import React from 'react';
import './components.css';

const Activity = ({ activity }) => {
  return (
    <li className="activity">
      <p>
        <span>{activity.user.username}</span> added <span>{activity.title.title}</span> to {activity.type === 'favorite' ? 'favorites' : 'watch later'} - {new Date(activity.updatedAt).toLocaleDateString()}
      </p>
    </li>
  );
};

export default Activity;