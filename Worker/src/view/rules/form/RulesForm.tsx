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
import SwitchFormItem from 'src/view/shared/form/items/SwitchFormItem';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import categoryEnumerators from 'src/modules/rules/rulesEnumerators';
import Storage from 'src/security/storage';
import ImagesFormItem from 'src/view/shared/form/items/ImagesFormItem';
import TextAreaFormItem from 'src/view/shared/form/items/TextAreaFormItem';

const schema = yup.object().shape({
  name: yupFormSchemas.string(
    i18n('entities.category.fields.name'),
    {},
  ),
  slug: yupFormSchemas.string(
    i18n('entities.category.fields.slug'),
    {},
  ),
  photo: yupFormSchemas.images(
    i18n('entities.category.fields.photo'),
    {},
  ),
  metaKeywords: yupFormSchemas.string(
    i18n('entities.category.fields.metaKeywords'),
    {},
  ),
  metaDescriptions: yupFormSchemas.string(
    i18n('entities.category.fields.metaDescriptions'),
    {},
  ),
  status: yupFormSchemas.enumerator(
    i18n('entities.category.fields.status'),
    {
      options: categoryEnumerators.status,
    },
  ),
  isFeature: yupFormSchemas.boolean(
    i18n('entities.category.fields.isFeature'),
    {},
  ),
  serial: yupFormSchemas.integer(
    i18n('entities.category.fields.serial'),
    {},
  ),
});

function RulesForm
  (props) {
  const [initialValues] = useState(() => {
    const record = props.record || {};

    return {
      question: record.question,
      description: record.description,
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
                name="question"
                label={i18n(
                  'entities.category.fields.question',
                )}
                required={false}
                autoFocus
              />
            </div>

            <div className="col-lg-7 col-md-8 col-12">
              <TextAreaFormItem
                name="description"
                label={i18n(
                  'entities.category.fields.description',
                )}
                required={false}
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

export default RulesForm;
