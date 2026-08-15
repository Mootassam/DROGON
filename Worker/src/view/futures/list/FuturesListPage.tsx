import React from 'react';

import { i18n } from 'src/i18n';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';
import { Col, Container, Row } from 'react-bootstrap';
import FuturesListToolbar from 'src/view/futures/list/FuturesListToolbar';
import FuturesListTable from 'src/view/futures/list/FuturesListTable';
import FuturesListFilter from 'src/view/futures/list/FuturesListFilter';

function FuturesListPage(props) {
  return (
    <>
      {/* <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.futures.menu')],
        ]}
      /> */}

      <ContentWrapper>
        <Container fluid={true}>
          <Row>
            <Col xs={9}>
              <PageTitle>
                {i18n('entities.futures.list.title')}
              </PageTitle>
            </Col>
            <Col md="auto">
              <FuturesListToolbar />
            </Col>
          </Row>
        </Container>
        <FuturesListFilter />
        <FuturesListTable />
      </ContentWrapper>
    </>
  );
}

export default FuturesListPage;
