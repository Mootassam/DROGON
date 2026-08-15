import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/rules/importer/rulesImporterSelectors';
import RulesService from 'src/modules/rules/rulesService';
import fields from 'src/modules/rules/importer/rulesImporterFields';
import { i18n } from 'src/i18n';

const rulesImporterActions = importerActions(
  'RULESIMPORTER',
  selectors,
  RulesService.import,
  fields,
  i18n('entities.rules.importer.fileName'),
);

export default rulesImporterActions;