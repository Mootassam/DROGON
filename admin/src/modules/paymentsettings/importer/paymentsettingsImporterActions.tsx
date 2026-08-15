import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/paymentsettings/importer/paymentsettingsImporterSelectors';
import PaymentsettingsService from 'src/modules/paymentsettings/paymentsettingsService';
import fields from 'src/modules/paymentsettings/importer/paymentsettingsImporterFields';
import { i18n } from 'src/i18n';

const paymentsettingsImporterActions = importerActions(
  'PAYMENTSETTINGS_IMPORTER',
  selectors,
  PaymentsettingsService.import,
  fields,
  i18n('entities.paymentsettings.importer.fileName'),
);

export default paymentsettingsImporterActions;