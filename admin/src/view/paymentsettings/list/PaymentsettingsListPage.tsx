import React from 'react';
import { i18n } from 'src/i18n';
import PaymentsettingsListFilter from 'src/view/paymentsettings/list/PaymentsettingsListFilter';
import PaymentsettingsListTable from 'src/view/paymentsettings/list/PaymentsettingsListTable';
import PaymentsettingsListToolbar from 'src/view/paymentsettings/list/PaymentsettingsListToolbar';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';
import { Col, Container, Row } from 'react-bootstrap';

function PaymentsettingsListPage(props) {
  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.paymentsettings.menu')],
        ]}
      />

      <ContentWrapper>
      <Container fluid={true}>
          <Row>
            <Col xs={9}>
        <PageTitle>
          {i18n('entities.paymentsettings.list.title')}
        </PageTitle>
        </Col>
            <Col md="auto">
        <PaymentsettingsListToolbar />
        </Col>
          </Row>
        </Container>
        <PaymentsettingsListFilter />
        <PaymentsettingsListTable />
      </ContentWrapper>
    </>
  );
}

export default PaymentsettingsListPage;
