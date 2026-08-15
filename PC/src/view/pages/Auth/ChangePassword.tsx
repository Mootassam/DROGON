import React, { useState } from "react";
import SubHeader from "src/view/shared/Header/SubHeader";
import yupFormSchemas from "src/modules/shared/yup/yupFormSchemas";
import * as yup from "yup";
import { i18n } from "../../../i18n";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import actions from "src/modules/auth/authActions";
import InputFormItem from "src/shared/form/InputFormItem";
import selectors from "src/modules/auth/authSelectors";
import ButtonIcon from "src/shared/ButtonIcon";
const schema = yup.object().shape({
  oldPassword: yupFormSchemas.string(i18n("user.fields.oldPassword"), {
    required: true,
  }),
  newPassword: yupFormSchemas.string(i18n("user.fields.newPassword"), {
    required: true,
  }),
  newPasswordConfirmation: yupFormSchemas
    .string(i18n("user.fields.newPasswordConfirmation"), {
      required: true,
    })
    .oneOf(
      [yup.ref("newPassword"), null],
      i18n("auth.passwordChange.mustMatch")
    ),
});

function ChangePassword() {
  const dispatch = useDispatch();
  const [initialValues] = useState(() => ({
    oldPassword: "",
    newPassword: "",
    newPasswordConfirmation: "",
  }));

  const form = useForm({
    resolver: yupResolver(schema),
    mode: "all",
    defaultValues: initialValues,
  });

  const saveLoading = useSelector(selectors.selectLoadingPasswordChange);

  const onSubmit = (values) => {
    dispatch(actions.doChangePassword(values.oldPassword, values.newPassword));
  };

  return (
    <div>
      <SubHeader title="Change password" path="/profile" />
      <div className="app__wallet">
        <div className="wallet__">
          <h3 className="hall">Change Password</h3>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="wallet__form">
                <div className="form__">
                  <div className="form__group">
                    <div className="label__form">
                      <span style={{ color: "red" }}>*</span>
                      <span style={{ fontSize: "13px" }}>Old Password</span>
                    </div>
                    <div className="input__div">
                      <InputFormItem
                        type="password"
                        name="oldPassword"
                        autoComplete="old-password"
                        className="input__"
                      />
                    </div>
                  </div>
                  <div className="form__group">
                    <div className="label__form">
                      <span style={{ color: "red" }}>*</span>
                      <span style={{ fontSize: "13px" }}>New Password</span>
                    </div>
                    <div className="input__div">
                      <InputFormItem
                        type="password"
                        name="newPassword"
                        autoComplete="new-password"
                        className="input__"
                      />
                    </div>
                  </div>
                  <div className="form__group">
                    <div className="label__form">
                      <span style={{ color: "red" }}>*</span>
                      <span style={{ fontSize: "13px" }}>Confirm Password</span>
                    </div>
                    <div className="input__div">
                      <InputFormItem
                        type="password"
                        name="newPasswordConfirmation"
                        autoComplete="new-password"
                        className="input__"
                      />
                    </div>
                  </div>
                </div>
                <button
                  className="confirm"
                  disabled={saveLoading}
                  type="button"
                  onClick={form.handleSubmit(onSubmit)}
                >
                  {" "}
                  <ButtonIcon
                    loading={saveLoading}
                    iconClass="far fa-save"
                  />{" "}
                  &nbsp;Submit
                </button>
                <span style={{ fontSize: 13, color: "white" }}>
                  <b>Note:</b> &nbsp; Please fill out this information carefully
                </span>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
