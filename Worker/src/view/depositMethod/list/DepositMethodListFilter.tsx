import { i18n } from 'src/i18n';
import actions from 'src/modules/depositMethod/list/depositMethodListActions';
import selectors from 'src/modules/depositMethod/list/depositMethodSelectors';
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
import UserAutocompleteFormItem from 'src/view/user/autocomplete/UserAutocompleteFormItem';


const schema = yup.object().shape({
  user: yupFilterSchemas.relationToOne(
    i18n('entities.transaction.fields.user'),
  ),
  idnumber: yupFilterSchemas.decimal(
    i18n('entities.stackingPlan.fields.idnumber'),
  ),
 });

const emptyValues = {
user: null,
  levellimit: null,
};

const previewRenders = {
 user: {
    label: i18n('entities.transaction.fields.user'),
    render: filterRenders.relationToOne(),
  },
  idnumer: {
    label: i18n('entities.stackingPlan.fields.idnumer'),
    render: filterRenders.decimal(),
  },

};

function StackingPlanListFilter(props) {
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
    <>
      
    </>
  );
}

export default StackingPlanListFilter;
