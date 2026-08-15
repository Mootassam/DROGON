import React from 'react';

import { i18n } from 'src/i18n';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import PageTitle from 'src/view/shared/styles/PageTitle';
import { Col, Container, Row } from 'react-bootstrap';
import StackingPlanListToolbar from 'src/view/stackingPlan/list/StackingPlanListToolbar';
import StackingPlanListFilter from './StackingPlanListFilter';
import StackingPlanListTable from 'src/view/stackingPlan/list/StackingPlanListTable';


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
                {i18n('entities.stackingPlan.list.title')}
              </PageTitle>
            </Col>
            <Col md="auto">
              <StackingPlanListToolbar />
            </Col>
          </Row>
        </Container>
        <StackingPlanListFilter />
        <StackingPlanListTable />
      </ContentWrapper>
    </>
  );
}

export default StackingPlanListPage;
