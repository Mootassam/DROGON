import list from 'src/modules/stackingPlan/list/stackingPlanListReducers';
import form from 'src/modules/stackingPlan/form/stackingPlanFormReducers';
import view from 'src/modules/stackingPlan/view/stackingPlanViewReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,

});
