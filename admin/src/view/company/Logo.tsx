import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { i18n } from 'src/i18n';
import LogoForm from 'src/view/company/LogoForm';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';
import actions from 'src/modules/company/form/companyFormActions';
import listactions from 'src/modules/company/list/companyListActions';
import selectors from 'src/modules/company/list/companyListSelectors';
import Spinner from 'src/view/shared/Spinner';
import { getHistory } from 'src/modules/store';

function Logo() {
  const dispatch = useDispatch();

  const record = useSelector(selectors.selectRows);
  const loading = useSelector(selectors?.selectLoading);

  // useEffect() => {
  //   dispatch(actions.doInit(match.params.id));
  //   setDispatched(true);
  // }, [dispatch, match.params.id]);

  const doSubmit = (id, data) => {
    if (record) {
      dispatch(actions.doUpdate(record.id, data));
    } else {
      dispatch(actions.doCreate(data));
    }
  };

  const doFetch = () => {
    dispatch(listactions.doFetch());
  };

  useEffect(() => {
    doFetch();
  }, [dispatch]);

  useEffect(() => {}, [record]);

  return (
    <>
      {/* <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.category.menu'), '/logo'],
        ]}
      /> */}

      <ContentWrapper>
        <PageTitle>Company Logo</PageTitle>
        {loading && <Spinner />}
        {!loading && record && (
          <LogoForm
            record={record}
            isEditing={record}
            onSubmit={doSubmit}
            loading={loading}
            onCancel={() => getHistory().push('/company')}
          />
        )}
      </ContentWrapper>
    </>
  );
}

export default Logo;
