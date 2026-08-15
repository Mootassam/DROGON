import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import { i18n } from 'src/i18n';import categoryEnumerators from 'src/modules/category/categoryEnumerators';

export default [
  {
    name: 'name',
    label: i18n('entities.category.fields.name'),
    schema: schemas.string(
      i18n('entities.category.fields.name'),
      {},
    ),
  },
  {
    name: 'slug',
    label: i18n('entities.category.fields.slug'),
    schema: schemas.string(
      i18n('entities.category.fields.slug'),
      {},
    ),
  },
  {
    name: 'photo',
    label: i18n('entities.category.fields.photo'),
    schema: schemas.images(
      i18n('entities.category.fields.photo'),
      {},
    ),
  },
  {
    name: 'metaKeywords',
    label: i18n('entities.category.fields.metaKeywords'),
    schema: schemas.string(
      i18n('entities.category.fields.metaKeywords'),
      {},
    ),
  },
  {
    name: 'metaDescriptions',
    label: i18n('entities.category.fields.metaDescriptions'),
    schema: schemas.string(
      i18n('entities.category.fields.metaDescriptions'),
      {},
    ),
  },
  {
    name: 'status',
    label: i18n('entities.category.fields.status'),
    schema: schemas.enumerator(
      i18n('entities.category.fields.status'),
      {
        "options": categoryEnumerators.status
      },
    ),
  },
  {
    name: 'isFeature',
    label: i18n('entities.category.fields.isFeature'),
    schema: schemas.boolean(
      i18n('entities.category.fields.isFeature'),
      {},
    ),
  },
  {
    name: 'serial',
    label: i18n('entities.category.fields.serial'),
    schema: schemas.integer(
      i18n('entities.category.fields.serial'),
      {},
    ),
  },
];