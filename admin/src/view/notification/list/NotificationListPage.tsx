import React from 'react';

import { i18n } from 'src/i18n';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';
import { Col, Container, Row } from 'react-bootstrap';
import NotificationListToolbar from 'src/view/notification/list/NotificationListToolbar';
import NotificationListTable from 'src/view/notification/list/NotificationListTable';
import NotificationListFilter from 'src/view/notification/list/NotificationListFilter';

function NotificationListPage(props) {
  return (
    <>
      {/* <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.notification.menu')],
        ]}
      /> */}

      <ContentWrapper>
        <Container fluid={true}>
          <Row>
            <Col xs={9}>
              <PageTitle>
                {i18n('entities.notification.list.title')}
              </PageTitle>
            </Col>
            <Col md="auto">
              <NotificationListToolbar />
            </Col>
          </Row>
        </Container>
        <NotificationListFilter />
        <NotificationListTable />
      </ContentWrapper>
    </>
  );
}

export default NotificationListPage;
