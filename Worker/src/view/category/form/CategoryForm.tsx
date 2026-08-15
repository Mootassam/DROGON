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
import categoryEnumerators from 'src/modules/category/categoryEnumerators';
import Storage from 'src/security/storage';
import ImagesFormItem from 'src/view/shared/form/items/ImagesFormItem';

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

function CategoryForm(props) {
  const [initialValues] = useState(() => {
    const record = props.record || {};

    return {
      name: record.name,
      number: record.number,
      type: record.type,
      slug: record.slug,
      photo: record.photo || [],
      metaKeywords: record.metaKeywords,
      metaDescriptions: record.metaDescriptions,
      status: record.status,
      isFeature: record.isFeature,
      serial: record.serial,
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
              <SelectFormItem
                name="type"
                label={i18n(
                  'entities.category.fields.type',
                )}
                options={categoryEnumerators.type.map(
                  (value) => ({
                    value,
                    label: i18n(
                      `entities.category.enumerators.type.${value}`,
                    ),
                  }),
                )}
                required={false}
              />
            </div>
            <div className="col-lg-7 col-md-8 col-12">
              <ImagesFormItem
                name="photo"
                label={i18n(
                  'entities.category.fields.photo',
                )}
                required={false}
                storage={Storage.values.categoryPhoto}
                max={undefined}
              />
            </div>
            <div className="col-lg-7 col-md-8 col-12">
              <InputFormItem
                name="name"
                label={i18n(
                  'entities.category.fields.name',
                )}
                required={false}
                autoFocus
              />
            </div>
            <div className="col-lg-7 col-md-8 col-12">
              <InputFormItem
                name="number"
                label={i18n(
                  'entities.category.fields.slug',
                )}
                required={false}
              />
            </div>

            {/* <div className="col-lg-7 col-md-8 col-12">
              <SwitchFormItem
                name="isFeature"
                label={i18n(
                  'entities.category.fields.isFeature',
                )}
              />
            </div> */}
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

export default CategoryForm;
