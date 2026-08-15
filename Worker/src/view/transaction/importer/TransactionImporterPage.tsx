import React from 'react';
import { i18n } from 'src/i18n';
import actions from 'src/modules/transaction/importer/transactionImporterActions';
import fields from 'src/modules/transaction/importer/transactionImporterFields';
import selectors from 'src/modules/transaction/importer/transactionImporterSelectors';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import importerHoc from 'src/view/shared/importer/Importer';
import PageTitle from 'src/view/shared/styles/PageTitle';

function TransactionImporterPage() {
  const Importer = importerHoc(
    selectors,
    actions,
    fields,
    i18n('entities.transaction.importer.hint'),
  );

  return (
    <>
      {/* <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.transaction.menu'), '/transaction'],
          [i18n('entities.transaction.importer.title')],
        ]}
      /> */}

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.transaction.importer.title')}
        </PageTitle>

        <Importer />
      </ContentWrapper>
    </>
  );
}

export default TransactionImporterPage;
