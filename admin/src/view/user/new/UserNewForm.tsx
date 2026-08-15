import { useForm, FormProvider } from 'react-hook-form';
import { i18n } from 'src/i18n';
import React, { useState } from 'react';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import InputNumberFormItem from 'src/view/shared/form/items/InputNumberFormItem';
import DatePickerFormItem from 'src/view/shared/form/items/DatePickerFormItem';
import TagsFormItem from 'src/view/shared/form/items/TagsFormItem';
import FormWrapper from 'src/view/shared/styles/FormWrapper';
import Calendar from 'react-calendar';
import ButtonIcon from 'src/view/shared/ButtonIcon';
import * as yup from 'yup';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import userEnumerators from 'src/modules/user/userEnumerators';
import { yupResolver } from '@hookform/resolvers/yup';
import userSecteur from 'src/modules/user/userSecteur';
import moment from 'moment';
import userEtat from 'src/modules/user/userEtat';
import UserAdherantAutocompleteFormItem from 'src/view/user/autocomplete/UserAdherantAutocompleteFormItem';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ImagesFormItem from 'src/view/shared/form/items/ImagesFormItem';
import Storage from 'src/security/storage';
import CouponsAutocompleteFormItem from 'src/view/coupons/autocomplete/CouponsAutocompleteFormItem';
import FilesFormItem from 'src/view/shared/form/items/FilesFormItem';

const singleSchema = yup.object().shape({
  email: yupFormSchemas.email(i18n('user.fields.email')),
  roles: yupFormSchemas.stringArray(
    i18n('user.fields.roles'),
    {
      // "min": 1
    },
  ),
  phoneNumber: yupFormSchemas.string(i18n('phoneNumber'), {
    // "matches": /^[0-9]/,
    max: 24,
  }),

  secteur: yupFormSchemas.enumerator(i18n('secteur'), {
    options: userSecteur.secteur,
  }),

  adresse: yupFormSchemas.string(i18n('adresse'), {}),
  fullName: yupFormSchemas.string(i18n('fullName'), {}),
  cin: yupFormSchemas.integer(i18n('cin'), {
    max: 8,
  }),
  bearthday: yupFormSchemas.date(
    i18n('Date Naissance'),
    {},
  ),
});
const multipleSchema = yup.object().shape({
  emails: yup
    .array()
    .label(i18n('user.fields.emails'))
    .of(
      yup
        .string()
        .transform((cv, ov) => {
          return ov === '' ? null : cv;
        })
        .email(i18n('user.validations.email'))
        .label(i18n('user.fields.email'))
        .max(255)
        .required(),
    )
    .required()
    .min(1),
  roles: yupFormSchemas.stringArray(
    i18n('user.fields.roles'),
    {
      required: false,
      // min: 1
    },
  ),
});

function UserNewForm(props) {
  const { single, saveLoading } = props;
  const record = props.user || {};

  const schema = props.single
    ? singleSchema
    : multipleSchema;

  const [initialValues] = useState(() => ({
    emails: [],
    email: '',
    roles: [],
    phoneNumber: '',
    passportNumber: '',
    nationality: '',
    country: '',
    state: '',
    payee: '',
    fullName: '',
    bearthday: record.date_naissance
      ? moment(record.date_naissance, 'DD-MM-YYYY').toDate()
      : null,
    visa: '',
    visaDocument: [''],
  }));

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: initialValues,
  });
  const onSubmit = (values) => {
    const { ...data } = values;

    data.roles[0] = 'membre';

    if (data.email) {
      data.emails = [data.email];
      delete data.email;
    }

    props.onSubmit(null, data);
  };

  const onReset = () => {
    Object.keys(initialValues).forEach((key) => {
      form.setValue(key, initialValues[key]);
    });
  };
  const [value, onChange] = useState(new Date());

  return (
    <FormWrapper>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Row
            style={{
              paddingBottom: '10px',
            }}
          >
            <Col sm={4}>
              <InputFormItem
                name="emails[0]"
                label={i18n('user.fields.email')}
                required={true}
              />
            </Col>

            <Col sm={4}>
              <InputFormItem
                name="fullName"
                label={i18n('user.fields.fullName')}
                required={true}
              />
            </Col>
            <Col sm={4}>
              <InputFormItem
                name="phoneNumber"
                label={i18n('user.fields.phoneNumber')}
                autoComplete="phoneNumber"
              />
            </Col>
          </Row>
          <Row>
            <Col sm={4}>
              <InputFormItem
                name="nationality"
                label={i18n('user.fields.Nationality')}
              />
            </Col>
            <Col sm={4}>
              <InputFormItem
                name="country"
                label={i18n('user.fields.Country')}
                autoComplete="Country"
              />
            </Col>
            <Col sm={4}>
              <InputFormItem
                name="state"
                label={i18n('user.fields.state')}
                autoComplete="state"
              />
            </Col>
          </Row>
          <Row
            style={{
              paddingBottom: '10px',
            }}
          >
            <Col sm={4}>
              <InputFormItem
                name="passportNumber"
                label={i18n('user.fields.passportNumber')}
              />
            </Col>
            <Col sm={4}>
              <ImagesFormItem
                name="photo"
                label={i18n(
                  'entities.category.fields.passportphoto',
                )}
                required={false}
                storage={Storage.values.categoryPhoto}
                max={undefined}
              />
            </Col>
            <Col sm={4}>
              <DatePickerFormItem
                name="bearthday"
                label={i18n('user.fields.bearthday')}
              />
            </Col>
          </Row>

          <Row>
            <Col sm={4}>
              <SelectFormItem
                name="payee"
                label={i18n('user.fields.payee')}
                options={userEtat.Etat.map((value) => ({
                  value,
                  label: i18n(
                    `user.maritalStatus.${value}`,
                  ),
                }))}
              />
            </Col>
            {/* <Col sm={4}>
              <SelectFormItem
                name="status"
                label={i18n('user.fields.status')}

                options={userEnumerators.status.map(
                  (value) => ({
                    value,
                    label: i18n(`user.status.${value}`),
                  }),
                )}
              />
            </Col> */}
            <Col sm={4}>
              <FilesFormItem
                name="attachements"
                label={i18n(
                  'entities.projet.fields.attachements',
                )}
                required={false}
                storage={Storage.values.projetAttachements}
                max={undefined}
                formats={undefined}
              />
            </Col>
            <Col sm={4}>
              <CouponsAutocompleteFormItem
                name="coupons"
                label={i18n(
                  'entities.subcategories.fields.categoryId',
                )}
                required={true}
                showCreate={!props.modal}
              />
            </Col>
          </Row>

          <div className="form-buttons">
            <button
              className="btn btn-primary"
              disabled={saveLoading}
              type="button"
              onClick={form.handleSubmit(onSubmit)}
            >
              <ButtonIcon
                loading={saveLoading}
                iconClass="far fa-save"
              />

              {i18n('common.save')}
            </button>

            <button
              disabled={saveLoading}
              onClick={onReset}
              className="btn btn-light"
              type="button"
            >
              <i className="fas fa-undo"></i>

              {i18n('common.reset')}
            </button>

            {props.onCancel ? (
              <button
                disabled={saveLoading}
                onClick={() => props.onCancel()}
                className="btn btn-light"
                type="button"
              >
                <i className="fas fa-times"></i>

                {i18n('common.cancel')}
              </button>
            ) : null}
          </div>
        </form>
      </FormProvider>
    </FormWrapper>
  );
}

export default UserNewForm;
