import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { i18n } from 'src/i18n';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import ButtonIcon from 'src/view/shared/ButtonIcon';
import FormWrapper from 'src/view/shared/styles/FormWrapper';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import transactionEnumerators from 'src/modules/transaction/transactionEnumerators';
import UserAutocompleteFormItem from 'src/view/user/autocomplete/UserAutocompleteFormItem';
import WalletAutocompleteFormItem from 'src/view/assets/autocomplete/AssetsAutocompleteFormItem';
import DatePickerFormItem from 'src/view/shared/form/items/DatePickerFormItem';

const schema = yup.object().shape({
  wallet: yupFormSchemas.relationToOne(
    i18n('entities.transaction.fields.wallet'),
    { required: true },
  ),
  status: yupFormSchemas.enumerator(
    i18n('entities.transaction.fields.status'),
    { options: transactionEnumerators.status },
  ),
  user: yupFormSchemas.relationToOne(
    i18n('entities.transaction.fields.user'),
    { required: true },
  ),
  type: yupFormSchemas.enumerator(
    i18n('entities.transaction.fields.type'),
    { options: transactionEnumerators.type },
  ),
  direction: yupFormSchemas.enumerator(
    i18n('entities.transaction.fields.direction'),
    { options: transactionEnumerators.direction },
  ),
  asset: yupFormSchemas.string(
    i18n('entities.transaction.fields.asset'),
    { required: true },
  ),
  relatedAsset: yupFormSchemas.string(
    i18n('entities.transaction.fields.relatedAsset'),
  ),
  amount: yupFormSchemas.decimal(
    i18n('entities.transaction.fields.amount'),
    { required: true },
  ),
  dateTransaction: yupFormSchemas.date(
    i18n('entities.transaction.fields.dateTransaction'),
  ),
});

function TransactionForm(props) {
  const [initialValues] = useState(() => {
    const record = props.record || {};
    return {
      wallet: record.wallet || null,
      status: record.status || 'pending',
      user: record.user || null,
      type: record.type || 'deposit',
      direction: record.direction || 'in',
      asset: record.asset || '',
      relatedAsset: record.relatedAsset || '',
      amount: record.amount || 0,
      dateTransaction: record.dateTransaction || new Date(),
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
              <WalletAutocompleteFormItem
                name="wallet"
                label={i18n('entities.transaction.fields.wallet')}
                required
              />
            </div>

            <div className="col-lg-6 col-md-8 col-12">
              <SelectFormItem
                name="status"
                label={i18n('entities.transaction.fields.status')}
                options={transactionEnumerators.status.map((value) => ({
                  value,
                  label: i18n(`entities.transaction.enumerators.status.${value}`),
                }))}
                required
              />
            </div>

            <div className="col-lg-6 col-md-8 col-12">
              <UserAutocompleteFormItem
                name="user"
                label={i18n('entities.transaction.fields.user')}
                required
              />
            </div>

            <div className="col-lg-6 col-md-8 col-12">
              <SelectFormItem
                name="type"
                label={i18n('entities.transaction.fields.type')}
                options={transactionEnumerators.type.map((value) => ({
                  value,
                  label: i18n(`entities.transaction.enumerators.type.${value}`),
                }))}
                required
              />
            </div>

            <div className="col-lg-6 col-md-8 col-12">
              <SelectFormItem
                name="direction"
                label={i18n('entities.transaction.fields.direction')}
                options={transactionEnumerators.direction.map((value) => ({
                  value,
                  label: i18n(
                    `entities.transaction.enumerators.direction.${value}`,
                  ),
                }))}
                required
              />
            </div>

            <div className="col-lg-6 col-md-8 col-12">
              <InputFormItem
                name="asset"
                label={i18n('entities.transaction.fields.asset')}
                required
              />
            </div>

            <div className="col-lg-6 col-md-8 col-12">
              <InputFormItem
                name="relatedAsset"
                label={i18n('entities.transaction.fields.relatedAsset')}
              />
            </div>

            <div className="col-lg-6 col-md-8 col-12">
              <InputFormItem
                name="amount"
                label={i18n('entities.transaction.fields.amount')}
                required
              />
            </div>

            <div className="col-lg-6 col-md-8 col-12">
              <DatePickerFormItem
                name="dateTransaction"
                label={i18n('entities.transaction.fields.dateTransaction')}
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
              <ButtonIcon loading={props.saveLoading} iconClass="far fa-save" />
              &nbsp;
              {i18n('common.save')}
            </button>

            <button
              className="btn btn-light"
              type="button"
              disabled={props.saveLoading}
              onClick={onReset}
            >
              <i className="fas fa-undo"></i>
              &nbsp;
              {i18n('common.reset')}
            </button>

            {props.onCancel ? (
              <button
                className="btn btn-light"
                type="button"
                disabled={props.saveLoading}
                onClick={() => props.onCancel()}
              >
                <i className="fas fa-times"></i>&nbsp;
                {i18n('common.cancel')}
              </button>
            ) : null}
          </div>
        </form>
      </FormProvider>
    </FormWrapper>
  );
}

export default TransactionForm;
