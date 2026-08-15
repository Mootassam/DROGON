import { i18n } from 'src/i18n';
import schemas from 'src/modules/shared/yup/yupImporterSchemas';


export default [
  {
    name: 'email',
    label: i18n('user.fields.email'),
    schema: schemas.email(i18n('user.fields.email')),
  },
  {
    name: 'roles',
    label: i18n('user.fields.roles'),
    schema: schemas.stringArray(i18n('user.fields.roles')),
  },
  {
    name: 'phoneNumber',
    label: i18n('user.fields.phoneNumber'),
    schema: schemas.string(i18n('user.fields.phoneNumber')),
  },
  {
    name: 'secteur',
    label: i18n('user.fields.secteur'),
    schema: schemas.stringArray(i18n('user.fields.secteur')),
  },
  {
    name: 'employeur',
    label: i18n('user.fields.employeur'),
    schema: schemas.string(i18n('user.fields.employeur')),
  },
  {
    name: 'profession',
    label: i18n('user.fields.profession'),
    schema: schemas.string(i18n('user.fields.profession')),
  },
  {
    name: 'adresse',
    label: i18n('user.fields.adresse'),
    schema: schemas.string(i18n('user.fields.adresse')),
  },
  {
    name: 'fullName',
    label: i18n('user.fields.fullName'),
    schema: schemas.string(i18n('user.fields.fullName')),
  },
  {
    name: 'cin',
    label: i18n('user.fields.cin'),
    schema: schemas.integer(i18n('user.fields.cin')),
  },
  {
    name: 'date_naissance',
    label: i18n('user.fields.date_naissance'),
    schema: schemas.date(i18n('user.fields.date_naissance')),
  },
  {
    name: 'etat_civil',
    label: i18n('user.fields.etat_civil'),
    schema: schemas.stringArray(i18n('user.fields.etat_civil')),
  },
  {
    name: 'status',
    label: i18n('user.fields.status'),
    schema: schemas.stringArray(i18n('user.fields.status')),
  },
  {
    name: 'lien_facebook',
    label: i18n('user.fields.lien_facebook'),
    schema: schemas.string(i18n('user.fields.lien_facebook')),
  },
  {
    name: 'parrain',
    label: i18n('user.fields.parrain'),
    schema: schemas.relationToOne(i18n('user.fields.parrain')),
  },
];
