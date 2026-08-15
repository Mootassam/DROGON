import { createSelector } from 'reselect';
import authSelectors from 'src/modules/auth/authSelectors';
import PermissionChecker from 'src/modules/auth/permissionChecker';
import Permissions from 'src/security/permissions';

const selectPermissionToRead = createSelector(
  [
    authSelectors.selectCurrentTenant,
    authSelectors.selectCurrentUser,
  ],
  (currentTenant, currentUser) =>
    new PermissionChecker(currentTenant, currentUser).match(
      Permissions.values.categoryRead,
    ),
);

const selectPermissionToEdit = createSelector(
  [
    authSelectors.selectCurrentTenant,
    authSelectors.selectCurrentUser,
  ],
  (currentTenant, currentUser) =>
    new PermissionChecker(currentTenant, currentUser).match(
      Permissions.values.categoryRead,
    ),
);

const selectPermissionToCreate = createSelector(
  [
    authSelectors.selectCurrentTenant,
    authSelectors.selectCurrentUser,
  ],
  (currentTenant, currentUser) =>
    new PermissionChecker(currentTenant, currentUser).match(
      Permissions.values.categoryRead,
    ),
);

const selectPermissionToImport = createSelector(
  [
    authSelectors.selectCurrentTenant,
    authSelectors.selectCurrentUser,
  ],
  (currentTenant, currentUser) =>
    new PermissionChecker(currentTenant, currentUser).match(
      Permissions.values.categoryRead,
    ),
);

const selectPermissionToDestroy = createSelector(
  [
    authSelectors.selectCurrentTenant,
    authSelectors.selectCurrentUser,
  ],
  (currentTenant, currentUser) =>
    new PermissionChecker(currentTenant, currentUser).match(
      Permissions.values.categoryRead,
    ),
);

// KYC Status selectors
const VERIFICATION_STATUS = {
  PENDING: 'pending',
  SUCCESS: 'success',
  UNVERIFIED: 'unverified',
};

const selectKycListRows = createSelector(
  [state => state.kyc.list],
  (kycList) => kycList.rows,
);

const selectKycStatus = createSelector(
  [selectKycListRows, authSelectors.selectCurrentUser],
  (rows, currentUser) => {
    if (!currentUser) {
      return VERIFICATION_STATUS.UNVERIFIED;
    }

    // Check if user has KYC verified field
    if (currentUser.kyc) {
      return VERIFICATION_STATUS.SUCCESS;
    }

    // Check KYC list for pending submissions
    if (rows && rows.length > 0) {
      const latestKyc = rows[0];
      if (latestKyc.status === VERIFICATION_STATUS.PENDING) {
        return VERIFICATION_STATUS.PENDING;
      }
    }

    return VERIFICATION_STATUS.UNVERIFIED;
  },
);

const selectIsKycVerified = createSelector(
  [selectKycStatus],
  (kycStatus) => kycStatus === VERIFICATION_STATUS.SUCCESS,
);

const selectIsKycPending = createSelector(
  [selectKycStatus],
  (kycStatus) => kycStatus === VERIFICATION_STATUS.PENDING,
);

const selectIsKycUnverified = createSelector(
  [selectKycStatus],
  (kycStatus) => kycStatus === VERIFICATION_STATUS.UNVERIFIED,
);

const couponsSelectors = {
  selectPermissionToRead,
  selectPermissionToEdit,
  selectPermissionToCreate,
  selectPermissionToDestroy,
  selectPermissionToImport,
  // KYC selectors
  selectKycListRows,
  selectKycStatus,
  selectIsKycVerified,
  selectIsKycPending,
  selectIsKycUnverified,
  VERIFICATION_STATUS,
};

export default couponsSelectors;
