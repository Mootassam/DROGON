import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.vip.fields.id'),
  },
  {
    name: 'title',
    label: i18n('entities.vip.fields.title'),
  },
  {
    name: 'codeName',
    label: i18n('entities.vip.fields.codeName'),
  },
  {
    name: 'discount',
    label: i18n('entities.vip.fields.discount'),
    render: exporterRenders.decimal(),
  },
  {
    name: 'noOfTimes',
    label: i18n('entities.vip.fields.noOfTimes'),
  },
  {
    name: 'status',
    label: i18n('entities.vip.fields.status'),
  },
  {
    name: 'type',
    label: i18n('entities.vip.fields.type'),
  },
  {
    name: 'createdAt',
    label: i18n('entities.vip.fields.createdAt'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'updatedAt',
    label: i18n('entities.vip.fields.updatedAt'),
    render: exporterRenders.datetime(),
  },
];
