

import React from 'react';

import { i18n } from 'src/i18n';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import PageTitle from 'src/view/shared/styles/PageTitle';
import { Col, Container, Row } from 'react-bootstrap';
import StackingListToolbar from 'src/view/stacking/list/stackingListToolbar';
import StackingListTable from 'src/view/stacking/list/stackingListTable';
import StackingListFilter from 'src/view/stacking/list/stackingListFilter';

function StackingListPage(props) {
  return (
    <>
      {/* <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.stacking.menu')],
        ]}
      /> */}

      <ContentWrapper>
        <Container fluid={true}>
          <Row>
            <Col xs={9}>
              <PageTitle>
                {i18n('entities.stacking.list.title')}
              </PageTitle>
            </Col>
            <Col md="auto">
              <StackingListToolbar />
            </Col>
          </Row>
        </Container>
        <StackingListFilter />
        <StackingListTable />
      </ContentWrapper>
    </>
  );
}

export default StackingListPage;
