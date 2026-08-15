import { createSelector } from 'reselect';

const selectRaw = (state) => state.rules.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const rulesDestroySelectors = {
  selectLoading,
};

export default rulesDestroySelectors;
