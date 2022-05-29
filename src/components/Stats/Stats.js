import React from 'react';
import './styles.css';

export default ({ stats }) => {
  if (!stats) {
    return <span className="stats">Loading...</span>;
  }

  return (
    <span className="stats">
      {stats.error && 'Error!'}
      {stats.isLoading && 'Loading...'}
      {stats.downloads !== null && `${stats.downloads} downloads`}
    </span>
  );
};
