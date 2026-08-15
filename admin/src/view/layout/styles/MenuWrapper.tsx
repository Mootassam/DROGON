import styled from 'styled-components';

const MenuWrapper = styled.div`
  .panel-body {
    padding: 5px;
    border-top: none;
  }
  i {
    padding-right: 15px;
    font-size: 18px;
  }
  .side-menue:hover {
    width: 100%;

    background-color: var(--hover);
  }
  .side-menue {
    padding: 0.1px;
  }
  .label {
    padding: 50px 10px 30px;
  }
  .menu-logo {
    margin-bottom: 25px;
  }
  .label a {
    color: #fff;
    text-decoration: none;
    font-size: 15px;
    padding-left: -7px;
    cursor: default;
  }
  .panel-header {
    font-weight: normal;
  }
  .panel-header button {
    display: contents;
    width: 100%;
    background-color: transparent;
    color: white;
  }
  .panel-header button:focus {
    outline: 0px auto -webkit-focus-ring-color;
  }
  .menu-nav {
    flex: 0 0 200px;
    max-width: 200px;
    min-width: 200px;
    width: 220px;
    height: 100%;
  }

  .menu-logo {
    padding: 8px;
    width: 100%;
    text-align: center;
    height: 61px;
    font-weight: 500;
    font-size: 1.5em;
  }

  .menu-logo a {
    text-decoration: none;
  }

  .menu-ul {
    font-size: 13px;
    font-variant: tabular-nums;
    line-height: 1.5;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    outline: none;
    margin-bottom: 0;
    padding-left: 0;
    list-style: none;
    line-height: 0;
    transition: background 0.3s, width 0.2s;
    zoom: 1;
  }

  .menu-li a,
  .menu-li .menu-li-locked {
    display: block;
    width: 100%;
    line-height: 40px;
    height: 40px;
    padding: 0 0px;
    padding-left: 24px;
    font-size: 14px;
    line-height: 40px;
    height: 40px;
    margin-top: 4px;
    margin-bottom: 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
    color: white;
  }
  .menu-li .menu-li-locked {
    cursor: default;
  }

  .selected a {
    text-decoration: none;
    background-color: var(--secondary);
    color: var(--primary) !important;
  }
  .menu-li a:focus {
    text-decoration: none;
    background-color: var(--secondary);
    color: var(--primary);
  }
  ,
  .menu-li a:hover {
    text-decoration: none;
    background-color: var(--hover);
    color: var(--white);
  }
`;

export default MenuWrapper;
