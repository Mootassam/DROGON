import { createSelector } from 'reselect';

const selectRaw = (state) => state.record.form;

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

const selectShowTime = createSelector([selectRaw], (raw) => Boolean(raw.showtime));
const selectShowProfit = createSelector([selectRaw], (raw) => Boolean(raw.showprofit))

const selectError  = createSelector([selectRaw], raw => raw.error); 
const selectTime =  createSelector([selectRaw], raw => raw.time)
const selectProfit =  createSelector([selectRaw], raw => raw.profit)





const recordFormSelectors = {
  selectInitLoading,
  selectSaveLoading,
  selectRecord,
  selectError,
  selectShowTime,
  selectTime,
  selectProfit,
  selectShowProfit,
  selectRaw,
};

export default recordFormSelectors;