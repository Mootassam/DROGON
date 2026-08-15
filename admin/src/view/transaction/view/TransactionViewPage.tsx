import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/transaction/view/transactionViewActions';
import selectors from 'src/modules/transaction/view/transactionViewSelectors';
import CouponsView from 'src/view/transaction/view/TransactionView';
import CouponsViewToolbar from 'src/view/transaction/view/TransactionViewToolbar';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';

function TransactionViewPage() {
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
          [i18n('entities.transaction.menu'), '/product'],
          [i18n('entities.transaction.view.title')],
        ]}
      /> */}

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.transaction.view.title')}
        </PageTitle>

        <CouponsViewToolbar match={match} />

        <CouponsView loading={loading} record={record} />
      </ContentWrapper>
    </>
  );
}

export default TransactionViewPage;
