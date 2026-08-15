import React from 'react';
import { i18n } from 'src/i18n';
import AssetsListFilter from 'src/view/assets/list/AssetsListFilter';
import AssetsListTable from 'src/view/assets/list/AssetsListTable';
import AssetsListToolbar from 'src/view/assets/list/AssetsListToolbar';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';
import { Col, Container, Row } from 'react-bootstrap';

function CouponsListPage(props) {
  return (
    <>
      {/* <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.assets.menu')],
        ]}
      /> */}

      <ContentWrapper>
        <Container fluid={true}>
          <Row>
            <Col xs={9}>
              <PageTitle>
                {i18n('entities.assets.list.title')}
              </PageTitle>
            </Col>
            <Col md="auto">
              <AssetsListToolbar />
            </Col>
          </Row>
        </Container>
        <AssetsListFilter />
        <AssetsListTable />
      </ContentWrapper>
    </>
  );
}

export default CouponsListPage;
