import actions from 'src/modules/auth/authActions';
// import method from 'src/modules/depositMethod/list/depositMethodListActions'
// eslint-disable-next-line react-refresh/only-export-components
export default (store) => {
  store.dispatch(actions.doInit());
  // store.dispatch(method.doFetch());
};
