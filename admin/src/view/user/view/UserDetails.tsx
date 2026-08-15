import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/user/view/userViewActions';
import selectors from 'src/modules/user/view/userViewSelectors';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';
import UserView from 'src/view/user/view/UserView';
import UserDetailsToolbar from 'src/view/user/view/UserDetailsToolbar';

function UserViewPage(props) {
  const dispatch = useDispatch();
  const match = useRouteMatch();


  useEffect(() => {
    dispatch(actions.doFind(match.params.id));
  }, [dispatch, match.params.id]);

  const user = useSelector(selectors.selectUser);

  return (
    <>
      {/* <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('user.menu'), '/user'],
          [i18n('user.view.title')],
        ]}
      /> */}

      <ContentWrapper>
        <UserDetailsToolbar  match={match} user={user} />
      </ContentWrapper>
    </>
  );
}

export default UserViewPage;
