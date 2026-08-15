import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding: 24px;
  background-color: #10265c;
  background-image: linear-gradient(
    135deg,
    #10265c 0%,
    #164fa8 48%,
    #5b3df5 100%
  );
  background-size: cover;
  background-position: center;

  &::before,
  &::after {
    content: '';
    position: absolute;
    border-radius: 50%;
    background: #ffffff;
    opacity: 0.06;
    z-index: 0;
    pointer-events: none;
  }

  &::before {
    width: 520px;
    height: 520px;
    top: -220px;
    left: -180px;
  }

  &::after {
    width: 420px;
    height: 420px;
    bottom: -180px;
    right: -140px;
  }
`;

export default Wrapper;
