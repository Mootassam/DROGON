import actions from 'src/modules/deposit/form/depositFormActions';

const initialData = {
  initLoading: false,
  saveLoading: false,
  depositModal: false,
  record: null,
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.INIT_STARTED) {
    return {
      ...state,
      record: null,
      initLoading: true,
    };
  }

  if (type === actions.INIT_SUCCESS) {
    return {
      ...state,
      record: payload,
      initLoading: false,
    };
  }

  if (type === actions.INIT_ERROR) {
    return {
      ...state,
      record: null,
      initLoading: false,
    };
  }



    if (type === actions.CLEAR_SUCCESS) {
    return {
      ...state,
      saveLoading: false,
        depositModal: false,
    };
  }

  
  if (type === actions.CREATE_STARTED) {
    return {
      ...state,
      saveLoading: true,
      depositModal: false,
    };
  }

  if (type === actions.CREATE_SUCCESS) {
    return {
      ...state,
      saveLoading: false,
        depositModal: true,
    };
  }





  
  if (type === actions.CREATE_ERROR) {
    return {
      ...state,
      saveLoading: false,
   depositModal: false,
    };
  }

  if (type === actions.UPDATE_STARTED) {
    return {
      ...state,
      saveLoading: true,
    };
  }

  if (type === actions.UPDATE_SUCCESS) {
    return {
      ...state,
      saveLoading: false,
    };
  }

  if (type === actions.UPDATE_ERROR) {
    return {
      ...state,
      saveLoading: false,
    };
  }

  return state;
};
