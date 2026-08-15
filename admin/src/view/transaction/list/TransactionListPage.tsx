import React from 'react';
import { i18n } from 'src/i18n';
import CouponsListFilter from 'src/view/transaction/list/TransactionListFilter';
import CouponsListTable from 'src/view/transaction/list/TransactionListTable';
import CouponsListToolbar from 'src/view/transaction/list/TransactionListToolbar';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';
import { Col, Container, Row } from 'react-bootstrap';

function TransactionListPage(props) {
  return (
    <>
    
      
      <ContentWrapper>
          
      <Container fluid={true}>
          <Row>
            <Col xs={9}>
        <PageTitle>
          {i18n('entities.transaction.list.title')}
        </PageTitle>
        </Col>
            <Col md="auto">
        <CouponsListToolbar />
        </Col>
          </Row>
        </Container>
        <CouponsListFilter />
        <CouponsListTable />
      </ContentWrapper>
    </>
  );
}

export default TransactionListPage;
