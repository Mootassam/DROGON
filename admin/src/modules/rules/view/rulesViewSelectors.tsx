import { createSelector } from 'reselect';

const selectRaw = (state) => state.rules.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const rulesViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default rulesViewSelectors;
