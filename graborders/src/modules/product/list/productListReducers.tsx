import actions from 'src/modules/product/list/productListActions';

const INITIAL_PAGE_SIZE = 10;

const initialData = {
  rows: {},
  loading: false,
  filter: {},
  rawFilter: {},
  pagination: {
    current: 1,
    pageSize: INITIAL_PAGE_SIZE,
  },
  sorter: {},
  selectedKeys: [] as Array<string>,
  loadingnews: false, 
  news:[]

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
      rows: payload,
      
    };
  }

  if (type === actions.FETCH_ERROR) {
    return {
      ...state,
      loading: false,
      rows: {},

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



  if (type === actions.FIND_STARTED) {
    return {
      ...state,
      loading: true,

      
    };
  }


  if (type === actions.FIND_SUCCESS) {
    return {
      ...state,
      loading: false,
      rows: payload,
      
    };
  }


  if (type === actions.FIND_ERROR) {
    return {
      ...state,
      loading: false,
      
    };
}





if (type === actions.NEWS_STARTED) {
  return {
    ...state,
    loadingnews: true,

    
  };
}


if (type === actions.NEWS_SUCCESS) {
  return {
    ...state,
    loadingnews: false,
    news: payload,
    
  };
}


if (type === actions.NEWS_ERROR) {
  return {
    ...state,
    loadingnews: false,
    
  };
}





  return state;
};
