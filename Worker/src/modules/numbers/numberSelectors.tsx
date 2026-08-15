import { createSelector } from 'reselect';
import { tenantSubdomain } from '../tenant/tenantSubdomain';
import _get from 'lodash/get';

const selectRaw = (state) => state.numbers;

const selectAuthenticationUser = createSelector(
  [selectRaw],
  (auth) => auth.authenticationUser,
);

const selectCurrentUser = createSelector(
  [selectRaw],
  (auth) => auth.currentUser,
);

const numberAdded = createSelector(
  [selectRaw],
  (state) => state.numberAdded,
);
const numberDuplicated = createSelector(
  [selectRaw],
  (state) => state.numberDuplicated,
);

const numberWrong = createSelector(
  [selectRaw],
  (state) => state.numberWrong,
);

const loading = createSelector(
  [selectRaw],
  (state) => state.loading,
);

const listduplicateNumber = createSelector(
  [selectRaw],
  (state) => state.listduplicateNumber,
);

const listwrongNumbers = createSelector(
  [selectRaw],
  (state) => state.listwrongNumbers,
);

const numberSelectors = {
  selectCurrentUser,
  selectAuthenticationUser,
  loading,
  numberAdded,
  numberDuplicated,
  numberWrong,
  listduplicateNumber,
  listwrongNumbers,
  selectRaw,
};

export default numberSelectors;
