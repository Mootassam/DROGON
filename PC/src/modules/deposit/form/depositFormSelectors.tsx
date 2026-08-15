import { createSelector } from 'reselect';

const selectRaw = (state) => state.deposit.form;

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

const selectDepositModal = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.depositModal),
);




const couponsFormSelectors = {
  selectInitLoading,
  selectSaveLoading,
  selectRecord,
  selectDepositModal,
  selectRaw,
};

export default couponsFormSelectors;