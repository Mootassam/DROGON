import React from 'react';
import { i18n } from 'src/i18n';
import VipListFilter from 'src/view/vip/list/VipListFilter';
import VipListTable from 'src/view/vip/list/VipListTable';
import VipListToolbar from 'src/view/vip/list/VipListToolbar';
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
          [i18n('entities.vip.menu')],
        ]}
      /> */}

      <ContentWrapper>
          
      <Container fluid={true}>
          <Row>
            <Col xs={9}>
        <PageTitle>
          {i18n('entities.vip.list.title')}
        </PageTitle>
        </Col>
            <Col md="auto">
        <VipListToolbar />
        </Col>
          </Row>
        </Container>
        <VipListFilter />
        <VipListTable />
      </ContentWrapper>
    </>
  );
}

export default CouponsListPage;
