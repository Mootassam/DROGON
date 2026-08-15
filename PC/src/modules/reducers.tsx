/* eslint-disable react-refresh/only-export-components */
import { connectRouter } from "connected-react-router";
import auth from "src/modules/auth/authReducers";
import tenant from "src/modules/tenant/tenantReducers";
import user from "src/modules/user/userReducers";
import category from "src/modules/category/categoryReducers";
import rules from "src/modules/rules/rulesReducers";

import company from "src/modules/company/companyReducers";
import vip from "src/modules/vip/vipReducers";
import plan from "src/modules/stackingPlan/stackingPlanReducers";
import stacking from "src/modules/stacking/stackingReducers";
import record from "src/modules/record/recordReducers";
import product from "src/modules/product/list/productListReducers";
import transaction from "src/modules/transaction/transactionReducers";
import futures from "src/modules/futures/futuresReducers";
import spot from "src/modules/spot/spotReducers";
import message from 'src/modules/message/messagaeReducers'
import assets from 'src/modules/assets/assetsReducers'
import deposit from 'src/modules/deposit/depositReducers'
import withdraw from 'src/modules/withdraw/withdrawReducers'
import kyc from 'src/modules/kyc/kycReducers'
import notification from 'src/modules/notification/notificationReducers'
import method from 'src/modules/depositMethod/depositMethodReducers'
import depositMethod from 'src/modules/depositMethod/depositMethodReducers'
import { combineReducers } from "redux";

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    auth,
    category,
    company,
    vip,
    transaction,
    futures,
    spot,
    message,
    plan,
    deposit,
    depositMethod,
    withdraw,
    assets,
    notification,
    kyc,
    method,
    stacking,
    product,
    record,
    tenant,
    user,
    rules
  });
