import React from 'react';
import { i18n } from 'src/i18n';
import actions from 'src/modules/rules/importer/rulesImporterActions';
import fields from 'src/modules/rules/importer/rulesImporterFields';
import selectors from 'src/modules/rules/importer/rulesImporterSelectors';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import importerHoc from 'src/view/shared/importer/Importer';
import PageTitle from 'src/view/shared/styles/PageTitle';

function RulesImporterPage() {
  const Importer = importerHoc(
    selectors,
    actions,
    fields,
    i18n('entities.category.importer.hint'),
  );

  return (
    <>
      {/* <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.category.menu'), '/rules'],
          [i18n('entities.category.importer.title')],
        ]}
      /> */}

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.category.importer.title')}
        </PageTitle>

        <Importer />
      </ContentWrapper>
    </>
  );
}

export default RulesImporterPage;
