import React from 'react';

import { i18n } from 'src/i18n';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';
import { Col, Container, Row } from 'react-bootstrap';
import MessageListToolbar from 'src/view/message/list/MessageListToolbar';
import MessageListTable from 'src/view/message/list/MessageListTable';
import MessageListFilter from 'src/view/message/list/MessageListFilter';

function MessageListPage(props) {
  return (
    <>
      {/* <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.message.menu')],
        ]}
      /> */}

      <ContentWrapper>
        <Container fluid={true}>
          <Row>
            <Col xs={9}>
              <PageTitle>
                {i18n('entities.message.list.title')}
              </PageTitle>
            </Col>
            <Col md="auto">
              <MessageListToolbar />
            </Col>
          </Row>
        </Container>
        <MessageListFilter />
        <MessageListTable />
      </ContentWrapper>
    </>
  );
}

export default MessageListPage;
