
import React from 'react';

import { i18n } from 'src/i18n';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import PageTitle from 'src/view/shared/styles/PageTitle';
import { Col, Container, Row } from 'react-bootstrap';
import DepositMethodListToolbar from 'src/view/depositMethod/list/DepositMethodListToolbar';
import DepositMethodListFilter from './DepositMethodListFilter';
import DepositMethodListTable from 'src/view/depositMethod/list/DepositMethodListTable';


function StackingPlanListPage(props) {
  return (
    <>
      {/* <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.stackingPlan.menu')],
        ]}
      /> */}

      <ContentWrapper>
        <Container fluid={true}>
          <Row>
            <Col xs={9}>
              <PageTitle>
                {i18n('entities.depositMethod.list.title')}
              </PageTitle>
            </Col>
            <Col md="auto">
              <DepositMethodListToolbar />
            </Col>
          </Row>
        </Container>
        <DepositMethodListFilter />
        <DepositMethodListTable />
      </ContentWrapper>
    </>
  );
}

export default StackingPlanListPage;
