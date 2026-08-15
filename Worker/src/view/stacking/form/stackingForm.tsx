
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
import StackingPlanAutocompleteFormItem from 'src/view/stackingPlan/autocomplete/StackingAutocompleteFormItem';

const schema = yup.object().shape({
  user: yupFormSchemas.relationToOne(
    i18n('entities.stacking.fields.user'),
    { required: true },
  ),
  plan: yupFormSchemas.relationToOne(
    i18n('entities.stacking.fields.plan'),
    { required: true },
  ),
  amount: yupFormSchemas.decimal(
    i18n('entities.stacking.fields.amount'),
    { required: true },
  ),
  status: yupFormSchemas.enumerator(
    i18n('entities.stacking.fields.status'),
    {
      options: ['active', 'completed', 'cancelled'],
    },
  ),
  startDate: yupFormSchemas.datetime(
    i18n('entities.stacking.fields.startDate'),
    {},
  ),
  endDate: yupFormSchemas.datetime(
    i18n('entities.stacking.fields.endDate'),
    {},
  ),
  earnedRewards: yupFormSchemas.decimal(
    i18n('entities.stacking.fields.earnedRewards'),
    {},
  ),
});

function StackingForm(props) {
  const formatDateTime = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const pad = (n) => n.toString().padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(
      d.getDate(),
    )}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  const [initialValues] = useState(() => {
    const record = props.record || {};
    return {
      user: record.user || null,
      plan: record.plan || null,
      amount: record.amount,
      status: record.status || 'active',
      startDate: formatDateTime(record.startDate),
      endDate: formatDateTime(record.endDate),
      earnedRewards: record.earnedRewards,
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
            {/* User */}
            <div className="col-lg-6 col-md-8 col-12">
              <UserAutocompleteFormItem
                name="user"
                label={i18n('entities.stacking.fields.user')}
                required={true}
              />
            </div>

            {/* Plan */}
            <div className="col-lg-6 col-md-8 col-12">
              <StackingPlanAutocompleteFormItem
                name="plan"
                label={i18n('entities.stacking.fields.plan')}
                required={true}
              />
            </div>

            {/* Amount */}
            <div className="col-lg-6 col-md-8 col-12">
              <InputFormItem
                name="amount"
                label={i18n('entities.stacking.fields.amount')}
                required={true}
                type="number"
              />
            </div>

            {/* Status */}
            <div className="col-lg-6 col-md-8 col-12">
              <SelectFormItem
                name="status"
                label={i18n('entities.stacking.fields.status')}
                options={[
                  {
                    value: 'active',
                    label: i18n(
                      'entities.stacking.enumerators.status.active',
                    ),
                  },
                  {
                    value: 'completed',
                    label: i18n(
                      'entities.stacking.enumerators.status.completed',
                    ),
                  },
                  {
                    value: 'cancelled',
                    label: i18n(
                      'entities.stacking.enumerators.status.cancelled',
                    ),
                  },
                ]}
                required={true}
              />
            </div>

            {/* Start Date */}
            <div className="col-lg-6 col-md-8 col-12">
              <InputFormItem
                name="startDate"
                label={i18n('entities.stacking.fields.startDate')}
                type="datetime-local"
              />
            </div>

            {/* End Date */}
            <div className="col-lg-6 col-md-8 col-12">
              <InputFormItem
                name="endDate"
                label={i18n('entities.stacking.fields.endDate')}
                type="datetime-local"
              />
            </div>

            {/* Earned Rewards */}
            <div className="col-lg-6 col-md-8 col-12">
              <InputFormItem
                name="earnedRewards"
                label={i18n('entities.stacking.fields.earnedRewards')}
                type="number"
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

export default StackingForm;
