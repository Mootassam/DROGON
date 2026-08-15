import actions from 'src/modules/numbers/numberActions';

const initialData = {
  currentUser: null,
  currentTenant: null,
  loading: false,
  numberAdded: 0,
  numberDuplicated: 0,
  numberWrong: 0,
  errorMessage: null,
  listduplicateNumber: [],
  listwrongNumbers: [],
  errorMessageVerifyEmail: null,
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.NUMBER_START) {
    return {
      ...state,
      errorMessage: null,
      numberAdded: 0,
      numberDuplicated: 0,
      numberWrong: 0,
      listduplicateNumber: [],
      listwrongNumbers: [],
      loading: true,
    };
  }

  if (type === actions.NUMBER_SUCCESS) {
    return {
      ...state,
      errorMessage: null,
      loading: false,
      numberAdded: payload.newNumber,
      numberDuplicated: payload.duplicateNumber,
      numberWrong: payload.wrongNumbers,
      listwrongNumbers: payload.listwrongNumbers,
    };
  }

  if (type === actions.NUMBER_ERROR) {
    return {
      ...state,
      currentUser: null,
      currentTenant: null,
      errorMessage: payload || null,
      loading: false,
      listwrongNumbers: [],
      numberAdded: 0,
      numberDuplicated: 0,
      numberWrong: 0,
    };
  }

  if (type === actions.RESET__START) {
    return {
      ...state,
      loading: false,
      numberAdded: 0,
      numberDuplicated: 0,
      numberWrong: 0,
      listwrongNumbers: [],
    };
  }

  return state;
};
