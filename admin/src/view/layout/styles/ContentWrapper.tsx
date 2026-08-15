import styled from 'styled-components';

const ContentWrapper = styled.div`
  margin-top: 16px;
  padding: 24px;
  background-color: white;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #dee2e6 !important;
  .card-stats .card-body {
    padding: 15px !important;
  }
  .text-center {
    text-align: center !important;
  }
  .card-stats .icon-big.icon-danger, .card-stats .icon-big.icon-default, .card-stats .icon-big.icon-info, .card-stats .icon-big.icon-primary, .card-stats .icon-big.icon-secondary, .card-stats .icon-big.icon-success, .card-stats .icon-big.icon-warning {
    border-radius: 5px;
}
.card-stats .icon-big.icon-danger i, .card-stats .icon-big.icon-default i, .card-stats .icon-big.icon-info i, .card-stats .icon-big.icon-primary i, .card-stats .icon-big.icon-secondary i, .card-stats .icon-big.icon-success i, .card-stats .icon-big.icon-warning i {
  color: #fff!important;
}
  .pb-3,
  .py-3 {
    padding-bottom: 1rem !important;
  }
  .pt-3,
  .py-3 {
    padding-top: 1rem !important;
  }
  .d-inline-block {
    display: inline-block !important;
  }
  .pl-3, .px-3 {
    padding-left: 1rem !important;
  }
  .card-stats .icon-big {
    width: 100%;
    height: 100%;
    font-size: 2.2em;
    min-height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
  
  }
  .bubble-shadow-small {
  position: relative; 
  }

  .card-title {
    margin: 0;
    color: #575962;
    font-size: 18px;
    font-weight: 400;
    line-height: 1.6;
  }
  .card-stats .icon-big.icon-primary {
    background: #177dff;
  .mt-3,
  .my-3 {
    margin-top: 1rem !important;
  }
  `;

export default ContentWrapper;
