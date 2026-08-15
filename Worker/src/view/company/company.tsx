
import React from 'react';
import { i18n } from 'src/i18n';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';
import { Link } from 'react-router-dom';
import './app.css';
function company() {
  return (
    <div>
      {/* <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.company.menu'), '/company'],
        ]}
      /> */}
      <ContentWrapper>
        <PageTitle>
          {i18n('entities.company.title')}
        </PageTitle>

        <div className="app__company">
          <Link to="/logo">
            <div className="company__item">
              <i className="fa-solid fa-building item__company"></i>
              <span className="company__text">Company</span>
            </div>
          </Link>
          <Link to="/companydetail">
            <div className="company__item">
              <i className="fa-solid fa-circle-exclamation item__company"></i>
              <span className="company__text">About</span>
            </div>
          </Link>
          <Link to="/tc" className="remove__ligne">
            <div className="company__item">
              <i className="fa-solid fa-file-contract item__company"></i>
              <span className="company__text"> T&C </span>
            </div>
          </Link>
          <Link to="/faqs" className="remove__ligne">
            <div className="company__item">
              <i className="fa-solid fa-question item__company"></i>
              <span className="company__text"> FAQs </span>
            </div>
          </Link>
        </div>
      </ContentWrapper>
    </div>
  );
}

export default company;
