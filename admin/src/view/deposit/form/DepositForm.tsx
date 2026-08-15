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
import transactionEnumerators from 'src/modules/transaction/transactionEnumerators';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import depositEnumerators from 'src/modules/deposit/depositEnumerators';
import depositMethodEnumerators from 'src/modules/depositMethod/depositMethodEnumerators';

const schema = yup.object().shape({
  orderno: yupFormSchemas.string(
    i18n('entities.deposit.fields.orderno'),
  ),
  amount: yupFormSchemas.decimal(
    i18n('entities.deposit.fields.amount'),
    { required: true },
  ),
  txid: yupFormSchemas.string(
    i18n('entities.deposit.fields.txid'),
  ),
  rechargechannel: yupFormSchemas.string(
    i18n('entities.deposit.fields.rechargechannel'),
    { required: true },
  ),



  status: yupFormSchemas.enumerator(
    i18n('entities.deposit.fields.status'),
    {
      options: transactionEnumerators.status,
    },
  ),
});

function DepositForm(props) {
  const [initialValues] = useState(() => {
    const record = props.record || {};
    return {
      depositType: record.depositType || '',
      createdBy: record.createdBy,
      amount: record.amount,
      rechargechannel: record.rechargechannel || '',
      status: record.status 
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: initialValues,
  });

  const onSubmit = (values) => {
    values.status = 'success';
    values.createdBy= values.createdBy.id;
    values.rechargetime = new Date();
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
                name="createdBy"
                label={i18n('entities.deposit.fields.user')}
                required={true}
              />
            </div>


            <div className="col-lg-6 col-md-8 col-12">
             
              <SelectFormItem
                name="depositType"
                label={i18n('entities.deposit.fields.depositType')}
                options={depositEnumerators.depositType.map(
                  (value) => ({
                    value,
                    label: i18n(`entities.deposit.enumerators.depositType.${value}`),
                  }),
                )}
                required

              />
            </div>

       
            <div className="col-lg-6 col-md-8 col-12">
              <InputFormItem
                name="amount"
                label={i18n('entities.deposit.fields.amount')}
                required={true}
                type="number"
              />
            </div>

       

            <div className="col-lg-6 col-md-8 col-12">
           
              <SelectFormItem
                name="rechargechannel"
                label={i18n('entities.depositMethod.fields.symbol')}
                options={depositMethodEnumerators.coins.map(
                  (value) => ({
                    value,
                    label: i18n(`entities.depositMethod.enumerators.coins.${value}`),
                  }),
                )}
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

export default DepositForm;
