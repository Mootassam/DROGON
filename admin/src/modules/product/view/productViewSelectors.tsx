import { createSelector } from 'reselect';

const selectRaw = (state) => state.product.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const couponsViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default couponsViewSelectors;
