import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/record/importer/recordImporterSelectors';
import CouponsService from 'src/modules/record/recordService';
import fields from 'src/modules/record/importer/recordImporterFields';
import { i18n } from 'src/i18n';

const couponsImporterActions = importerActions(
  'COUPONS_IMPORTER',
  selectors,
  CouponsService.import,
  fields,
  i18n('entities.record.importer.fileName'),
);

export default couponsImporterActions;