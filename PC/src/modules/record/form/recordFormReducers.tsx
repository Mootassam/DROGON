import { error } from 'console';
import actions from 'src/modules/record/form/recordFormActions';

const initialData = {
  initLoading: false,
  saveLoading: false,
  record: null,
  error:"",
  showtime: false ,
  showprofit: false ,
   time :60 ,
   profit:20
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

  if (type === actions.CREATE_STARTED) {
    return {
      ...state,
      saveLoading: true,
      error:null,
      showtime : false,
    
    };
  }

  if (type === actions.CREATE_SUCCESS) {
    return {
      ...state,
      saveLoading: false,
      error:null, 
      showtime : true,
      time : payload.time, 
      profit :payload.profit
    };
  }

  if (type === actions.CREATE_ERROR) {
    return {
      ...state,
      saveLoading: false,
      error:payload,
      showtime : false

    };
  }

  if( type === actions.CLOSE_STARTED) { 
    return {
      ...state,
      showtime: false,
      showprofit: true,
    }
  }

  if( type === actions.PROFIT_SUCCESS) { 
    return {
      ...state,
      showtime: false,
      showprofit: false,
    }
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
