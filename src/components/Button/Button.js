import React from 'react';

import './styles.css';

export default ({ children, loading, ...props }) => {
  return (
    <button className="button" disabled={loading} {...props}>
      {loading ? 'Loading...' : children}
    </button>
  );
};
