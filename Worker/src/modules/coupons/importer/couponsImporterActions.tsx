import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/coupons/importer/couponsImporterSelectors';
import CouponsService from 'src/modules/coupons/couponsService';
import fields from 'src/modules/coupons/importer/couponsImporterFields';
import { i18n } from 'src/i18n';

const couponsImporterActions = importerActions(
  'COUPONS_IMPORTER',
  selectors,
  CouponsService.import,
  fields,
  i18n('entities.coupons.importer.fileName'),
);

export default couponsImporterActions;