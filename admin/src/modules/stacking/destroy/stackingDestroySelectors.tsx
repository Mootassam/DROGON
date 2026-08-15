import { createSelector } from 'reselect';

const selectRaw = (state) => state.vip.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const couponsDestroySelectors = {
  selectLoading,
};

export default couponsDestroySelectors;
