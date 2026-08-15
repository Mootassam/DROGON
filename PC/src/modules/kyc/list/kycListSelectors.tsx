import { createSelector } from 'reselect';

const selectRaw = (state) => state.kyc.list;

const selectLoading = createSelector(
  [selectRaw],
  (raw) => raw.loading,
);

const selectExportLoading = createSelector(
  [selectRaw],
  (raw) => raw.exportLoading,
);

const selectRows = createSelector(
  [selectRaw],
  (raw) => raw.rows,
);

const selectCount = createSelector(
  [selectRaw],
  (raw) => raw.count,
);

const selectHasRows = createSelector(
  [selectCount],
  (count) => count > 0,
);

const selectSorter = createSelector(
  [selectRaw],
  (raw) => raw.sorter || {},
);

const selectOrderBy = createSelector([selectRaw], (raw) => {
  const sorter = raw.sorter;

  if (!sorter) {
    return null;
  }

  if (!sorter.field) {
    return null;
  }

  let direction =
    sorter.order === 'descend' ? 'DESC' : 'ASC';

  return `${sorter.field}_${direction}`;
});

const selectFilter = createSelector([selectRaw], (raw) => {
  return raw.filter;
});

const selectRawFilter = createSelector(
  [selectRaw],
  (raw) => {
    return raw.rawFilter;
  },
);

const selectLimit = createSelector([selectRaw], (raw) => {
  const pagination = raw.pagination;
  return pagination.pageSize;
});

const selectOffset = createSelector([selectRaw], (raw) => {
  const pagination = raw.pagination;

  if (!pagination || !pagination.pageSize) {
    return 0;
  }

  const current = pagination.current || 1;

  return (current - 1) * pagination.pageSize;
});

const selectPagination = createSelector(
  [selectRaw, selectCount],
  (raw, count) => {
    return {
      ...raw.pagination,
      total: count,
    };
  },
);

const selectSelectedKeys = createSelector(
  [selectRaw],
  (raw) => {
    return raw.selectedKeys;
  },
);

const selectSelectedRows = createSelector(
  [selectRaw, selectRows],
  (raw, rows) => {
    return rows.filter((row) =>
      raw.selectedKeys.includes(row.id),
    );
  },
);

const selectIsAllSelected = createSelector(
  [selectRows, selectSelectedKeys],
  (rows, selectedKeys) => {
    return rows.length === selectedKeys.length;
  },
);

// KYC Status selectors
const VERIFICATION_STATUS = {
  PENDING: 'pending',
  SUCCESS: 'success',
  UNVERIFIED: 'unverified',
};

const selectKycStatus = createSelector(
  [selectRows, (state) => state.auth.currentUser],
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

const couponsListSelectors = {
  selectLoading,
  selectRows,
  selectCount,
  selectOrderBy,
  selectLimit,
  selectFilter,
  selectOffset,
  selectPagination,
  selectSelectedKeys,
  selectSelectedRows,
  selectHasRows,
  selectExportLoading,
  selectRawFilter,
  selectIsAllSelected,
  selectSorter,
  // KYC status selectors
  selectKycStatus,
  selectIsKycVerified,
  selectIsKycPending,
  selectIsKycUnverified,
  VERIFICATION_STATUS,
};

export default couponsListSelectors;
