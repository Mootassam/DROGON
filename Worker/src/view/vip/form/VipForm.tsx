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

import ImagesFormItem from 'src/view/shared/form/items/ImagesFormItem';
import Storage from 'src/security/storage';

const schema = yup.object().shape({
  title: yupFormSchemas.string(
    i18n('entities.vip.fields.title'),
    {
      required: true,
    },
  ),
  photo: yupFormSchemas.images(
    i18n('entities.vip.fields.photo'),
    {},
  ),
  entrylimit: yupFormSchemas.string(
    i18n('entities.vip.fields.entrylimit'),
    {

    },
  ),
  levellimit: yupFormSchemas.decimal(
    i18n('entities.vip.fields.levelLimit'),
    {
      required: true,
    },
  ),
  dailyorder: yupFormSchemas.integer(
    i18n('entities.vip.fields.dailyorder'),
    {
      required: true,
    },
  ),
  comisionrate: yupFormSchemas.decimal(
    i18n('entities.vip.fields.comisionrate'),
    {
      required: true,
    },
  ),


});

function VipForm(props) {
  const [initialValues] = useState(() => {
    const record = props.record || {};
    return {
      title : record.title, 
      photo: record.photo || [],
      entrylimit : record.entrylimit, 
      levellimit : record.levellimit, 
      dailyorder : record.dailyorder, 
      comisionrate : record.comisionrate, 
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
                  'entities.vip.fields.title',
                )}
                required={true}
                autoFocus
              />
            </div>
            <div className="col-lg-7 col-md-8 col-12">
            <ImagesFormItem
                name="photo"
                label={i18n(
                  'entities.paymentsettings.fields.photo',
                )}
                required={false}
                storage={
                  Storage.values.categoryPhoto
                }
                max={undefined}
              />
               </div>

               <div className="col-lg-7 col-md-8 col-12">
              <InputNumberFormItem
                name="dailyorder"
                label={i18n(
                  'entities.vip.fields.dailyorder',
                )}
                required={true}
              />
            </div>
            <div className="col-lg-7 col-md-8 col-12">
              <InputNumberFormItem
                name="comisionrate"
                label={i18n(
                  'entities.vip.fields.commissionrate',
                )}
                required={true}
              />
            </div>

            <div className="col-lg-7 col-md-8 col-12">
              <InputFormItem
                name="levellimit"
                label={i18n(
                  'entities.vip.fields.levelLimit',
                )}
                required={true}
                autoFocus
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

export default VipForm;
