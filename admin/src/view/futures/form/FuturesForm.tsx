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
  futuresAmount: yupFormSchemas.decimal(i18n('entities.futures.fields.futuresAmount'), { required: true }),
  contractDuration: yupFormSchemas.string(i18n('entities.futures.fields.contractDuration'), { required: true }),
  direction: yupFormSchemas.string(i18n('entities.futures.fields.direction'), { required: true }),
  openPositionPrice: yupFormSchemas.decimal(i18n('entities.futures.fields.openPositionPrice'), { required: true }),
  openPositionTime: yupFormSchemas.datetime(i18n('entities.futures.fields.openPositionTime'), { required: true }),
  closePositionPrice: yupFormSchemas.decimal(i18n('entities.futures.fields.closePositionPrice'), {}),
  closePositionTime: yupFormSchemas.datetime(i18n('entities.futures.fields.closePositionTime'), {}),
  profitAndLoss: yupFormSchemas.decimal(i18n('entities.futures.fields.profitAndLoss'), {}),
  leverage: yupFormSchemas.decimal(i18n('entities.futures.fields.leverage'), { required: true }),
  control: yupFormSchemas.string(i18n('entities.futures.fields.control'), { required: true }),
  operate: yupFormSchemas.string(i18n('entities.futures.fields.operate'), { required: true }),
  auditor: yupFormSchemas.relationToOne(i18n('entities.futures.fields.auditor'), {}),
});

function FuturesForm(props) {
  const [initialValues] = useState(() => {
    const record = props.record || {};
    return {
      futuresAmount: record.futuresAmount,
      contractDuration: record.contractDuration,
      direction: record.direction,
      openPositionPrice: record.openPositionPrice,
      openPositionTime: record.openPositionTime,
      closePositionPrice: record.closePositionPrice,
      closePositionTime: record.closePositionTime,
      profitAndLoss: record.profitAndLoss,
      leverage: record.leverage,
      control: record.control,
      operate: record.operate,
      auditor: record.auditor || null,
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
          <div className="row g-3">

            <div className="col-lg-6 col-md-6 col-sm-12">
              <InputFormItem
                name="futuresAmount"
                label={i18n('entities.futures.fields.futuresAmount')}
                required
                type="number"
              />
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12">
              <InputFormItem
                name="contractDuration"
                label={i18n('entities.futures.fields.contractDuration')}
                required
              />
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12">
              <SelectFormItem
                name="direction"
                label={i18n('entities.futures.fields.direction')}
                options={[
                  { value: 'BUY', label: 'Buy' },
                  { value: 'SELL', label: 'Sell' },
                ]}
                required
              />
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12">
              <InputFormItem
                name="openPositionPrice"
                label={i18n('entities.futures.fields.openPositionPrice')}
                required
                type="number"
              />
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12">
              <InputFormItem
                name="openPositionTime"
                label={i18n('entities.futures.fields.openPositionTime')}
                required
                type="datetime-local"
              />
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12">
              <InputFormItem
                name="closePositionPrice"
                label={i18n('entities.futures.fields.closePositionPrice')}
                type="number"
              />
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12">
              <InputFormItem
                name="closePositionTime"
                label={i18n('entities.futures.fields.closePositionTime')}
                type="datetime-local"
              />
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12">
              <InputFormItem
                name="profitAndLoss"
                label={i18n('entities.futures.fields.profitAndLoss')}
                type="number"
              />
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12">
              <InputFormItem
                name="leverage"
                label={i18n('entities.futures.fields.leverage')}
                required
                type="number"
              />
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12">
              <SelectFormItem
                name="control"
                label={i18n('entities.futures.fields.control')}
                options={[
                  { value: 'normal', label: 'Normal' },
                  { value: 'loss', label: 'Loss' },
                  { value: 'profit', label: 'Profit' },
                ]}
                required
              />
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12">
              <SelectFormItem
                name="operate"
                label={i18n('entities.futures.fields.operate')}
                options={[
                  { value: 'high', label: 'High' },
                  { value: 'low', label: 'Low' },
                ]}
                required
              />
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12">
              <UserAutocompleteFormItem
                name="auditor"
                label={i18n('entities.futures.fields.auditor')}
              />
            </div>

          </div>

          <div className="form-buttons d-flex flex-wrap gap-2 mt-3">
            <button
              className="btn btn-primary"
              disabled={props.saveLoading}
              type="button"
              onClick={form.handleSubmit(onSubmit)}
            >
              <ButtonIcon loading={props.saveLoading} iconClass="far fa-save" />
              &nbsp;{i18n('common.save')}
            </button>

            <button
              className="btn btn-light"
              type="button"
              disabled={props.saveLoading}
              onClick={onReset}
            >
              <i className="fas fa-undo"></i>&nbsp;{i18n('common.reset')}
            </button>

            {props.onCancel && (
              <button
                className="btn btn-light"
                type="button"
                disabled={props.saveLoading}
                onClick={props.onCancel}
              >
                <i className="fas fa-times"></i>&nbsp;{i18n('common.cancel')}
              </button>
            )}
          </div>
        </form>
      </FormProvider>
    </FormWrapper>
  );
}

export default FuturesForm;
