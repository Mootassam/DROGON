import { i18n } from 'src/i18n';
import actions from 'src/modules/transaction/list/transactionListActions';
import selectors from 'src/modules/transaction/list/transactionListSelectors';
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

import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import couponsEnumerators from 'src/modules/transaction/transactionEnumerators';
import UserAutocompleteFormItem from './../../user/autocomplete/UserAutocompleteFormItem';
import DatePickerRangeFormItem from './../../shared/form/items/DatePickerRangeFormItem';

const schema = yup.object().shape({
  user: yupFilterSchemas.relationToOne(
    i18n('entities.transaction.fields.user'),
  ),
  datetransaction: yupFilterSchemas.dateRange(
    i18n('entities.transaction.fields.datetransaction'),
  ),
  amount: yupFilterSchemas.integer(
    i18n('entities.transaction.fields.amount'),
  ),
  status: yupFilterSchemas.enumerator(
    i18n('entities.transaction.fields.status'),
  ),
  type: yupFilterSchemas.enumerator(
    i18n('entities.transaction.fields.type'),
  ),
});

const emptyValues = {
  user: null,
  datetransaction: [],
  amount: null,
  type: null,
  status: null,
};

const previewRenders = {
  user: {
    label: i18n('entities.transaction.fields.user'),
    render: filterRenders.relationToOne(),
  },
  amount: {
    label: i18n('entities.transaction.fields.amount'),
    render: filterRenders.decimal(),
  },
  datetransaction: {
    label: i18n('entities.transaction.fields.datetransaction'),
    render: filterRenders.dateRange(),
  },

  status: {
    label: i18n('entities.transaction.fields.status'),
    render: filterRenders.enumerator(
      'entities.transaction.enumerators.status',
    ),
  },

  type: {
    label: i18n('entities.transaction.fields.type'),
    render: filterRenders.enumerator(
      'entities.transaction.enumerators.type',
    ),
  },
};

function TransactionListFilter(props) {
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
                  <UserAutocompleteFormItem
                    name="user"
                    label={i18n(
                      'entities.transaction.fields.user',
                    )}
                  />
                </div>
                <div className="col-lg-6 col-12">
                  <InputFormItem
                    name="amount"
                    label={i18n(
                      'entities.transaction.fields.amount',
                    )}
                  />
                </div>

                <div className="col-lg-6 col-12">
                  <DatePickerRangeFormItem
                    name="datetransaction"
                    label={i18n(
                      'entities.transaction.fields.datetransaction',
                    )}
                  />
                </div>

                <div className="col-lg-6 col-12">
                  <SelectFormItem
                    name="status"
                    label={i18n(
                      'entities.transaction.fields.status',
                    )}
                    options={couponsEnumerators.status.map(
                      (value) => ({
                        value,
                        label: i18n(
                          `entities.transaction.enumerators.status.${value}`,
                        ),
                      }),
                    )}
                  />
                </div>

                <div className="col-lg-6 col-12">
                  <SelectFormItem
                    name="type"
                    label={i18n(
                      'entities.transaction.fields.type',
                    )}
                    options={couponsEnumerators.type.map(
                      (value) => ({
                        value,
                        label: i18n(
                          `entities.transaction.enumerators.type.${value}`,
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

export default TransactionListFilter;
