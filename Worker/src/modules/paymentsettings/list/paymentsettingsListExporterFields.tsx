import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.paymentsettings.fields.id'),
  },
  {
    name: 'name',
    label: i18n('entities.paymentsettings.fields.name'),
  },
  {
    name: 'information',
    label: i18n('entities.paymentsettings.fields.information'),
  },
  {
    name: 'uniqueKeywords',
    label: i18n('entities.paymentsettings.fields.uniqueKeywords'),
  },
  {
    name: 'photo',
    label: i18n('entities.paymentsettings.fields.photo'),
    render: exporterRenders.filesOrImages(),
  },
  {
    name: 'text',
    label: i18n('entities.paymentsettings.fields.text'),
  },
  {
    name: 'status',
    label: i18n('entities.paymentsettings.fields.status'),
  },
  {
    name: 'type',
    label: i18n('entities.paymentsettings.fields.type'),
  },
  {
    name: 'createdAt',
    label: i18n('entities.paymentsettings.fields.createdAt'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'updatedAt',
    label: i18n('entities.paymentsettings.fields.updatedAt'),
    render: exporterRenders.datetime(),
  },
];
