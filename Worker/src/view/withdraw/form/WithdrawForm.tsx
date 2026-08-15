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
  orderNo: yupFormSchemas.string(i18n('entities.withdraw.fields.orderNo'), { required: true }),
  currency: yupFormSchemas.string(i18n('entities.withdraw.fields.currency'), { required: true }),
  withdrawAmount: yupFormSchemas.decimal(i18n('entities.withdraw.fields.withdrawAmount'), { required: true }),
  fee: yupFormSchemas.decimal(i18n('entities.withdraw.fields.fee'), { required: true }),
  totalAmount: yupFormSchemas.decimal(i18n('entities.withdraw.fields.totalAmount'), { required: true }),
  auditor: yupFormSchemas.relationToOne(i18n('entities.withdraw.fields.auditor')),
  acceptTime: yupFormSchemas.datetime(i18n('entities.withdraw.fields.acceptTime')),
  status: yupFormSchemas.enumerator(i18n('entities.withdraw.fields.status'), {
    options: ['pending', 'canceled', 'success'],
  }),
});

function WithdrawForm(props) {
  const [initialValues] = useState(() => {
    const record = props.record || {};
    return {
      orderNo: record.orderNo,
      currency: record.currency,
      withdrawAmount: record.withdrawAmount,
      fee: record.fee,
      totalAmount: record.totalAmount,
      auditor: record.auditor || null,
      acceptTime: record.acceptTime,
      status: record.status || 'pending',
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
    Object.keys(initialValues).forEach((key) => form.setValue(key, initialValues[key]));
  };

  return (
    <FormWrapper>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="row g-3">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <InputFormItem name="orderNo" label={i18n('entities.withdraw.fields.orderNo')} required />
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12">
              <InputFormItem name="currency" label={i18n('entities.withdraw.fields.currency')} required />
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12">
              <InputFormItem name="withdrawAmount" label={i18n('entities.withdraw.fields.withdrawAmount')} required type="number" />
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12">
              <InputFormItem name="fee" label={i18n('entities.withdraw.fields.fee')} required type="number" />
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12">
              <InputFormItem name="totalAmount" label={i18n('entities.withdraw.fields.totalAmount')} required type="number" />
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12">
              <UserAutocompleteFormItem name="auditor" label={i18n('entities.withdraw.fields.auditor')} />
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12">
              <InputFormItem name="acceptTime" label={i18n('entities.withdraw.fields.acceptTime')} type="datetime-local" />
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12">
              <SelectFormItem
                name="status"
                label={i18n('entities.withdraw.fields.status')}
                options={[
                  { value: 'pending', label: i18n('entities.withdraw.enumerators.status.pending') },
                  { value: 'canceled', label: i18n('entities.withdraw.enumerators.status.canceled') },
                  { value: 'success', label: i18n('entities.withdraw.enumerators.status.success') },
                ]}
                required
              />
            </div>
          </div>

          <div className="form-buttons d-flex flex-wrap gap-2 mt-3">
            <button className="btn btn-primary" disabled={props.saveLoading} type="button" onClick={form.handleSubmit(onSubmit)}>
              <ButtonIcon loading={props.saveLoading} iconClass="far fa-save" />&nbsp;{i18n('common.save')}
            </button>

            <button className="btn btn-light" type="button" disabled={props.saveLoading} onClick={onReset}>
              <i className="fas fa-undo"></i>&nbsp;{i18n('common.reset')}
            </button>

            {props.onCancel && (
              <button className="btn btn-light" type="button" disabled={props.saveLoading} onClick={props.onCancel}>
                <i className="fas fa-times"></i>&nbsp;{i18n('common.cancel')}
              </button>
            )}
          </div>
        </form>
      </FormProvider>
    </FormWrapper>
  );
}

export default WithdrawForm;
