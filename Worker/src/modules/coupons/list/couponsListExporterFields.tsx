import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.coupons.fields.id'),
  },
  {
    name: 'title',
    label: i18n('entities.coupons.fields.title'),
  },
  {
    name: 'codeName',
    label: i18n('entities.coupons.fields.codeName'),
  },
  {
    name: 'discount',
    label: i18n('entities.coupons.fields.discount'),
    render: exporterRenders.decimal(),
  },
  {
    name: 'noOfTimes',
    label: i18n('entities.coupons.fields.noOfTimes'),
  },
  {
    name: 'status',
    label: i18n('entities.coupons.fields.status'),
  },
  {
    name: 'type',
    label: i18n('entities.coupons.fields.type'),
  },
  {
    name: 'createdAt',
    label: i18n('entities.coupons.fields.createdAt'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'updatedAt',
    label: i18n('entities.coupons.fields.updatedAt'),
    render: exporterRenders.datetime(),
  },
];
