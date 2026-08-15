import styled from 'styled-components';

const Content = styled.div`
  width: 100%;
  max-width: 420px;
  z-index: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 48px 40px;
  border-radius: 20px;
  background-color: #ffffff;
  box-shadow: 0 24px 60px rgba(10, 30, 80, 0.35);
  color: #1a2233;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: #1a2233;
  }

  h4 {
    font-size: 1.25em;
  }

  a,
  a:hover {
    color: #164fa8;
  }

  .btn-link,
  .btn-link:hover {
    color: #164fa8;
  }

  .form-control {
    border-radius: 10px;
    border: 1px solid #dfe4ee;
    padding: 12px 14px;
    height: auto;
  }

  .form-control:focus {
    border-color: #164fa8;
    box-shadow: 0 0 0 3px rgba(22, 79, 168, 0.12);
  }

  .btn-primary {
    background-color: #164fa8;
    border-color: #164fa8;
    border-radius: 10px;
    padding: 12px 14px;
    font-weight: 600;
  }

  .btn-primary:hover,
  .btn-primary:focus {
    background-color: #10265c;
    border-color: #10265c;
  }

  .invalid-feedback {
    display: block;
  }

  @media only screen and (max-width: 480px) {
    padding: 36px 24px;
  }
`;

export default Content;
