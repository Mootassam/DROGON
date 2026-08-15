
import React, { useState, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { i18n } from "../../../i18n";
import yupFormSchemas from "src/modules/shared/yup/yupFormSchemas";
import InputFormItem from "src/shared/form/InputFormItem";
import ImagesFormItem from "src/shared/form/ImagesFormItems";
import * as yup from "yup";
import actions from "src/modules/kyc/form/kycFormActions";
import { yupResolver } from "@hookform/resolvers/yup";
import authSelectors from "src/modules/auth/authSelectors";
import transactionEnumerators from "src/modules/transaction/transactionEnumerators";
import Storage from "src/security/storage";

// Dynamic schema function
const createSchema = (documentType) =>
  yup.object().shape({
    user: yupFormSchemas.relationToOne(i18n("entities.vip.fields.title"), {}),
    Documenttype: yupFormSchemas.string(i18n("pages.proof.fields.documentType")),
    realname: yupFormSchemas.string(i18n("pages.proof.fields.fullName"), { required: true }),
    idnumer: yupFormSchemas.string(i18n("pages.proof.fields.documentNumber"), { required: true }),
    address: yupFormSchemas.string(i18n("pages.proof.fields.address"), { required: true }),
    front: yupFormSchemas.images(i18n("pages.proof.fields.frontSide"), { required: true }),
    back:
      documentType === "passport"
        ? yupFormSchemas.images(i18n("pages.proof.fields.backSide"))
        : yupFormSchemas.images(i18n("pages.proof.fields.backSide"), { required: true }),

    status: yupFormSchemas.enumerator(
      i18n("entities.transaction.fields.status"),
      { options: transactionEnumerators.status }
    ),
  });

function Proof() {
  const [document, setDocument] = useState("passport");
  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const dispatch = useDispatch();

  // Use useMemo to recompute schema only when document changes
  const schema = useMemo(() => createSchema(document), [document]);

  const form = useForm({
    resolver: yupResolver(schema),
    mode: "all",
    defaultValues: {
      user: currentUser || [],
      Documenttype: document,
      realname: "",
      idnumer: "",
      address: "",
      front: [],
      back: [],
      status: "pending",
    },
  });

  const onSubmit = (values) => {
    const data = { ...values, user: currentUser, Documenttype: document };
    if (document === "passport") data.back = [];
    dispatch(actions.doCreate(data));
  };

  const handleDocumentChange = (type) => {
    setDocument(type);
    if (type === "passport") form.setValue("back", []);
  };

  const documentTypeOptions = [
    { value: "passport", label: i18n("pages.proof.documentTypes.passport"), icon: "fas fa-passport" },
    { value: "idCard", label: i18n("pages.proof.documentTypes.idCard"), icon: "fas fa-id-card" },
    { value: "driversLicense", label: i18n("pages.proof.documentTypes.driversLicense"), icon: "fas fa-id-card-alt" },
  ];

  return (
    <div className="proof-container">
      {/* Header Section - Matching Profile Page */}
      <div className="header">
        <div className="nav-bar">
          <Link to="/profile" className="back-arrow">
            <i className="fas fa-arrow-left" />
          </Link>
          <div className="page-title">{i18n("pages.proof.title")}</div>
        </div>
      </div>

      {/* Content Card - Matching Profile Page */}
      <div className="content-card">
        <div className="instructions">
          <i className="fas fa-info-circle"></i>
          {i18n("pages.proof.instructions")}
        </div>

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* Document Info */}
            <div className="form-section">
              <div className="section-title">
                {i18n("pages.proof.sections.documentInfo")}
              </div>

              <div className="document-type-section">
                <div className="input-label">
                  {i18n("pages.proof.fields.documentType")} <span className="required">*</span>
                </div>
                <div className="document-type-options">
                  {documentTypeOptions.map((item) => (
                    <div
                      key={item.value}
                      className={`document-option ${item.value === document ? "selected" : ""}`}
                      onClick={() => handleDocumentChange(item.value)}
                    >
                      <i className={`${item.icon} document-icon`} />
                      <span className="document-text">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="input-group">
                <InputFormItem
                  className="form-input"
                  name="realname"
                  label={i18n("pages.proof.fields.fullName")}
                  placeholder={i18n("pages.proof.placeholders.fullName")}
                />
              </div>

              <div className="input-group">
                <InputFormItem
                  className="form-input"
                  name="idnumer"
                  label={i18n("pages.proof.fields.documentNumber")}
                  placeholder={i18n("pages.proof.placeholders.documentNumber")}
                />
              </div>

              <div className="input-group">
                <InputFormItem
                  className="form-input"
                  name="address"
                  label={i18n("pages.proof.fields.address")}
                  placeholder={i18n("pages.proof.placeholders.address")}
                />
              </div>
            </div>

            {/* Upload Section */}
            <div className="form-section">
              <div className="section-title">
                {i18n("pages.proof.sections.documentUpload")}
              </div>

              <div className="upload-section">
                <ImagesFormItem
                  name="front"
                  label={i18n("pages.proof.fields.frontSide")}
                  storage={Storage.values.categoryPhoto}
                  text={i18n("pages.proof.uploadTexts.frontSide")}
                  max={2}
                />
              </div>

              {document !== "passport" && (
                <div className="upload-section">
                  <ImagesFormItem
                    name="back"
                    label={i18n("pages.proof.fields.backSide")}
                    storage={Storage.values.categoryPhoto}
                    text={i18n("pages.proof.uploadTexts.backSide")}
                    max={2}
                  />
                </div>
              )}

            </div>

            {/* Security Note */}
            <div className="security-note">
              <div className="security-header">
                <i className="fas fa-shield-alt" /> {i18n("pages.proof.security.title")}
              </div>
              <div className="security-text">
                {i18n("pages.proof.security.text")}
              </div>
            </div>

            <button type="submit" className="submit-button">
              {i18n("pages.proof.buttons.validateDocuments")}
            </button>
          </form>
        </FormProvider>
      </div>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        body {
          background-color: #f5f7fa;
          color: #333;
          line-height: 1.6;
          overflow-x: hidden;
        }

        .proof-container {
          
          margin: 0 auto;
          position: relative;
          min-height: 100vh;
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
        }

        /* Header Section - Matching Profile Page */
        .header {
          min-height: 60px;
          position: relative;
          padding: 20px;
        }

        .nav-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .back-arrow {
          color: white;
          font-size: 20px;
          font-weight: 300;
          text-decoration: none;
          transition: opacity 0.3s ease;
        }

        .back-arrow:hover {
          opacity: 0.8;
        }

        .page-title {
          color: white;
          font-size: 17px;
          font-weight: 600;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }

        /* Content Card - Matching Profile Page */
        .content-card {
          background: white;
          border-radius: 40px 40px 0 0;
          padding: 25px 20px 100px;
          box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.05);
          min-height: calc(100vh - 60px);
        }

        .instructions {
          background: #f0f7ff;
          border: 1px solid #e6f0ff;
          border-radius: 12px;
          padding: 16px;
          font-size: 14px;
          color: #106cf5;
          margin-bottom: 25px;
          display: flex;
          align-items: flex-start;
          gap: 10px;
          line-height: 1.5;
        }

        .instructions i {
          font-size: 16px;
          margin-top: 2px;
          flex-shrink: 0;
        }

        .form-section {
          margin-bottom: 30px;
        }

        .section-title {
          font-size: 16px;
          font-weight: 600;
          color: #222;
          margin-bottom: 16px;
          padding-bottom: 8px;
          border-bottom: 1px solid #e7eaee;
        }

        .document-type-section {
          margin-bottom: 20px;
        }

        .input-label {
          display: block;
          font-size: 14px;
          color: #666;
          margin-bottom: 10px;
          font-weight: 500;
        }

        .required {
          color: #f44336;
        }

        .document-type-options {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .document-option {
          display: flex;
          align-items: center;
          padding: 14px 16px;
          border: 1px solid #e7eaee;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          background: #f8f9fa;
        }

        .document-option:hover {
          border-color: #106cf5;
          background: #f0f7ff;
        }

        .document-option.selected {
          border-color: #106cf5;
          background: #e6f0ff;
          box-shadow: 0 0 0 2px rgba(16, 108, 245, 0.1);
        }

        .document-icon {
          font-size: 18px;
          color: #666;
          margin-right: 12px;
          width: 24px;
          text-align: center;
        }

        .document-option.selected .document-icon {
          color: #106cf5;
        }

        .document-text {
          font-size: 12px;
          font-weight: 500;
          color: #222;
        }

        .document-option.selected .document-text {
          color: #106cf5;
          font-weight: 600;
        }

        .input-group {
          margin-bottom: 12px;
        }

        /* Input styling */
        .text-input {
          width: 100%;
        }

        .text-input input {
          width: 100%;
          padding: 12px 16px;
          font-size: 14px;
          border: 1px solid #e7eaee;
          border-radius: 8px;
          background: #fff;
          transition: all 0.3s ease;
          outline: none;
          color: #333;
        }

        .text-input input:focus {
          border-color: #106cf5;
          box-shadow: 0 0 0 2px rgba(16, 108, 245, 0.1);
        }

        .text-input input::placeholder {
          color: #aaa;
          font-size: 14px;
        }

        .text-input label {
          display: block;
          font-size: 14px;
          color: #666;
          margin-bottom: 6px;
          font-weight: 500;
        }

        /* Upload section styling */
        .upload-section {
          margin-bottom: 20px;
        }

        /* Security Note */
        .security-note {
          background: #fef3e9;
          border: 1px solid #ffd8b5;
          border-radius: 12px;
          padding: 18px;
          margin-bottom: 25px;
        }

        .security-header {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 15px;
          font-weight: 600;
          color: #ff7a00;
          margin-bottom: 8px;
        }

        .security-header i {
          font-size: 18px;
        }

        .security-text {
          font-size: 13px;
          color: #ff7a00;
          line-height: 1.5;
          opacity: 0.9;
        }

        /* Submit Button */
        .submit-button {
          width: 100%;
          padding: 12px;
          background: #106cf5;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .submit-button:hover {
          background: #0a4fc4;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(16, 108, 245, 0.3);
        }

        .submit-button:active {
          transform: translateY(0);
        }

        /* Image upload component styling override */
        .ant-upload.ant-upload-select {
          width: 100% !important;
        }

        .ant-upload-list-item {
          margin-top: 8px !important;
        }

        /* Responsive adjustments */
        @media (max-width: 380px) {
          .proof-container {
            padding: 0;
          }

          .header {
            padding: 16px;
            min-height: 50px;
          }

          .content-card {
            padding: 20px 16px 80px;
            border-radius: 30px 30px 0 0;
          }

          .instructions {
            font-size: 13px;
            padding: 14px;
          }

          .section-title {
            font-size: 15px;
          }

          .document-option {
            padding: 12px 14px;
          }

          .document-text {
            font-size: 13px;
          }

          .text-input input {
            padding: 10px 14px;
            font-size: 13px;
          }

          .submit-button {
            padding: 12px;
            font-size: 14px;
          }
        }

        @media (min-width: 768px) {
          .content-card {
            border-radius: 30px 30px 0 0;
            padding: 30px 25px 100px;
          }

          .document-type-options {
            flex-direction: row;
            gap: 12px;
          }

          .document-option {
            flex: 1;
            flex-direction: column;
            text-align: center;
            padding: 16px 10px;
          }

          .document-icon {
            margin-right: 0;
            margin-bottom: 8px;
          }
        }
      `}</style>
    </div>
  );
}

export default Proof;
