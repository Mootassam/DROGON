import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.rules.fields.id'),
  },
  {
    name: 'name',
    label: i18n('entities.rules.fields.name'),
  },
  {
    name: 'slug',
    label: i18n('entities.rules.fields.slug'),
  },
  {
    name: 'photo',
    label: i18n('entities.rules.fields.photo'),
    render: exporterRenders.filesOrImages(),
  },
  {
    name: 'metaKeywords',
    label: i18n('entities.rules.fields.metaKeywords'),
  },
  {
    name: 'metaDescriptions',
    label: i18n('entities.rules.fields.metaDescriptions'),
  },
  {
    name: 'status',
    label: i18n('entities.rules.fields.status'),
  },
  {
    name: 'isFeature',
    label: i18n('entities.rules.fields.isFeature'),
    render: exporterRenders.boolean(),
  },
  {
    name: 'serial',
    label: i18n('entities.rules.fields.serial'),
  },
  {
    name: 'createdAt',
    label: i18n('entities.rules.fields.createdAt'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'updatedAt',
    label: i18n('entities.rules.fields.updatedAt'),
    render: exporterRenders.datetime(),
  },
];
