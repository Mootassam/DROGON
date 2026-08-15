import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.category.fields.id'),
  },
  {
    name: 'name',
    label: i18n('entities.category.fields.name'),
  },
  {
    name: 'slug',
    label: i18n('entities.category.fields.slug'),
  },
  {
    name: 'photo',
    label: i18n('entities.category.fields.photo'),
    render: exporterRenders.filesOrImages(),
  },
  {
    name: 'metaKeywords',
    label: i18n('entities.category.fields.metaKeywords'),
  },
  {
    name: 'metaDescriptions',
    label: i18n('entities.category.fields.metaDescriptions'),
  },
  {
    name: 'status',
    label: i18n('entities.category.fields.status'),
  },
  {
    name: 'isFeature',
    label: i18n('entities.category.fields.isFeature'),
    render: exporterRenders.boolean(),
  },
  {
    name: 'serial',
    label: i18n('entities.category.fields.serial'),
  },
  {
    name: 'createdAt',
    label: i18n('entities.category.fields.createdAt'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'updatedAt',
    label: i18n('entities.category.fields.updatedAt'),
    render: exporterRenders.datetime(),
  },
];
