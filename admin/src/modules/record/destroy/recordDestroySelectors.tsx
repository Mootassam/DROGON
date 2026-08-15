import { createSelector } from 'reselect';

const selectRaw = (state) => state.record.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const couponsDestroySelectors = {
  selectLoading,
};

export default couponsDestroySelectors;
