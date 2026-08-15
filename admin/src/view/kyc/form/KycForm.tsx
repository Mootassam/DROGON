import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { i18n } from 'src/i18n';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import ButtonIcon from 'src/view/shared/ButtonIcon';
import FormWrapper from 'src/view/shared/styles/FormWrapper';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import ImagesFormItem from 'src/view/shared/form/items/ImagesFormItem';
import Storage from 'src/security/storage';
import UserAutocompleteFormItem from 'src/view/user/autocomplete/UserAutocompleteFormItem';
import transactionEnumerators from 'src/modules/transaction/transactionEnumerators';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';

const schema = yup.object().shape({
  user: yupFormSchemas.relationToOne(i18n('entities.vip.fields.title'), { required: true }),
  Documenttype: yupFormSchemas.string(i18n('Documenttype'), { required: true }),
  realname: yupFormSchemas.string(i18n('realname'), { required: true }),
  idnumer: yupFormSchemas.string(i18n('idnumer')),
  front: yupFormSchemas.images(i18n('front')),
  back: yupFormSchemas.images(i18n('back')),
  selfie: yupFormSchemas.images(i18n('selfie')),
  status: yupFormSchemas.enumerator(i18n('entities.transaction.fields.status'), {
    options: transactionEnumerators.status,
  }),
});

function KycForm(props) {
  const [initialValues] = useState(() => {
    const record = props.record || {};
    return {
      user: record.user || [],
      Documenttype: record.Documenttype,
      realname: record.realname,
      idnumer: record.idnumer,
      front: record.front || [],
      back: record.back || [],
      selfie: record.selfie || [],
      status: record.status || [],
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
              <UserAutocompleteFormItem
                name="user"
                label={i18n('entities.kyc.fields.useraccount')}
                required
                autoFocus
              />
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12">
              <InputFormItem
                name="Documenttype"
                label={i18n('entities.kyc.fields.documenttype')}
                required
                autoFocus
              />
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12">
              <InputFormItem
                name="realname"
                label={i18n('entities.kyc.fields.realname')}
                required
              />
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12">
              <InputFormItem
                name="idnumer"
                label={i18n('entities.kyc.fields.idnumber')}
              />
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12">
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

            <div className="col-lg-6 col-md-6 col-sm-12">
              <ImagesFormItem
                name="front"
                label={i18n('entities.paymentsettings.fields.photo')}
                storage={Storage.values.categoryPhoto}
              />
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12">
              <ImagesFormItem
                name="back"
                label={i18n('entities.paymentsettings.fields.photo')}
                storage={Storage.values.categoryPhoto}
              />
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12">
              <ImagesFormItem
                name="selfie"
                label={i18n('entities.paymentsettings.fields.photo')}
                storage={Storage.values.categoryPhoto}
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

export default KycForm;
