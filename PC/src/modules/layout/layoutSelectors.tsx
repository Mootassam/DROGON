import { createSelector } from 'reselect';

const selectRaw = (state) => state.layout;

const selectMenuVisible = createSelector(
  [selectRaw],
  (layout) => Boolean(layout.menuVisible),
);

const selectSubMenu = createSelector(
  [selectRaw],
  (layout) => Boolean(layout.subMenue),
);

const selectPath = createSelector(
  [selectRaw],
  (layout) => layout.index,
);
const selectLoading = createSelector(
  [selectRaw],
  (layout) => Boolean(layout.loading),
);

const selectLanguage = createSelector(
  [selectRaw],
  (layout) => layout.language,
);

const layoutSelectors = {
  selectRaw,
  selectMenuVisible,
  selectPath,
  selectLoading,
  selectLanguage,
  selectSubMenu,
};

export default layoutSelectors;
