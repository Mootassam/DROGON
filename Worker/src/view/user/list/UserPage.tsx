import React from 'react';
import { i18n } from 'src/i18n';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';
import UserFilter from 'src/view/user/list/UserFilter';
import UserTable from 'src/view/user/list/UserTable';
import UserToolbar from 'src/view/user/list/UserToolbar';
import { Col, Container, Row } from 'react-bootstrap';

function UserPage() {
  return (
    <>
      {/* <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('user.menu')],
        ]}
      /> */}

      <ContentWrapper>
      <Container fluid={true}>
          <Row>
            <Col xs={9}>
        <PageTitle>{i18n('user.title')}</PageTitle>
        </Col>
            <Col md="auto">
        <UserToolbar />
        </Col>
          </Row>
        </Container>
        <UserFilter />
        <UserTable />
      </ContentWrapper>
    </>
  );
}

export default UserPage;
