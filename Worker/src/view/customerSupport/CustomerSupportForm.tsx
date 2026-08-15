import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/settings/settingsActions';
import selectors from 'src/modules/settings/settingsSelectors';
import ButtonIcon from 'src/view/shared/ButtonIcon';
import RadioFormItem from 'src/view/shared/form/items/RadioFormItem';
import TextAreaFormItem from 'src/view/shared/form/items/TextAreaFormItem';
import FormWrapper from 'src/view/shared/styles/FormWrapper';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  contactMethod: yup
    .string()
    .oneOf(['livechat', 'category'])
    .label(i18n('customerSupport.fields.contactMethod'))
    .required(),
  liveChatCode: yup
    .string()
    .nullable(true)
    .label(i18n('customerSupport.fields.liveChatCode'))
    .when('contactMethod', {
      is: 'livechat',
      then: yup.string().required(),
      otherwise: yup.string().nullable(true),
    }),
});

function CustomerSupportForm(props) {
  const dispatch = useDispatch();

  const saveLoading = useSelector(
    selectors.selectSaveLoading,
  );

  const settings = props.settings;

  const [initialValues] = useState(() => {
    return {
      contactMethod:
        (settings && settings.contactMethod) || 'category',
      liveChatCode: (settings && settings.liveChatCode) || '',
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: initialValues,
  });

  const contactMethod = form.watch('contactMethod');

  const onSubmit = (values) => {
    dispatch(
      actions.doSave({
        ...(settings || {}),
        ...values,
      }),
    );
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
              <RadioFormItem
                name="contactMethod"
                label={i18n(
                  'customerSupport.fields.contactMethod',
                )}
                hint={i18n('customerSupport.contactMethod.hint')}
                required={true}
                options={[
                  {
                    value: 'livechat',
                    label: i18n(
                      'customerSupport.contactMethod.livechat',
                    ),
                  },
                  {
                    value: 'category',
                    label: i18n(
                      'customerSupport.contactMethod.category',
                    ),
                  },
                ]}
              />
            </div>

            <div className="col-lg-7 col-md-8 col-12">
              <TextAreaFormItem
                name="liveChatCode"
                label={i18n(
                  'customerSupport.fields.liveChatCode',
                )}
                hint={i18n('customerSupport.liveChat.hint')}
                required={contactMethod === 'livechat'}
              />
            </div>

            <div className="col-lg-7 col-md-8 col-12">
              <label className="col-form-label d-block">
                {i18n('customerSupport.contactMethod.category')}
              </label>
              <p className="text-muted">
                {i18n('customerSupport.category.hint')}
              </p>
              <Link to="/category" className="btn btn-light">
                <i className="fas fa-headset"></i>{' '}
                {i18n('customerSupport.category.manage')}
              </Link>
            </div>
          </div>

          <div className="form-buttons">
            <button
              className="btn btn-primary"
              disabled={saveLoading}
              type="button"
              onClick={form.handleSubmit(onSubmit)}
            >
              <ButtonIcon
                loading={saveLoading}
                iconClass="far fa-save"
              />
              {i18n('common.save')}
            </button>

            <button
              disabled={saveLoading}
              onClick={onReset}
              className="btn btn-light"
              type="button"
            >
              <i className="fas fa-undo"></i>
              {i18n('common.reset')}
            </button>
          </div>
        </form>
      </FormProvider>
    </FormWrapper>
  );
}

export default CustomerSupportForm;
