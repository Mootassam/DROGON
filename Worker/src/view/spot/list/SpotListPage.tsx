import React from 'react';

import { i18n } from 'src/i18n';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';
import { Col, Container, Row } from 'react-bootstrap';
import SpotListToolbar from 'src/view/spot/list/SpotListToolbar';
import SpotListTable from 'src/view/spot/list/SpotListTable';
import SpotListFilter from 'src/view/spot/list/SpotListFilter';

function SpotListPage(props) {
  return (
    <>
      {/* <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.spot.menu')],
        ]}
      /> */}

      <ContentWrapper>
        <Container fluid={true}>
          <Row>
            <Col xs={9}>
              <PageTitle>
                {i18n('entities.spot.list.title')}
              </PageTitle>
            </Col>
            <Col md="auto">
              <SpotListToolbar />
            </Col>
          </Row>
        </Container>
        <SpotListFilter />
        <SpotListTable />
      </ContentWrapper>
    </>
  );
}

export default SpotListPage;
