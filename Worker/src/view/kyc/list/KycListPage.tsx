import React from 'react';
import { i18n } from 'src/i18n';
import KycListFilter from 'src/view/kyc/list/KycListFilter';
import KycListTable from 'src/view/kyc/list/KycListTable';
import KycListToolbar from 'src/view/kyc/list/KycListToolbar';
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
          [i18n('entities.Kyc.menu')],
        ]}
      /> */}

      <ContentWrapper>
        <Container fluid={true}>
          <Row>
            <Col xs={9}>
              <PageTitle>
                {i18n('entities.kyc.list.title')}
              </PageTitle>
            </Col>
            <Col md="auto">
              <KycListToolbar />
            </Col>
          </Row>
        </Container>
        <KycListFilter />
        <KycListTable />
      </ContentWrapper>
    </>
  );
}

export default CouponsListPage;
