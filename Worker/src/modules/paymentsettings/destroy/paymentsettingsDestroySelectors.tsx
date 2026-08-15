import { createSelector } from 'reselect';

const selectRaw = (state) => state.paymentsettings.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const paymentsettingsDestroySelectors = {
  selectLoading,
};

export default paymentsettingsDestroySelectors;
