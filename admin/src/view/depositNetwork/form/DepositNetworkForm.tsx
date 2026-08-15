import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { i18n } from 'src/i18n';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import ButtonIcon from 'src/view/shared/ButtonIcon';
import FormWrapper from 'src/view/shared/styles/FormWrapper';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';

const schema = yup.object().shape({
  name: yupFormSchemas.string(
    i18n('entities.depositNetwork.fields.name'),
    { required: true, min: 1, max: 255 },
  ),
  wallet: yupFormSchemas.string(
    i18n('entities.depositNetwork.fields.wallet'),
    { required: true, min: 1, max: 255 },
  ),
});

function DepositNetworkForm(props) {
  const [initialValues] = useState(() => {
    const record = props.record || {};
    return {
      name: record.name || '',
      wallet: record.wallet || '',
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: initialValues,
  });

  const onSubmit = (values) => {
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
              <InputFormItem
                name="name"
                label={i18n('entities.depositNetwork.fields.name')}
                required={true}
                placeholder={i18n('entities.depositNetwork.fields.name')}
                hint={i18n('entities.depositNetwork.fields.name')}
              />
            </div>

            <div className="col-lg-6 col-md-8 col-12">
              <InputFormItem
                name="wallet"
                label={i18n('entities.depositNetwork.fields.wallet')}
                required={true}
                placeholder={i18n('entities.depositNetwork.fields.wallet')}
                hint={i18n('entities.depositNetwork.fields.wallet')}
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

export default DepositNetworkForm;