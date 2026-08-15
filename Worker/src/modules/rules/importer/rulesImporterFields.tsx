import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import { i18n } from 'src/i18n';import rulesEnumerators from 'src/modules/rules/rulesEnumerators';

export default [
  {
    name: 'name',
    label: i18n('entities.rules.fields.name'),
    schema: schemas.string(
      i18n('entities.rules.fields.name'),
      {},
    ),
  },
  {
    name: 'slug',
    label: i18n('entities.rules.fields.slug'),
    schema: schemas.string(
      i18n('entities.rules.fields.slug'),
      {},
    ),
  },
  {
    name: 'photo',
    label: i18n('entities.rules.fields.photo'),
    schema: schemas.images(
      i18n('entities.rules.fields.photo'),
      {},
    ),
  },
  {
    name: 'metaKeywords',
    label: i18n('entities.rules.fields.metaKeywords'),
    schema: schemas.string(
      i18n('entities.rules.fields.metaKeywords'),
      {},
    ),
  },
  {
    name: 'metaDescriptions',
    label: i18n('entities.rules.fields.metaDescriptions'),
    schema: schemas.string(
      i18n('entities.rules.fields.metaDescriptions'),
      {},
    ),
  },
  {
    name: 'status',
    label: i18n('entities.rules.fields.status'),
    schema: schemas.enumerator(
      i18n('entities.rules.fields.status'),
      {
        "options": rulesEnumerators.status
      },
    ),
  },
  {
    name: 'isFeature',
    label: i18n('entities.rules.fields.isFeature'),
    schema: schemas.boolean(
      i18n('entities.rules.fields.isFeature'),
      {},
    ),
  },
  {
    name: 'serial',
    label: i18n('entities.rules.fields.serial'),
    schema: schemas.integer(
      i18n('entities.rules.fields.serial'),
      {},
    ),
  },
];