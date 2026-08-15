import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/transaction/importer/transactionImporterSelectors';
import CouponsService from 'src/modules/transaction/transactionService';
import fields from 'src/modules/transaction/importer/transactionImporterFields';
import { i18n } from 'src/i18n';

const couponsImporterActions = importerActions(
  'COUPONS_IMPORTER',
  selectors,
  CouponsService.import,
  fields,
  i18n('entities.coupons.importer.fileName'),
);

export default couponsImporterActions;