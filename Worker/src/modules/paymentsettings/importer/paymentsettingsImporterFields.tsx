import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import { i18n } from 'src/i18n';import paymentsettingsEnumerators from 'src/modules/paymentsettings/paymentsettingsEnumerators';

export default [
  {
    name: 'name',
    label: i18n('entities.paymentsettings.fields.name'),
    schema: schemas.string(
      i18n('entities.paymentsettings.fields.name'),
      {},
    ),
  },
  {
    name: 'information',
    label: i18n('entities.paymentsettings.fields.information'),
    schema: schemas.string(
      i18n('entities.paymentsettings.fields.information'),
      {},
    ),
  },
  {
    name: 'uniqueKeywords',
    label: i18n('entities.paymentsettings.fields.uniqueKeywords'),
    schema: schemas.string(
      i18n('entities.paymentsettings.fields.uniqueKeywords'),
      {},
    ),
  },
  {
    name: 'photo',
    label: i18n('entities.paymentsettings.fields.photo'),
    schema: schemas.images(
      i18n('entities.paymentsettings.fields.photo'),
      {},
    ),
  },
  {
    name: 'text',
    label: i18n('entities.paymentsettings.fields.text'),
    schema: schemas.string(
      i18n('entities.paymentsettings.fields.text'),
      {},
    ),
  },
  {
    name: 'status',
    label: i18n('entities.paymentsettings.fields.status'),
    schema: schemas.enumerator(
      i18n('entities.paymentsettings.fields.status'),
      {
        "options": paymentsettingsEnumerators.status
      },
    ),
  },
  {
    name: 'type',
    label: i18n('entities.paymentsettings.fields.type'),
    schema: schemas.string(
      i18n('entities.paymentsettings.fields.type'),
      {},
    ),
  },
];