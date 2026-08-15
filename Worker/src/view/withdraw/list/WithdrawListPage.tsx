import React from 'react';

import { i18n } from 'src/i18n';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';
import { Col, Container, Row } from 'react-bootstrap';
import WithdrawListToolbar from 'src/view/withdraw/list/WithdrawListToolbar';
import WithdrawListTable from 'src/view/withdraw/list/WithdrawListTable';
import WithdrawListFilter from 'src/view/withdraw/list/WithdrawListFilter';

function WithdrawListPage(props) {
  return (
    <>
      {/* <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.withdraw.menu')],
        ]}
      /> */}

      <ContentWrapper>
        <Container fluid={true}>
          <Row>
            <Col xs={9}>
              <PageTitle>
                {i18n('entities.withdraw.list.title')}
              </PageTitle>
            </Col>
            <Col md="auto">
              <WithdrawListToolbar />
            </Col>
          </Row>
        </Container>
        <WithdrawListFilter />
        <WithdrawListTable />
      </ContentWrapper>
    </>
  );
}

export default WithdrawListPage;
