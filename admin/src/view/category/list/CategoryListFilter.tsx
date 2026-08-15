import { i18n } from 'src/i18n';
import actions from 'src/modules/category/list/categoryListActions';
import selectors from 'src/modules/category/list/categoryListSelectors';
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


const schema = yup.object().shape({
  name: yupFilterSchemas.string(
    i18n('entities.category.fields.name'),
  ),
  slug: yupFilterSchemas.string(
    i18n('entities.category.fields.slug'),
  ),
  metaKeywords: yupFilterSchemas.string(
    i18n('entities.category.fields.metaKeywords'),
  ),
  metaDescriptions: yupFilterSchemas.string(
    i18n('entities.category.fields.metaDescriptions'),
  ),
  status: yupFilterSchemas.enumerator(
    i18n('entities.category.fields.status'),
  ),
  isFeature: yupFilterSchemas.boolean(
    i18n('entities.category.fields.isFeature'),
  ),
});

const emptyValues = {
  name: null,
  slug: null,
  metaKeywords: null,
  metaDescriptions: null,
  status: null,
  isFeature: null,
};

const previewRenders = {
  name: {
    label: i18n('entities.category.fields.name'),
    render: filterRenders.generic(),
  },
  slug: {
    label: i18n('entities.category.fields.slug'),
    render: filterRenders.generic(),
  },
  metaKeywords: {
    label: i18n('entities.category.fields.metaKeywords'),
    render: filterRenders.generic(),
  },
  metaDescriptions: {
    label: i18n(
      'entities.category.fields.metaDescriptions',
    ),
    render: filterRenders.generic(),
  },
  status: {
    label: i18n('entities.category.fields.status'),
    render: filterRenders.enumerator(
      'entities.category.enumerators.status',
    ),
  },
  isFeature: {
    label: i18n('entities.category.fields.isFeature'),
    render: filterRenders.boolean(),
  },
};

function CategoryListFilter(props) {
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
                    name="name"
                    label={i18n(
                      'entities.category.fields.name',
                    )}
                  />
                </div>
                <div className="col-lg-6 col-12">
                  <InputFormItem
                    name="slug"
                    label={i18n(
                      'entities.category.fields.slug',
                    )}
                  />
                </div>
                {/* <div className="col-lg-6 col-12">
                  <InputFormItem
                    name="metaKeywords"
                    label={i18n(
                      'entities.category.fields.metaKeywords',
                    )}
                  />
                </div> */}
                {/* <div className="col-lg-6 col-12">
                  <InputFormItem
                    name="metaDescriptions"
                    label={i18n(
                      'entities.category.fields.metaDescriptions',
                    )}
                  />
                </div>
                <div className="col-lg-6 col-12">
                  <SelectFormItem
                    name="status"
                    label={i18n(
                      'entities.category.fields.status',
                    )}
                    options={categoryEnumerators.status.map(
                      (value) => ({
                        value,
                        label: i18n(
                          `entities.category.enumerators.status.${value}`,
                        ),
                      }),
                    )}
                  />
                </div> */}
                {/* <div className="col-lg-6 col-12">
                  <SelectFormItem
                    name="isFeature"
                    label={i18n(
                      'entities.category.fields.isFeature',
                    )}
                    options={[
                      {
                        value: true,
                        label: i18n('common.yes'),
                      },
                      {
                        value: false,
                        label: i18n('common.no'),
                      },
                    ]}
                  />
                </div> */}
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

export default CategoryListFilter;
