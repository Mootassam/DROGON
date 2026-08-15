import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/user/view/userViewActions';
import selectors from 'src/modules/user/view/userViewSelectors';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import WalletViewItem from 'src/view/user/view/WalletViewItem';

function UserWalletPage(props) {
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const loading = useSelector(selectors.selectLoading);
  const user = useSelector(selectors.selectUser);

  useEffect(() => {
    dispatch(actions.doFind(match.params.id));
  }, [dispatch, match.params.id]);

  return (
    <>
      <ContentWrapper>
        <WalletViewItem loading={loading} user={user} />
      </ContentWrapper>
    </>
  );
}

export default UserWalletPage;
