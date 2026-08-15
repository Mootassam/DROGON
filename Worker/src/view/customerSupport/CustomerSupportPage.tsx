import React, { useEffect } from 'react';
import { i18n } from 'src/i18n';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import CustomerSupportForm from 'src/view/customerSupport/CustomerSupportForm';
import PageTitle from 'src/view/shared/styles/PageTitle';
import Spinner from '../shared/Spinner';
import actions from 'src/modules/settings/settingsActions';
import selectors from 'src/modules/settings/settingsSelectors';
import { useSelector, useDispatch } from 'react-redux';

const CustomerSupportPage = (props) => {
  const dispatch = useDispatch();

  const initLoading = useSelector(
    selectors.selectInitLoading,
  );

  const settings = useSelector(selectors.selectSettings);

  useEffect(() => {
    dispatch(actions.doInit());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ContentWrapper>
        <PageTitle>{i18n('customerSupport.title')}</PageTitle>

        {initLoading && <Spinner />}

        {!initLoading && settings && (
          <CustomerSupportForm settings={settings} />
        )}
      </ContentWrapper>
    </>
  );
};

export default CustomerSupportPage;
