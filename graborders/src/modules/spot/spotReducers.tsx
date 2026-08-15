import list from 'src/modules/spot/list/spotListReducers';
import form from 'src/modules/spot/form/spotFormReducers';
import view from 'src/modules/spot/view/spotViewReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,

});
