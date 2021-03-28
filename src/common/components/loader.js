import React from 'react';

const Loader = (props) => {
  return <div className="loader">
    {props.loading && <div className="loader-container">
      <div className="loader-spinner spinner-border"></div>
      <span data-testid="loading" className="loader-text">{props.loadingText ? props.loadingText : 'Loading....'}</span>
    </div>}
    <div className={`loader-content${props.loading ? "--fade" : ""}`}>
      {props.children}
    </div>
  </div>
};

export default Loader;