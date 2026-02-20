import React from 'react';
import './components.css';

const Activity = ({ activity }) => {
  let actionText = "";

  switch (activity?.activityType) {
    case 'favorite':
      actionText = "added to favorites";
      break;
    case 'watchLater':
      actionText = "added to watch later";
      break;
    case 'removeFavorited':
      actionText = "removed from favorites";
      break;
    case 'removeWatchLater':
      actionText = "removed from watch later";
      break;
    default:
      actionText = "interacted with";
  }

  return (
      <li className="activity">
        <p>
          <span>{activity?.user?.username || "A user"}</span> {actionText} <span>{activity?.title?.title || "a movie"}</span> - {new Date(activity?.createdAt).toLocaleDateString()}
        </p>
      </li>
  );
};

export default Activity;