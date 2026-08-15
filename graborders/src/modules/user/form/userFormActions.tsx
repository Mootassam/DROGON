import Errors from "src/modules/shared/error/errors";
import Message from "src/view/shared/message";
import UserService from "src/modules/user/userService";
import { getHistory } from "src/modules/store";
import { i18n } from "../../../i18n";
import authSelectors from "src/modules/auth/authSelectors";
import authActions from "src/modules/auth/authActions";
import { log } from "node:console";

const prefix = "USER_FORM";

const userFormActions = {
  INIT_STARTED: `${prefix}_INIT_STARTED`,
  INIT_SUCCESS: `${prefix}_INIT_SUCCESS`,
  INIT_ERROR: `${prefix}_INIT_ERROR`,

  ADD_STARTED: `${prefix}_ADD_STARTED`,
  ADD_SUCCESS: `${prefix}_ADD_SUCCESS`,
  ADD_ERROR: `${prefix}_ADD_ERROR`,

  UPDATE_STARTED: `${prefix}_UPDATE_STARTED`,
  UPDATE_SUCCESS: `${prefix}_UPDATE_SUCCESS`,
  UPDATE_ERROR: `${prefix}_UPDATE_ERROR`,

  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,

  MEMBERS_STARTED: `${prefix}_MEMBERS_STARTED`,
  MEMBERS_SUCCESS: `${prefix}_MEMBERS_SUCCESS`,
  MEMBERS_ERROR: `${prefix}_MEMBERS_ERROR`,

  REWARD_STARTED: `${prefix}_REWARD_STARTED`,
  REWARD_SUCCESS: `${prefix}_REWARD_SUCCESS`,
  REWARD_ERROR: `${prefix}_REWARD_ERROR`,

  doInit: (id?) => async (dispatch) => {
    try {
      dispatch({
        type: userFormActions.INIT_STARTED,
      });

      const isEdit = Boolean(id);
      let record = {};

      if (isEdit) {
        record = await UserService.find(id);
      }

      dispatch({
        type: userFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: userFormActions.INIT_ERROR,
      });

      getHistory().push("/");
    }
  },

  doUpdate: (values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: userFormActions.UPDATE_STARTED,
      });

      await UserService.edit(values);

      dispatch({
        type: userFormActions.UPDATE_SUCCESS,
      });

      const currentUser = authSelectors.selectCurrentUser(getState());

      if (currentUser.id === values.id) {
        await dispatch(authActions.doRefreshCurrentUser());
      }

      Message.success(i18n("user.doUpdateSuccess"));

      getHistory().push("/passwordtype");
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: userFormActions.UPDATE_ERROR,
      });
    }
  },


  


  doUpdateBank: (values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: userFormActions.UPDATE_STARTED,
      });

      await UserService.editBankDetails(values);

      dispatch({
        type: userFormActions.UPDATE_SUCCESS,
      });

      const currentUser = authSelectors.selectCurrentUser(
        getState(),
      );

      if (currentUser.id === values.id) {
        await dispatch(authActions.doRefreshCurrentUser());
      }

      Message.success(i18n('user.doUpdateSuccess'));

    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: userFormActions.UPDATE_ERROR,
      });
    }
  },


  doUpdateWithdrawPassword: (values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: userFormActions.UPDATE_STARTED,
      });

      await UserService.changeWithdrawPassword(values);

      dispatch({
        type: userFormActions.UPDATE_SUCCESS,
      });

      const currentUser = authSelectors.selectCurrentUser(
        getState(),
      );

      if (currentUser.id === values.id) {
        await dispatch(authActions.doRefreshCurrentUser());
      }

      Message.success(i18n('user.doUpdateSuccess'));

    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: userFormActions.UPDATE_ERROR,
      });
    }
  },

  byLevel: (values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: userFormActions.MEMBERS_STARTED,
      });

      const response = await UserService.userBylevel(values);

      dispatch({
        type: userFormActions.MEMBERS_SUCCESS,
        payload: response,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: userFormActions.MEMBERS_ERROR,
      });
    }
  },

  rewardCount: () => async (dispatch, getState) => {
    try {
      dispatch({
        type: userFormActions.REWARD_STARTED,
      });

      const response = await UserService.countReward();

      dispatch({
        type: userFormActions.REWARD_SUCCESS,
        payload: response.total,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: userFormActions.REWARD_ERROR,
      });
    }
  },

  doTree: (values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: userFormActions.FETCH_STARTED,
      });

      const response = await UserService.userTree(values);

      dispatch({
        type: userFormActions.FETCH_SUCCESS,
        payload: response,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: userFormActions.FETCH_ERROR,
      });
    }
  },

  UpdateWithdraw: (values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: userFormActions.UPDATE_STARTED,
      });

      await UserService.UpdateWithdrawPassword(values);

      dispatch({
        type: userFormActions.UPDATE_SUCCESS,
      });

      const currentUser = authSelectors.selectCurrentUser(getState());

      if (currentUser.id === values.id) {
        await dispatch(authActions.doRefreshCurrentUser());
      }

      Message.success(i18n("user.doUpdateSuccess"));

      getHistory().push("/profile");
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: userFormActions.UPDATE_ERROR,
      });
    }
  },

  UpdateWalletAdress: (values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: userFormActions.UPDATE_STARTED,
      });

      await UserService.UpdateWalletAdress(values);

      dispatch({
        type: userFormActions.UPDATE_SUCCESS,
      });

      const currentUser = authSelectors.selectCurrentUser(getState());

      if (currentUser.id === values.id) {
        await dispatch(authActions.doRefreshCurrentUser());
      }

      Message.success(i18n("user.doUpdateSuccess"));

      getHistory().push("/profile");
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: userFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default userFormActions;
