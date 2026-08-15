import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { i18n } from 'src/i18n';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import ButtonIcon from 'src/view/shared/ButtonIcon';
import FormWrapper from 'src/view/shared/styles/FormWrapper';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import InputNumberFormItem from 'src/view/shared/form/items/InputNumberFormItem';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import couponsEnumerators from 'src/modules/coupons/couponsEnumerators';

const schema = yup.object().shape({
  title: yupFormSchemas.string(
    i18n('entities.coupons.fields.title'),
    {
      required: true,
    },
  ),
  codeName: yupFormSchemas.string(
    i18n('entities.coupons.fields.codeName'),
    {
      required: true,
    },
  ),
  discount: yupFormSchemas.decimal(
    i18n('entities.coupons.fields.discount'),
    {
      required: true,
    },
  ),
  noOfTimes: yupFormSchemas.integer(
    i18n('entities.coupons.fields.noOfTimes'),
    {
      required: true,
    },
  ),
  status: yupFormSchemas.enumerator(
    i18n('entities.coupons.fields.status'),
    {
      options: couponsEnumerators.status,
    },
  ),
  type: yupFormSchemas.enumerator(
    i18n('entities.coupons.fields.type'),
    {
      required: true,
      options: couponsEnumerators.type,
    },
  ),
});

function CouponsForm(props) {
  const [initialValues] = useState(() => {
    const record = props.record || {};

    return {
      title: record.title,
      codeName: record.codeName,
      discount: record.discount,
      noOfTimes: record.noOfTimes,
      // status: record.status,
      type: record.type,
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
            <div className="col-lg-7 col-md-8 col-12">
              <InputFormItem
                name="title"
                label={i18n(
                  'entities.coupons.fields.title',
                )}
                required={true}
                autoFocus
              />
            </div>
            <div className="col-lg-7 col-md-8 col-12">
              <InputFormItem
                name="codeName"
                label={i18n(
                  'entities.coupons.fields.codeName',
                )}
                required={true}
              />
            </div>

            <div className="col-lg-7 col-md-8 col-12">
              <InputNumberFormItem
                name="noOfTimes"
                label={i18n(
                  'entities.coupons.fields.noOfTimes',
                )}
                required={true}
              />
            </div>
            {/* <div className="col-lg-7 col-md-8 col-12">
              <SelectFormItem
                name="status"
                label={i18n(
                  'entities.coupons.fields.status',
                )}
                options={couponsEnumerators.status.map(
                  (value) => ({
                    value,
                    label: i18n(
                      `entities.coupons.enumerators.status.${value}`,
                    ),
                  }),
                )}
                required={false}
              />
            </div> */}

            <div className="col-lg-7 col-md-8 col-12">
              <SelectFormItem
                name="type"
                label={i18n('entities.coupons.fields.type')}
                options={couponsEnumerators.type.map(
                  (value) => ({
                    value,
                    label: i18n(
                      `entities.coupons.enumerators.type.${value}`,
                    ),
                  }),
                )}
                required={true}
              />
            </div>
            <div className="col-lg-7 col-md-8 col-12">
              <InputFormItem
                name="discount"
                label={i18n(
                  'entities.coupons.fields.discount',
                )}
                required={true}
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

export default CouponsForm;
