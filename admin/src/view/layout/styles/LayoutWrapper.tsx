import styled from 'styled-components';

const LayoutWrapper = styled.div`
  color: rgba(0, 0, 0, 0.65);
  background-color: #f0f2f5;
  display: flex;
  font-size: 13px;

  button {
    font-size: 13px;
  }

  .btn {
    font-size: 13px;
  }

  h1 {
    font-size: 1.75em;
  }

  .bg-primary-light {
    background-color: #e6f7ff;
  }

  .primary-light {
    color: #e6f7ff;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: rgba(0, 0, 0, 0.85);
  }

  .content {
    padding: 0px 15px;
  }

  .form-group {
    margin-bottom: 0;
  }

  .form-control {
    font-size: inherit;
  }

  .main {
    display: flex;
    flex-direction: column;
    flex: auto;
    background: #f8f9fa;
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* Sidebar Container */
  .sidebar-container {
    background: linear-gradient(
      135deg,
      #2c3e50 0%,
      #1a1f2c 100%
    );
    height: 100%;
    // position: fixed;
    left: 0;
    top: 0;
    width: 280px;
    overflow-y: auto;
    overflow-x: hidden;
    z-index: 1000;
    box-shadow: 3px 0 15px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, width 0.3s ease;
    padding-bottom: 20px;
  }

  .sidebar-container::-webkit-scrollbar {
    width: 6px;
  }

  .sidebar-container::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
  }

  .sidebar-container::-webkit-scrollbar-thumb:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }

  /* Logo Styles */
  .sidebar-logo {
    padding: 24px 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    margin-bottom: 10px;
    text-align: center;
    transition: padding 0.3s ease;
  }

  .sidebar-logo a {
    color: #fff;
    text-decoration: none;
    display: inline-block;
  }

  .logo-image {
    transition: all 0.3s ease;
    max-width: 180px;
    vertical-align: middle;
  }

  .logo-text {
    font-size: 22px;
    font-weight: 700;
    color: #fff;
  }

  /* Menu List Styles */
  .sidebar-menu-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  /* Section Header Styles */
  .sidebar-section-header {
    padding: 18px 20px 8px;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 1.2px;
    color: rgba(255, 255, 255, 0.5);
    font-weight: 600;
    margin-top: 10px;
    transition: padding 0.3s ease;
  }

  /* Menu Item Styles */
  .sidebar-menu-item {
    position: relative;
    margin: 4px 12px;
    border-radius: 8px;
    transition: all 0.3s ease;
    overflow: hidden;
  }

  .sidebar-menu-item:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 4px;
    background: #3498db;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .sidebar-menu-item a {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    border-radius: 8px;
    transition: all 0.3s ease;
    position: relative;
  }

  .sidebar-menu-item a:hover {
    background: rgba(255, 255, 255, 0.08);
    color: #fff;
  }

  .sidebar-icon {
    margin-right: 12px;
    font-size: 18px;
    width: 24px;
    text-align: center;
    transition: margin-right 0.3s ease;
  }

  .sidebar-label {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* Active State */
  .sidebar-menu-item.active {
    background: rgba(52, 152, 219, 0.15);
  }

  .sidebar-menu-item.active:before {
    opacity: 1;
  }

  .sidebar-menu-item.active a {
    color: #fff;
  }

  /* Locked Menu Items */
  .sidebar-menu-item.locked {
    cursor: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    opacity: 0.5;
    padding: 12px 16px;
    color: rgba(255, 255, 255, 0.4);
  }

  .sidebar-item-content {
    display: flex;
    align-items: center;
  }

  /* Responsive Design */
  @media (max-width: 992px) {
    .sidebar-container {
      width: 240px;
    }

    .sidebar-logo {
      padding: 20px 15px;
    }

    .sidebar-section-header {
      padding: 15px 15px 5px;
    }

    .sidebar-menu-item a {
      padding: 10px 14px;
    }
  }

  @media (max-width: 768px) {
    .sidebar-container {
      width: 280px;
    }

    .sidebar-container.mobile-open {
    }

    .sidebar-logo {
      padding: 24px 20px;
    }

    .sidebar-section-header {
      padding: 18px 20px 8px;
    }

    .sidebar-menu-item a {
      padding: 12px 16px;
    }
  }

  /* Animation for menu items */
  @keyframes slideIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .sidebar-menu-item {
    animation: slideIn 0.3s ease forwards;
  }

  .sidebar-menu-item:nth-child(1) {
    animation-delay: 0.05s;
  }
  .sidebar-menu-item:nth-child(2) {
    animation-delay: 0.1s;
  }
  .sidebar-menu-item:nth-child(3) {
    animation-delay: 0.15s;
  }
  .sidebar-menu-item:nth-child(4) {
    animation-delay: 0.2s;
  }
  .sidebar-menu-item:nth-child(5) {
    animation-delay: 0.25s;
  }
  .sidebar-menu-item:nth-child(6) {
    animation-delay: 0.3s;
  }

  /* Highlight effect for active menu item */
  .sidebar-menu-item.active a:after {
    content: '';
    position: absolute;
    top: 50%;
    right: 10px;
    width: 8px;
    height: 8px;
    background: #3498db;
    border-radius: 50%;
    transform: translateY(-50%);
  }

  /* Focus states for accessibility */
  .sidebar-menu-item a:focus {
    outline: 2px solid rgba(52, 152, 219, 0.5);
    outline-offset: -2px;
  }

  /* Compact mode for smaller screens */
  .sidebar-container.compact {
    width: 80px;
  }

  .sidebar-container.compact .sidebar-logo {
    padding: 20px 10px;
  }

  .sidebar-container.compact .logo-image {
    width: 40px;
  }

  .sidebar-container.compact .sidebar-section-header,
  .sidebar-container.compact .sidebar-label {
    display: none;
  }

  .sidebar-container.compact .sidebar-menu-item a {
    justify-content: center;
    padding: 15px 10px;
  }

  .sidebar-container.compact .sidebar-icon {
    margin-right: 0;
    font-size: 20px;
  }

  .sidebar-container.compact .sidebar-menu-item {
    margin: 4px 8px;
  }

  /* Dark mode support */
  @media (prefers-color-scheme: dark) {
    .sidebar-container {
    
    }
  }

  /* High contrast mode support */
  @media (prefers-contrast: high) {
    .sidebar-container {
      border-right: 1px solid #fff;
    }

    .sidebar-menu-item a {
      border: 1px solid transparent;
    }

    .sidebar-menu-item a:hover {
      border-color: #fff;
    }
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    .sidebar-container,
    .sidebar-menu-item,
    .sidebar-menu-item a,
    .logo-image {
      transition: none;
    }

    .sidebar-menu-item {
      animation: none;
    }
  }
`;

export default LayoutWrapper;
