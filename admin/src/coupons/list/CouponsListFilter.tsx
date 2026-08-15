import { i18n } from 'src/i18n';
import actions from 'src/modules/coupons/list/couponsListActions';
import selectors from 'src/modules/coupons/list/couponsListSelectors';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';
import yupFilterSchemas from 'src/modules/shared/yup/yupFilterSchemas';
import ButtonIcon from 'src/view/shared/ButtonIcon';
import FilterWrapper from 'src/view/shared/styles/FilterWrapper';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import FilterPreview from 'src/view/shared/filter/FilterPreview';
import filterRenders from 'src/modules/shared/filter/filterRenders';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import InputRangeFormItem from 'src/view/shared/form/items/InputRangeFormItem';
import InputNumberRangeFormItem from 'src/view/shared/form/items/InputNumberRangeFormItem';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import couponsEnumerators from 'src/modules/coupons/couponsEnumerators';

const schema = yup.object().shape({
  title: yupFilterSchemas.string(
    i18n('entities.coupons.fields.title'),
  ),
  codeName: yupFilterSchemas.string(
    i18n('entities.coupons.fields.codeName'),
  ),
  discountRange: yupFilterSchemas.decimalRange(
    i18n('entities.coupons.fields.discountRange'),
  ),
  noOfTimesRange: yupFilterSchemas.integerRange(
    i18n('entities.coupons.fields.noOfTimesRange'),
  ),
  status: yupFilterSchemas.enumerator(
    i18n('entities.coupons.fields.status'),
  ),
});

const emptyValues = {
  title: null,
  codeName: null,
  discountRange: [],
  noOfTimesRange: [],
  status: null,
};

const previewRenders = {
  title: {
    label: i18n('entities.coupons.fields.title'),
    render: filterRenders.generic(),
  },
  codeName: {
    label: i18n('entities.coupons.fields.codeName'),
    render: filterRenders.generic(),
  },
  discountRange: {
    label: i18n('entities.coupons.fields.discountRange'),
    render: filterRenders.decimalRange(),
  },
  noOfTimesRange: {
    label: i18n('entities.coupons.fields.noOfTimesRange'),
    render: filterRenders.range(),
  },
  status: {
    label: i18n('entities.coupons.fields.status'),
    render: filterRenders.enumerator(
      'entities.coupons.enumerators.status',
    ),
  },
};

function CouponsListFilter(props) {
  const rawFilter = useSelector(selectors.selectRawFilter);
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);

  const [initialValues] = useState(() => {
    return {
      ...emptyValues,
      ...rawFilter,
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
    mode: 'all',
  });

  useEffect(() => {
    dispatch(
      actions.doFetch(
        schema.cast(initialValues),
        rawFilter,
      ),
    );
    // eslint-disable-next-line
  }, [dispatch]);

  const onSubmit = (values) => {
    const rawValues = form.getValues();
    dispatch(actions.doFetch(values, rawValues));
    setExpanded(false);
  };

  const onRemove = (key) => {
    form.setValue(key, emptyValues[key]);
    return form.handleSubmit(onSubmit)();
  };

  const onReset = () => {
    Object.keys(emptyValues).forEach((key) => {
      form.setValue(key, emptyValues[key]);
    });
    dispatch(actions.doReset());
    setExpanded(false);
  };

  return (
    <FilterWrapper>
      <FilterPreview
        onClick={() => {
          setExpanded(!expanded);
        }}
        renders={previewRenders}
        values={rawFilter}
        expanded={expanded}
        onRemove={onRemove}
      />
      <div className="container">
        <div
          className={`collapse ${expanded ? 'show' : ''}`}
        >
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-lg-6 col-12">
                  <InputFormItem
                    name="title"
                    label={i18n(
                      'entities.coupons.fields.title',
                    )}
                  />
                </div>
                <div className="col-lg-6 col-12">
                  <InputFormItem
                    name="codeName"
                    label={i18n(
                      'entities.coupons.fields.codeName',
                    )}
                  />
                </div>
                <div className="col-lg-6 col-12">
                  <InputRangeFormItem
                    name="discountRange"
                    label={i18n(
                      'entities.coupons.fields.discountRange',
                    )}
                  />
                </div>
                <div className="col-lg-6 col-12">
                  <InputNumberRangeFormItem
                    name="noOfTimesRange"
                    label={i18n(
                      'entities.coupons.fields.noOfTimesRange',
                    )}
                  />
                </div>
                <div className="col-lg-6 col-12">
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
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-12 filter-buttons">
                  <button
                    className="btn btn-primary"
                    type="submit"
                    disabled={props.loading}
                  >
                    <ButtonIcon
                      loading={props.loading}
                      iconClass="fas fa-search"
                    />
                    {i18n('common.search')}
                  </button>
                  <button
                    className="btn btn-light"
                    type="button"
                    onClick={onReset}
                    disabled={props.loading}
                  >
                    <ButtonIcon
                      loading={props.loading}
                      iconClass="fas fa-undo"
                    />
                    {i18n('common.reset')}
                  </button>
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </FilterWrapper>
  );
}

export default CouponsListFilter;
