import actions from 'src/modules/record/list/recordListActions';

const INITIAL_PAGE_SIZE = 10;

const initialData = {
  rows: [] as Array<any>,
  count: 0,
  counts: 0,
  total: 0,
  loading: false,
  loadingday: false,
  countsday: 0,
  filter: {},
  rawFilter: {},
  pagination: {
    current: 1,
    pageSize: INITIAL_PAGE_SIZE,
  },
  sorter: {},
  selectedKeys: [] as Array<string>,
  error: ""
};

export default (state = initialData, { type, payload }) => {
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
      total : payload.total,
    };
  }

  if (type === actions.FETCH_ERROR) {
    return {
      ...state,
      loading: false,
      rows: [],
      count: 0,
      total : 0,
    };
  }


  if (type === actions.CHECK_STARTED) {
    return {
      ...state,
      loading: true,
    };
  }

  if (type === actions.CHECK_SUCCESS) {
    return {
      ...state,
      loading: false,

    };
  }

  if (type === actions.CHECK_ERROR) {
    return {
      ...state,
      loading: false,
      error: payload
      
    
    };
  }




  if (type === actions.COUNT_STARTED) {
    return {
      ...state,
      loading: true,
      counts : 0
    };
  }

  if (type === actions.COUNT_SUCCESS) {

    return {
      ...state,
      loading: false,
      counts : payload.count

    };
  }

  if (type === actions.COUNT_ERROR) {
    return {
      ...state,
      loading: false,
      counts : 0
      
    
    };
  }



  if (type === actions.COUNTDAY_STARTED) {
    return {
      ...state,
      loadingday: true,
      countsday : 0
    };
  }

  if (type === actions.COUNTDAY_SUCCESS) {

    return {
      ...state,
      loadingday: false,
      countsday : payload.count

    };
  }

  if (type === actions.COUNTDAY_ERROR) {
    return {
      ...state,
      loadingday: false,
      countsday : 0
      
    
    };
  }



  if (type === actions.EXPORT_STARTED) {
    return {
      ...state,
      exportLoading: true,
    };
  }

  if (type === actions.EXPORT_SUCCESS) {
    return {
      ...state,
      exportLoading: false,
    };
  }

  if (type === actions.EXPORT_ERROR) {
    return {
      ...state,
      exportLoading: false,
    };
  }

  return state;
};