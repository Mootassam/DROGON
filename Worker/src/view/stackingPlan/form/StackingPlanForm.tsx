
import React, { useState, useEffect } from 'react';
import { useForm, FormProvider, useWatch } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import FormWrapper from 'src/view/shared/styles/FormWrapper';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import ButtonIcon from 'src/view/shared/ButtonIcon';
import { i18n } from 'src/i18n';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';

const schema = yup.object().shape({
  currency: yupFormSchemas.enumerator(
    i18n('entities.stackingPlan.fields.currency'),
    {
      options: ['USDT', 'SUI', 'XRP', 'SOL', 'BTC', 'ETH'],
      required: true,
    },
  ),
  dailyRate: yupFormSchemas.decimal(
    i18n('entities.stackingPlan.fields.dailyRate'),
    { required: true },
  ),
  minimumStake: yupFormSchemas.decimal(
    i18n('entities.stackingPlan.fields.minimumStake'),
    { required: true },
  ),
  maxStake: yupFormSchemas.decimal(
    i18n('entities.stackingPlan.fields.maxStake'),
    { required: true },
  ),
  unstakingPeriod: yupFormSchemas.integer(
    i18n('entities.stackingPlan.fields.unstakingPeriod'),
    { required: true },
  ),
  estimatedRewards: yupFormSchemas.decimal(
    i18n('entities.stackingPlan.fields.estimatedRewards'),
    { required: false },
  ),
  status: yupFormSchemas.enumerator(
    i18n('entities.stackingPlan.fields.status'),
    {
      options: ['active', 'completed', 'cancelled'],
      required: true,
    },
  ),
});

function StackingPlanForm(props) {
  const [initialValues] = useState(() => {
    const record = props.record || {};
    return {
      currency: record.currency || '',
      dailyRate: record.dailyRate || 0,
      minimumStake: record.minimumStake || 0,
      maxStake: record.maxStake || 0,
      unstakingPeriod: record.unstakingPeriod || 0,
      estimatedRewards: record.estimatedRewards || 0,
      status: record.status || 'active',
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: initialValues,
  });

  // Watch dailyRate and unstakingPeriod
  const dailyRate = useWatch({ control: form.control, name: 'dailyRate' });
  const unstakingPeriod = useWatch({ control: form.control, name: 'unstakingPeriod' });

  // Calculate estimated rewards automatically
  useEffect(() => {
    const dr = Number(dailyRate);
    const period = Number(unstakingPeriod);

    if (!isNaN(dr) && !isNaN(period) && dr >= 0 && period >= 0) {
      const rewards = dr * period; // total % reward
      form.setValue('estimatedRewards', rewards.toFixed(2), {
        shouldValidate: true,
        shouldDirty: true,
      });
    } else {
      form.setValue('estimatedRewards', 0);
    }
  }, [dailyRate, unstakingPeriod, form]);

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
                name="currency"
                label={i18n('entities.stackingPlan.fields.currency')}
                options={[
                  { value: 'USDT', label: 'USDT' },
                  { value: 'SUI', label: 'SUI' },
                  { value: 'XRP', label: 'XRP' },
                  { value: 'SOL', label: 'SOL' },
                  { value: 'BTC', label: 'BTC' },
                  { value: 'ETH', label: 'ETH' },
                ]}
                required
              />
            </div>

            <div className="col-lg-6 col-md-8 col-12">
              <InputFormItem
                name="dailyRate"
                label={i18n('entities.stackingPlan.fields.dailyRate')}
                required
              />
            </div>

            <div className="col-lg-6 col-md-8 col-12">
              <InputFormItem
                name="minimumStake"
                label={i18n('entities.stackingPlan.fields.minimumStake')}
                required
              />
            </div>

            <div className="col-lg-6 col-md-8 col-12">
              <InputFormItem
                name="maxStake"
                label={i18n('entities.stackingPlan.fields.maxStake')}
                required
              />
            </div>

            <div className="col-lg-6 col-md-8 col-12">
              <InputFormItem
                name="unstakingPeriod"
                label={i18n('entities.stackingPlan.fields.unstakingPeriod')}
                type="number"
                required
              />
            </div>

            <div className="col-lg-6 col-md-8 col-12">
              <InputFormItem
                name="estimatedRewards"
                label={i18n('entities.stackingPlan.fields.estimatedRewards')}
                disabled
              />
            </div>

            <div className="col-lg-6 col-md-8 col-12">
              <SelectFormItem
                name="status"
                label={i18n('entities.stackingPlan.fields.status')}
                options={[
                  { value: 'active', label: 'Active' },
                  { value: 'completed', label: 'Completed' },
                  { value: 'cancelled', label: 'Cancelled' },
                ]}
                required
              />
            </div>
          </div>

          <div className="form-buttons">
            <button
              className="btn btn-primary"
              type="submit"
              disabled={props.saveLoading}
            >
              <ButtonIcon loading={props.saveLoading} iconClass="far fa-save" />
              &nbsp;{i18n('common.save')}
            </button>

            <button
              className="btn btn-light"
              type="button"
              onClick={onReset}
              disabled={props.saveLoading}
            >
              <i className="fas fa-undo"></i>
              &nbsp;{i18n('common.reset')}
            </button>

            {props.onCancel && (
              <button
                className="btn btn-light"
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

export default StackingPlanForm;
