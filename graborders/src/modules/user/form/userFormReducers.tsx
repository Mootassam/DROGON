import actions from "src/modules/user/form/userFormActions";

const initialData = {
  initLoading: false,
  saveLoading: false,
  loading: false,
  user: null,
  member: null,
  users: null,
  reward: 0,
  listLoading: false,
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.INIT_STARTED) {
    return {
      ...state,
      user: null,
      initLoading: true,
    };
  }

  if (type === actions.INIT_SUCCESS) {
    return {
      ...state,
      user: payload,
      initLoading: false,
    };
  }

  if (type === actions.INIT_ERROR) {
    return {
      ...state,
      user: null,
      initLoading: false,
    };
  }

  if (type === actions.ADD_STARTED) {
    return {
      ...state,
      saveLoading: true,
    };
  }

  if (type === actions.ADD_SUCCESS) {
    return {
      ...state,
      saveLoading: false,
    };
  }

  if (type === actions.ADD_ERROR) {
    return {
      ...state,
      saveLoading: false,
    };
  }

  if (type === actions.REWARD_STARTED) {
    return {
      ...state,
    };
  }

  if (type === actions.REWARD_SUCCESS) {
    return {
      ...state,
      reward: payload,
    };
  }

  if (type === actions.REWARD_ERROR) {
    return {
      ...state,
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

  if (type === actions.MEMBERS_STARTED) {
    return {
      ...state,
      listLoading: true,
    };
  }

  if (type === actions.MEMBERS_SUCCESS) {
    return {
      ...state,
      listLoading: false,
      users: payload,
    };
  }

  if (type === actions.MEMBERS_ERROR) {
    return {
      ...state,
      listLoading: false,
    };
  }

  if (type === actions.FETCH_STARTED) {
    return {
      ...state,
      loading: true,
    };
  }

  if (type === actions.FETCH_SUCCESS) {
    return {
      ...state,
      loading: false,
      member: payload,
    };
  }

  if (type === actions.FETCH_ERROR) {
    return {
      ...state,
      loading: false,
    };
  }

  return state;
};
