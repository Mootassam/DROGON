import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { i18n } from 'src/i18n';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import ButtonIcon from 'src/view/shared/ButtonIcon';
import FormWrapper from 'src/view/shared/styles/FormWrapper';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import UserAutocompleteFormItem from 'src/view/user/autocomplete/UserAutocompleteFormItem';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';

const schema = yup.object().shape({
  user: yupFormSchemas.relationToOne(
    i18n('entities.notification.fields.user'),
    { required: false },
  ),
  type: yupFormSchemas.enumerator(
    i18n('entities.notification.fields.type'),
    {
      options: [
        'deposit',
        'withdraw',
        'staking',
        'kyc',
        'commission',
        'futures',
        'accountActivated',
        'custom',
      ],
      required: true,
    },
  ),
  message: yupFormSchemas.string(
    i18n('entities.notification.fields.message'),
    { required: true },
  ),
  status: yupFormSchemas.enumerator(
    i18n('entities.notification.fields.status'),
    {
      options: ['unread', 'read'],
      required: true,
    },
  ),
  forAdmin: yupFormSchemas.boolean(
    i18n('entities.notification.fields.forAdmin'),
  ),
  createdBy: yupFormSchemas.relationToOne(
    i18n('entities.notification.fields.createdBy'),
  ),
  updatedBy: yupFormSchemas.relationToOne(
    i18n('entities.notification.fields.updatedBy'),
  ),
});

function NotificationForm(props) {
  const [initialValues] = useState(() => {
    const record = props.record || {};
    return {
      userId: record.userId || null,
      type: record.type || 'custom',
      message: record.message || '',
      status: record.status || 'unread',
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: initialValues,
  });

  const onSubmit = (values) => {
    values.userId = values.userId.id
    props.onSubmit(props.record?.id, values);
  };

  const onReset = () => {
    Object.keys(initialValues).forEach((key) => {
      form.setValue(key, initialValues[key]);
    });
  };

  return (
    <FormWrapper>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="row">

            <div className="col-lg-6 col-md-8 col-12">
              <UserAutocompleteFormItem
                name="userId"
                label={i18n('entities.notification.fields.user')}
              />
            </div>

            <div className="col-lg-6 col-md-8 col-12">
              <SelectFormItem
                name="type"
                label={i18n('entities.notification.fields.type')}
                options={[
                  { value: 'deposit', label: i18n('entities.notification.enumerators.type.deposit') },
                  { value: 'withdraw', label: i18n('entities.notification.enumerators.type.withdraw') },
                  { value: 'staking', label: i18n('entities.notification.enumerators.type.staking') },
                  { value: 'kyc', label: i18n('entities.notification.enumerators.type.kyc') },
                  { value: 'commission', label: i18n('entities.notification.enumerators.type.commission') },
                  { value: 'futures', label: i18n('entities.notification.enumerators.type.futures') },
                  { value: 'accountActivated', label: i18n('entities.notification.enumerators.type.accountActivated') },
                  { value: 'custom', label: i18n('entities.notification.enumerators.type.custom') },
                ]}
                required
              />
            </div>

            <div className="col-12">
              <InputFormItem
                name="message"
                label={i18n('entities.notification.fields.message')}
                required
              />
            </div>

            <div className="col-lg-6 col-md-8 col-12">
              <SelectFormItem
                name="status"
                label={i18n('entities.notification.fields.status')}
                options={[
                  { value: 'unread', label: i18n('entities.notification.enumerators.status.unread') },
                  { value: 'read', label: i18n('entities.notification.enumerators.status.read') },
                ]}
                required
              />
            </div>

          </div>

          <div className="form-buttons">
            <button
              className="btn btn-primary"
              disabled={props.saveLoading}
              type="button"
              onClick={form.handleSubmit(onSubmit)}
            >
              <ButtonIcon
                loading={props.saveLoading}
                iconClass="far fa-save"
              />
              &nbsp;{i18n('common.save')}
            </button>

            <button
              className="btn btn-light"
              type="button"
              disabled={props.saveLoading}
              onClick={onReset}
            >
              <i className="fas fa-undo"></i>
              &nbsp;{i18n('common.reset')}
            </button>

            {props.onCancel ? (
              <button
                className="btn btn-light"
                type="button"
                disabled={props.saveLoading}
                onClick={() => props.onCancel()}
              >
                <i className="fas fa-times"></i>
                &nbsp;{i18n('common.cancel')}
              </button>
            ) : null}
          </div>
        </form>
      </FormProvider>
    </FormWrapper>
  );
}

export default NotificationForm;
