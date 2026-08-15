import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import { i18n } from 'src/i18n';import couponsEnumerators from 'src/modules/record/recordEnumerators';

export default [
  {
    name: 'title',
    label: i18n('entities.record.fields.title'),
    schema: schemas.string(
      i18n('entities.record.fields.title'),
      {
        "required": true
      },
    ),
  },
  {
    name: 'codeName',
    label: i18n('entities.record.fields.codeName'),
    schema: schemas.string(
      i18n('entities.record.fields.codeName'),
      {
        "required": true
      },
    ),
  },
  {
    name: 'discount',
    label: i18n('entities.record.fields.discount'),
    schema: schemas.decimal(
      i18n('entities.record.fields.discount'),
      {
        "required": true
      },
    ),
  },
  {
    name: 'noOfTimes',
    label: i18n('entities.record.fields.noOfTimes'),
    schema: schemas.integer(
      i18n('entities.record.fields.noOfTimes'),
      {
        "required": true
      },
    ),
  },
  {
    name: 'status',
    label: i18n('entities.record.fields.status'),
    schema: schemas.enumerator(
      i18n('entities.record.fields.status'),
      {
        "options": couponsEnumerators.status
      },
    ),
  },
  {
    name: 'type',
    label: i18n('entities.record.fields.type'),
    schema: schemas.enumerator(
      i18n('entities.record.fields.type'),
      {
        "required": true,
        "options": couponsEnumerators.type
      },
    ),
  },
];