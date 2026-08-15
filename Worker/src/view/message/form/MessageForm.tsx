import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { i18n } from 'src/i18n';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import ButtonIcon from 'src/view/shared/ButtonIcon';
import FormWrapper from 'src/view/shared/styles/FormWrapper';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';

const schema = yup.object().shape({
  name: yupFormSchemas.string(
    i18n('entities.message.fields.name'),
    {
      required: true,
    },
  ),
  email: yupFormSchemas.string(
    i18n('entities.message.fields.email'),
    {
      required: true,
    },
  ),
  subject: yupFormSchemas.string(
    i18n('entities.message.fields.subject'),
    {
      required: true,
    },
  ),
  content: yupFormSchemas.string(
    i18n('entities.message.fields.content'),
    {
      required: true,
    },
  ),
});

function MessageForm(props) {
  const [initialValues] = useState(() => {
    const record = props.record || {};
    return {
      name: record.name,
      email: record.email,
      subject: record.subject,
      content: record.content,
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
                name="name"
                label={i18n('entities.message.fields.name')}
                required={true}
              />
            </div>

            <div className="col-lg-7 col-md-8 col-12">
              <InputFormItem
                name="email"
                label={i18n('entities.message.fields.email')}
                required={true}
              />
            </div>

            <div className="col-lg-7 col-md-8 col-12">
              <InputFormItem
                name="subject"
                label={i18n('entities.message.fields.subject')}
                required={true}
              />
            </div>

            <div className="col-lg-12 col-md-12 col-12">
              <InputFormItem
                name="content"
                label={i18n('entities.message.fields.content')}
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

export default MessageForm;
