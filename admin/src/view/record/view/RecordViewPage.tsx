import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/record/view/recordViewActions';
import selectors from 'src/modules/record/view/recordViewSelectors';
import CouponsView from 'src/view/record/view/RecordView';
import CouponsViewToolbar from 'src/view/record/view/RecordViewToolbar';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';

function CouponsPage() {
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
          [i18n('entities.record.menu'), '/record'],
          [i18n('entities.record.view.title')],
        ]}
      /> */}

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.record.view.title')}
        </PageTitle>

        <CouponsViewToolbar match={match} />

        <CouponsView loading={loading} record={record} />
      </ContentWrapper>
    </>
  );
}

export default CouponsPage;
