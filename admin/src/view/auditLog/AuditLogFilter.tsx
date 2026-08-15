import { useForm, FormProvider } from 'react-hook-form';
import actions from 'src/modules/auditLog/auditLogActions';
import selectors from 'src/modules/auditLog/auditLogSelectors';
import { i18n } from 'src/i18n';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import DatePickerRangeFormItem from 'src/view/shared/form/items/DatePickerRangeFormItem';
import TagsFormItem from 'src/view/shared/form/items/TagsFormItem';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import ButtonIcon from 'src/view/shared/ButtonIcon';
import FilterWrapper from 'src/view/shared/styles/FilterWrapper';
import yupFilterSchemas from 'src/modules/shared/yup/yupFilterSchemas';
import * as yup from 'yup';
import queryString from 'query-string';
import { yupResolver } from '@hookform/resolvers/yup';
import FilterPreview from 'src/view/shared/filter/FilterPreview';
import filterRenders from 'src/modules/shared/filter/filterRenders';
import UserAutocompleteFormItem from 'src/view/user/autocomplete/UserAutocompleteFormItem';

const schema = yup.object().shape({
  
  user: yupFilterSchemas.relationToOne(
    i18n('auditLog.fields.user'),
  ),
});

const emptyValues = {

  user: null,
};

const previewRenders = {
 
  user: {
    label: i18n('auditLog.fields.user'),
    render: filterRenders.relationToOne(),
  },
};

function AuditLogFilter(props) {
  const rawFilter = useSelector(selectors.selectRawFilter);
  const dispatch = useDispatch();
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);

  const [initialValues] = useState(() => {
    const initialValues = {
      ...emptyValues,
      ...rawFilter,
    };

    const queryFilters = queryString.parse(location.search);

    // Handle entityNames from URL query params
    initialValues.entityNames =
      queryFilters.entityNames || initialValues.entityNames;
    if (
      initialValues.entityNames &&
      !Array.isArray(initialValues.entityNames)
    ) {
      initialValues.entityNames = [
        initialValues.entityNames,
      ];
    }

    // Handle entityId from URL query params
    initialValues.entityId =
      queryFilters.entityId || initialValues.entityId;

    // Handle action from URL query params
    initialValues.action =
      queryFilters.action || initialValues.action;

    // Handle user from URL query params
    initialValues.user =
      queryFilters.user || initialValues.user;

    // Handle timestampRange from URL query params
    if (queryFilters.timestampFrom || queryFilters.timestampTo) {
      initialValues.timestampRange = [
        queryFilters.timestampFrom || null,
        queryFilters.timestampTo || null,
      ];
    }

    return initialValues;
  });

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
    mode: 'onSubmit',
  });

  useEffect(() => {
    dispatch(
      actions.doFetch(
        schema.cast(initialValues),
        rawFilter,
      ),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const onSubmit = (values) => {
    const rawValues = form.getValues();
    dispatch(actions.doFetch(values, rawValues));
    setExpanded(false);
  };

  const onReset = () => {
    Object.keys(emptyValues).forEach((key) => {
      form.setValue(key, emptyValues[key]);
    });
    dispatch(actions.doReset());
    setExpanded(false);
  };

  const onRemove = (key) => {
    form.setValue(key, emptyValues[key]);
    return form.handleSubmit(onSubmit)();
  };

  const { loading } = props;

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
                  <UserAutocompleteFormItem
                    name="user"
                    label={i18n(
                      'auditLog.fields.createdByEmail',
                    )}
                  />
                </div>
              </div>
             
    
              <div className="row">
                <div className="col-12 filter-buttons">
                  <button
                    className="btn btn-primary"
                    type="submit"
                    disabled={loading}
                  >
                    <ButtonIcon
                      loading={loading}
                      iconClass="fas fa-search"
                    />
                    {i18n('common.search')}
                  </button>
                  <button
                    className="btn btn-light"
                    type="button"
                    onClick={onReset}
                    disabled={loading}
                  >
                    <ButtonIcon
                      loading={loading}
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

export default AuditLogFilter;