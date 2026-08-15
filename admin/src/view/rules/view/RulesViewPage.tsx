import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/rules/view/rulesViewActions';
import selectors from 'src/modules/rules/view/rulesViewSelectors';
import CategoryView from 'src/view/rules/view/RulesView';
import CategoryViewToolbar from 'src/view/rules/view/RulesViewToolbar';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';

function RulesPage() {
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
          [i18n('entities.category.menu'), '/rules'],
          [i18n('entities.category.view.title')],
        ]}
      /> */}

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.category.view.title')}
        </PageTitle>

        <CategoryViewToolbar match={match} />

        <CategoryView loading={loading} record={record} />
      </ContentWrapper>
    </>
  );
}

export default RulesPage;
