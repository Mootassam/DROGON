import styled from 'styled-components';
const DashboardWrapper = styled.div`
  display: flex !important;
  padding: 43px 30px;
  width: 100%;
  align-items: start;
  justify-content: center;
  gap: 4rem;
  .icon,
  .text {
    flex-basis: 50%;
  }
  i {
    font-size: 74px;
    width: 100%;
  }
  .icon {
    width: 60px;
    height: 60px;
    flex-basis: 60px;
    text-align: right;
  }
  .text {
    display: flex !important;
    flex-direction: column;
  }
  h3 {
    font-size: 45px;
    margin-bottom: 0;
    font-weight: 600;
    -webkit-transition: 0.5s;
    transition: 0.5s;
    color: #2e4765;
    margin-bottom: 0;
    font-family: rajdhani, sans-serif;
    line-height: 1;
  }
  p {
    transition: 0.5s;
    font-size: 19px;
    font-weight: 500;
    color: #b2b5c0;
    font-family: rajdhani, sans-serif;
    line-height: 1;
  }
`;

export default DashboardWrapper;
