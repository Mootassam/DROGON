import React from 'react';
import { i18n } from 'src/i18n';
import actions from 'src/modules/vip/importer/vipImporterActions';
import fields from 'src/modules/vip/importer/vipImporterFields';
import selectors from 'src/modules/vip/importer/vipImporterSelectors';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import importerHoc from 'src/view/shared/importer/Importer';
import PageTitle from 'src/view/shared/styles/PageTitle';

function CouponsImportPage() {
  const Importer = importerHoc(
    selectors,
    actions,
    fields,
    i18n('entities.vip.importer.hint'),
  );

  return (
    <>
      {/* <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.vip.menu'), '/vip'],
          [i18n('entities.vip.importer.title')],
        ]}
      /> */}

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.vip.importer.title')}
        </PageTitle>

        <Importer />
      </ContentWrapper>
    </>
  );
}

export default CouponsImportPage;
