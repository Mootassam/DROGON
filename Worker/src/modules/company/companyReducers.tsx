import list from 'src/modules/company/list/companyListReducers';
import form from 'src/modules/company/form/companyFormReducers';
import view from 'src/modules/company/view/companyViewReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
});
