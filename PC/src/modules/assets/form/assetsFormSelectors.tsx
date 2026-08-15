import { createSelector } from 'reselect';

const selectRaw = (state) => state.assets.form;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectInitLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.initLoading),
);

const selectSaveLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.saveLoading),
);



const selectModal = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.showModal),
);

const couponsFormSelectors = {
  selectInitLoading,
  selectSaveLoading,
  selectRecord,
  selectModal,
  selectRaw,
};

export default couponsFormSelectors;