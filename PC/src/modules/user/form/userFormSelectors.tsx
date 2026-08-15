import { createSelector } from "reselect";

const selectRaw = (state) => state.user.form;

const selectUser = createSelector([selectRaw], (raw) => raw.user);

const listMembers = createSelector([selectRaw], (raw) => raw.member);
const loading = createSelector([selectRaw], (raw) => raw.loading);
const reward = createSelector([selectRaw], (raw) => raw.reward);

const lisUsers = createSelector([selectRaw], (raw) => raw.users);
const usersLoading = createSelector([selectRaw], (raw) => raw.listLoading);

const selectInitLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.initLoading)
);

const selectSaveLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.saveLoading)
);

const userFormSelectors = {
  selectInitLoading,
  selectSaveLoading,
  selectUser,
  listMembers,
  loading,
  reward,
  lisUsers,
  usersLoading,
  selectRaw,
};

export default userFormSelectors;
