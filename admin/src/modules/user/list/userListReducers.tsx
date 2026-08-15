import actions from 'src/modules/user/list/userListActions';

const INITIAL_PAGE_SIZE = 10;

const initialData = {
  rows: [] as Array<any>,
  count: 0,
  loading: false,
  totaldepoist: 0,
  totalwithdraw: 0,

  kyc: 0,
  deposit: 0,
  future: 0,
  withdraw: 0,

  allnotif: [],
  totalUsers: 0,
  notifications: {}, // Add this line to store the notification data
  filter: {},
  rawFilter: {},
  pagination: {
    current: 1,
    pageSize: INITIAL_PAGE_SIZE,
  },
  sorter: {},
  selectedKeys: [] as Array<any>,
};

export default (
  state = initialData,
  { type, payload, kyc, deposit, future, withdraw },
) => {
  if (type === actions.RESETED) {
    return {
      ...initialData,
    };
  }

  if (type === actions.TOGGLE_ONE_SELECTED) {
    let selectedKeys = state.selectedKeys;

    const exists = selectedKeys.includes(payload);

    if (exists) {
      selectedKeys = selectedKeys.filter(
        (key) => key !== payload,
      );
    } else {
      selectedKeys = [payload, ...selectedKeys];
    }

    return {
      ...state,
      selectedKeys,
    };
  }

  if (type === actions.TOGGLE_ALL_SELECTED) {
    const isAllSelected =
      (state.rows || []).length ===
      (state.selectedKeys || []).length;

    return {
      ...state,
      selectedKeys: isAllSelected
        ? []
        : state.rows.map((row) => row.id),
    };
  }

  if (type === actions.CLEAR_ALL_SELECTED) {
    return {
      ...state,
      selectedKeys: [],
    };
  }

  if (type === actions.PAGINATION_CHANGED) {
    return {
      ...state,
      pagination: payload || {
        current: 1,
        pageSize: INITIAL_PAGE_SIZE,
      },
    };
  }

  if (type === actions.SORTER_CHANGED) {
    return {
      ...state,
      sorter: payload || {},
    };
  }

  if (type === actions.FETCH_STARTED) {
    return {
      ...state,
      loading: true,
      selectedKeys: [],
      filter: payload ? payload.filter : {},
      rawFilter: payload ? payload.rawFilter : {},
      pagination:
        payload && payload.keepPagination
          ? state.pagination
          : {
              current: 1,
              pageSize: INITIAL_PAGE_SIZE,
            },
    };
  }

  if (type === actions.FETCH_SUCCESS) {
    return {
      ...state,
      loading: false,
      rows: payload.rows,
      count: payload.count,
    };
  }

  if (type === actions.FETCH_ERROR) {
    return {
      ...state,
      loading: false,
      rows: [],
      count: 0,
    };
  }

  if (type === actions.EXPORT_STARTED) {
    return {
      ...state,
      countLoading: true,
    };
  }

  if (type === actions.EXPORT_SUCCESS) {
    return {
      ...state,
      countLoading: false,
    };
  }

  if (type === actions.EXPORT_ERROR) {
    return {
      ...state,
      countLoading: false,
    };
  }

  if (type === actions.DCOUNT_STARTED) {
    return {
      ...state,
      countLoading: true,
    };
  }

  if (type === actions.DCOUNT_SUCCESS) {
    return {
      ...state,
      totaldepoist: payload,
      countLoading: false,
    };
  }

  if (type === actions.DCOUNT_ERROR) {
    return {
      ...state,
      countLoading: false,
    };
  }

  if (type === actions.COUNT_STARTED) {
    return {
      ...state,
      countLoading: true,
    };
  }

  if (type === actions.COUNT_SUCCESS) {
    return {
      ...state,
      totalUsers: payload,
      countLoading: false,
    };
  }

  if (type === actions.COUNT_ERROR) {
    return {
      ...state,
      countLoading: false,
    };
  }

  if (type === actions.NOTIFICATION_STARTED) {
    return {
      ...state,
      countLoading: true,
    };
  }

  if (type === actions.NOTIFICATION_SUCCESS) {

    
    return {
      ...state,
      kyc: kyc,
      deposit: deposit,
      future: future,
      withdraw: withdraw,
      countLoading: false,
    };
  }

  if (type === actions.NOTIFICATION_ERROR) {
    return {
      ...state,
      countLoading: false,
    };
  }

  if (type === actions.WCOUNT_STARTED) {
    return {
      ...state,
      countLoading: true,
    };
  }

  if (type === actions.WCOUNT_SUCCESS) {
    return {
      ...state,
      totalwithdraw: payload,
      countLoading: false,
    };
  }

  if (type === actions.WCOUNT_ERROR) {
    return {
      ...state,
      countLoading: false,
    };
  }

  if (type === actions.DESTROY_ALL_SELECTED_STARTED) {
    return {
      ...state,
      loading: true,
    };
  }

  if (type === actions.DESTROY_ALL_SELECTED_ERROR) {
    return {
      ...state,
      loading: false,
    };
  }

  if (type === actions.DESTROY_ALL_SELECTED_SUCCESS) {
    return {
      ...state,
      selectedKeys: [],
    };
  }

  if (type === actions.DESTROY_STARTED) {
    return {
      ...state,
      loading: true,
    };
  }

  if (type === actions.DESTROY_ERROR) {
    return {
      ...state,
      loading: false,
    };
  }

  if (type === actions.DESTROY_SUCCESS) {
    return {
      ...state,
      selectedKeys: [],
    };
  }

  return state;
};
