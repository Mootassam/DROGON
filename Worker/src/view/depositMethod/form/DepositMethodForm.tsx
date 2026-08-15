
import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import FormWrapper from 'src/view/shared/styles/FormWrapper';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import ButtonIcon from 'src/view/shared/ButtonIcon';
import { i18n } from 'src/i18n';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import DepositNetworkAutocompleteFormItem from 'src/view/depositNetwork/autocomplete/DepositNetworkAutocompleteFormItem';
import depositMethodEnumerators from 'src/modules/depositMethod/depositMethodEnumerators';

const schema = yup.object().shape({
  symbol: yupFormSchemas.string(
    i18n('entities.depositMethod.fields.symbol'),
    { required: true },
  ),


  network: yupFormSchemas.relationToMany(
    i18n('entities.depositMethod.fields.network'),
    { required: true },
  ),
});

function DepositMethodForm(props) {
  const [initialValues] = useState(() => {
    const record = props.record || {};

    console.log(record);

    return {
      symbol: record.symbol || '',
      name: record.name || '',
      address: record.address || '',
      network: record.network || [],
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

  const onReset = () => form.reset(initialValues);



  return (
    <FormWrapper>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-lg-6 col-md-8 col-12">


              <SelectFormItem
                name="symbol"
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


            <div className="col-lg-6 col-md-8 col-12">
              <DepositNetworkAutocompleteFormItem
                name="network"
                label={i18n('entities.depositMethod.fields.network')}
                required
                mode="multiple"
              />
            </div>

          </div>

          <div className="form-buttons mt-3">
            <button
              className="btn btn-primary"
              type="submit"
              disabled={props.saveLoading}
            >
              <ButtonIcon loading={props.saveLoading} iconClass="far fa-save" />
              &nbsp;{i18n('common.save')}
            </button>

            <button
              className="btn btn-light ms-2"
              type="button"
              onClick={onReset}
              disabled={props.saveLoading}
            >
              <i className="fas fa-undo"></i>
              &nbsp;{i18n('common.reset')}
            </button>

            {props.onCancel && (
              <button
                className="btn btn-light ms-2"
                type="button"
                onClick={() => props.onCancel()}
                disabled={props.saveLoading}
              >
                <i className="fas fa-times"></i>
                &nbsp;{i18n('common.cancel')}
              </button>
            )}
          </div>
        </form>
      </FormProvider>
    </FormWrapper>
  );
}

export default DepositMethodForm;
