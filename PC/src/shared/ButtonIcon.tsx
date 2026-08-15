import React from 'react';

const ButtonIcon = (props) => {
  return props.loading ? (
    <div className="spinner"></div>
  ) : props.iconClass ? (
    <i className={props.iconClass} />
  ) : null;
};

<style>{`
  .spinner {
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top: 2px solid white;
    width: 16px;
    height: 16px;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`}</style>

export default ButtonIcon;