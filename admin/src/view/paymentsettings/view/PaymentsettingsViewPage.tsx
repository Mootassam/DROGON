import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/paymentsettings/view/paymentsettingsViewActions';
import selectors from 'src/modules/paymentsettings/view/paymentsettingsViewSelectors';
import PaymentsettingsView from 'src/view/paymentsettings/view/PaymentsettingsView';
import PaymentsettingsViewToolbar from 'src/view/paymentsettings/view/PaymentsettingsViewToolbar';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';

function PaymentsettingsPage() {
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const loading = useSelector(selectors.selectLoading);
  const record = useSelector(selectors.selectRecord);

  useEffect(() => {
    dispatch(actions.doFind(match.params.id));
  }, [dispatch, match.params.id]);

  return (
    <>
      {/* <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.paymentsettings.menu'), '/paymentsettings'],
          [i18n('entities.paymentsettings.view.title')],
        ]}
      /> */}

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.paymentsettings.view.title')}
        </PageTitle>

        <PaymentsettingsViewToolbar match={match} />

        <PaymentsettingsView loading={loading} record={record} />
      </ContentWrapper>
    </>
  );
}

export default PaymentsettingsPage;
