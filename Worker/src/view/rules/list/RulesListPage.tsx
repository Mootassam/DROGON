import React from 'react';
import { i18n } from 'src/i18n';
import CategoryListFilter from 'src/view/rules/list/RulesListFilter';
import CategoryListTable from 'src/view/rules/list/RulesListTable';
import CategoryListToolbar from 'src/view/rules/list/RulesListToolbar';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import PageTitle from 'src/view/shared/styles/PageTitle';
import { Col, Container, Row } from 'react-bootstrap';

function RulesListPage(props) {
  return (
    <>
      {/* <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.category.menu')],
        ]}
      /> */}

      <ContentWrapper>
        <Container fluid={true}>
          <Row>
            <Col xs={9}>
              <PageTitle>
                {i18n('entities.category.list.rules')}
              </PageTitle>
            </Col>
            <Col md="auto">
              <CategoryListToolbar />
            </Col>
          </Row>
        </Container>
        <CategoryListFilter />
        <CategoryListTable />
      </ContentWrapper>
    </>
  );
}

export default RulesListPage;
