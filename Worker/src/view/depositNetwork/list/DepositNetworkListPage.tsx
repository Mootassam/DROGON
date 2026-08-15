import React from 'react';

import { i18n } from 'src/i18n';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';
import { Col, Container, Row } from 'react-bootstrap';
import DepositListToolbar from 'src/view/depositNetwork/list/DepositNetworkListToolbar';
import DepositListTable from 'src/view/depositNetwork/list/DepositNetworkListTable';
import DepositListFilter from 'src/view/depositNetwork/list/DepositNetworkListFilter';

function DepositListPage(props) {
  return (
    <>
      {/* <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.Deposit.menu')],
        ]}
      /> */}

      <ContentWrapper>
        <Container fluid={true}>
          <Row>
            <Col xs={9}>
              <PageTitle>
                {i18n('entities.depositNetwork.title')}
              </PageTitle>
            </Col>
            <Col md="auto">
              <DepositListToolbar />
            </Col>
          </Row>
        </Container>
        <DepositListFilter />
        <DepositListTable />
      </ContentWrapper>
    </>
  );
}

export default DepositListPage;
