import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { i18n } from "../../../i18n";
import authSelectors from "src/modules/auth/authSelectors";
import userFormActions from "src/modules/user/form/userFormActions";
import userFormSelectors from "src/modules/user/form/userFormSelectors";
import Dates from "src/view/shared/utils/Dates";

function Invitation() {
  const dispatch = useDispatch();
  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const listMembers = useSelector(userFormSelectors.listMembers);
  const Loading = useSelector(userFormSelectors.loading);
  const listUser = useSelector(userFormSelectors.lisUsers);
  const userLoading = useSelector(userFormSelectors.usersLoading);
  const totalReward = useSelector(userFormSelectors.reward);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    title: "",
    members: [],
    type: "", // "approved" or "pending"
  });
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    if (currentUser?.refcode) {
      dispatch(userFormActions.rewardCount());
      dispatch(userFormActions.doTree(currentUser.refcode));
    }
  }, [dispatch, currentUser?.refcode]);

  const copyReferralCode = async () => {
    if (!currentUser?.refcode) return;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(currentUser.refcode);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = currentUser.refcode;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }

      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const shareReferral = (platform: string) => {
    const shareText = `Join Icmarkets using my referral code: ${currentUser?.refcode}`;
    const shareUrl = window.location.origin;

    switch (platform) {
      case "whatsapp":
        window.open(
          `https://wa.me/?text=${encodeURIComponent(shareText)}`,
          "_blank"
        );
        break;
      case "email":
        window.open(
          `mailto:?subject=Join Icmarkets&body=${encodeURIComponent(shareText)}`,
          "_blank"
        );
        break;
      case "sms":
        window.open(`sms:?body=${encodeURIComponent(shareText)}`, "_blank");
        break;
      case "more":
        if (navigator.share) {
          navigator.share({
            title: "Icmarkets Referral",
            text: shareText,
            url: shareUrl,
          });
        } else {
          copyReferralCode();
        }
        break;
      default:
        break;
    }
  };

  const handleOpenModal = (level: number, type: "approved" | "pending") => {
    const title = `${level}${getOrdinalSuffix(level)} Generation ${type === "approved" ? "Approved" : "Pending"
      } Members`;

    setModalData({
      title,
      members: [],
      type,
    });
    setIsModalOpen(true);

    const values = {
      status: type,
      refCode: currentUser?.refcode,
      level,
    };

    dispatch(userFormActions.byLevel(values));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalData({
      title: "",
      members: [],
      type: "",
    });
  };

  const getOrdinalSuffix = (number: number) => {
    if (number === 1) return "st";
    if (number === 2) return "nd";
    if (number === 3) return "rd";
    return "th";
  };

  const getGenerationTitle = (level: number) => {
    return `${level}${getOrdinalSuffix(level)} Generation Members`;
  };

  return (
    <div className="invitation-container">
      {/* Header Section - Matching Profile Page */}
      <div className="header">
        <div className="nav-bar">
          <Link to="/profile" className="back-arrow">
            <i className="fas fa-arrow-left" />
          </Link>
          <div className="page-title">{i18n("pages.invitation.title")}</div>
        </div>
      </div>

      {/* Content Card - Matching Profile Page */}
      <div className="content-card">
        {/* Invite Section */}
        <div className="invite-earn-section">
          <div className="section-title">{i18n("pages.invitation.earnTogether")}</div>
          <div className="section-subtitle">
            {i18n("pages.invitation.description")}
          </div>

          {/* Referral Code */}
          <div className="referral-label">{i18n("pages.invitation.yourReferralCode")}</div>
          <div className="referral-code-box">
            <div className="referral-code-value">
              {currentUser?.refcode || i18n("pages.invitation.loading")}
            </div>
            <button
              className="copy-button"
              onClick={copyReferralCode}
            >
              <i className="fas fa-copy" />
              {copySuccess ? i18n("pages.invitation.copied") : i18n("pages.invitation.copyCode")}
            </button>
          </div>

          {/* Share Options */}
          <div className="share-section">
            <div className="share-label">Share via</div>
            <div className="share-buttons">
              <div className="share-button" onClick={() => shareReferral("whatsapp")}>
                <i className="fab fa-whatsapp" />
              </div>
              <div className="share-button" onClick={() => shareReferral("email")}>
                <i className="fas fa-envelope" />
              </div>
              <div className="share-button" onClick={() => shareReferral("sms")}>
                <i className="fas fa-sms" />
              </div>
              <div className="share-button" onClick={() => shareReferral("more")}>
                <i className="fas fa-share-alt" />
              </div>
            </div>
          </div>
        </div>

        {/* Rewards Section */}
        <div className="rewards-section">
          <div className="rewards-card">
            <div className="rewards-label">{i18n("pages.invitation.totalEarned")}</div>
            <div className="rewards-amount">{totalReward.toFixed(0)} USD</div>
            <div className="rewards-subtitle">{i18n("pages.invitation.allTimeCommission")}</div>
          </div>
        </div>

        {/* Generation Stats Section */}
        <div className="generation-section">
          <div className="section-title">{i18n("pages.invitation.generationMembers")}</div>
          <div className="generation-stats">
            {Loading && (
              <div className="loading-state">
                <i className="fas fa-spinner fa-spin"></i>
                <span>{i18n("pages.invitation.loading")}</span>
              </div>
            )}
            {!Loading && listMembers?.length === 0 && (
              <div className="empty-state">
                <i className="fas fa-users"></i>
                <p>{i18n("pages.invitation.noGenerationData")}</p>
              </div>
            )}
            {!Loading &&
              listMembers?.map((item: any, index: number) => (
                <div className="generation-item" key={index}>
                  <div className="generation-header">
                    <i className="fas fa-crown"></i>
                    <span>{getGenerationTitle(item?.level)}</span>
                  </div>
                  <div className="generation-stats-row">
                    <div
                      className="stat-box approved"
                      onClick={() => handleOpenModal(item.level, "approved")}
                    >
                      <div className="stat-value">{item?.approvedCount || 0}</div>
                      <div className="stat-label">{i18n("pages.invitation.approvedMembers")}</div>
                    </div>
                    <div
                      className="stat-box pending"
                      onClick={() => handleOpenModal(item.level, "pending")}
                    >
                      <div className="stat-value">{item?.pendingCount || 0}</div>
                      <div className="stat-label">{i18n("pages.invitation.pendingMembers")}</div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {copySuccess && (
        <div className="toast-notification">
          <i className="fas fa-check-circle"></i>
          {i18n("pages.invitation.referralCopied")}
        </div>
      )}

      {/* Members Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{modalData.title}</h3>
              <button className="modal-close-btn" onClick={handleCloseModal}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              {userLoading ? (
                <div className="modal-loading">
                  <i className="fas fa-spinner fa-spin"></i>
                  <p>{i18n("pages.invitation.loadingMembers")}</p>
                </div>
              ) : listUser && listUser.length > 0 ? (
                <ul className="members-list">
                  {listUser.map((member: any, index: number) => (
                    <li key={index} className="member-item">
                      <div className="member-info">
                        <div className="member-email">{member.email}</div>
                        <div className="member-date">
                          {modalData.type === "approved"
                            ? `${i18n("pages.invitation.approved")}: ${Dates.formatDateTime(
                              member.updatedAt || member.createdAt
                            )}`
                            : `${i18n("pages.invitation.joined")}: ${Dates.formatDateTime(
                              member.createdAt
                            )}`}
                        </div>
                      </div>
                      <div className={`member-status ${modalData.type}`}>
                        {modalData.type}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="modal-empty-state">
                  <i className="fas fa-users"></i>
                  <p>{i18n("pages.invitation.noMembersFound")}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

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

        .invitation-container {
          max-width: 400px;
          margin: 0 auto;
          position: relative;
          min-height: 100vh;
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
        }

        /* Header Section - Matching Profile Page */
        .header {
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
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
          padding: 30px 20px 100px;
          box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.05);
          min-height: calc(100vh - 60px);
        }

        /* Invite Section */
        .invite-earn-section {
          margin-bottom: 25px;
        }

        .section-title {
          font-size: 18px;
          font-weight: 700;
          color: #222;
          margin-bottom: 8px;
        }

        .section-subtitle {
          font-size: 13px;
          color: #888f99;
          line-height: 1.4;
          margin-bottom: 20px;
        }

        .referral-label {
          font-size: 14px;
          color: #666;
          margin-bottom: 8px;
          font-weight: 500;
        }

        .referral-code-box {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 25px;
        }

        .referral-code-value {
          flex: 1;
          background: #f8f9fa;
          border: 1px solid #e7eaee;
          border-radius: 8px;
          padding: 12px 15px;
          font-size: 14px;
          font-weight: 600;
          color: #222;
          letter-spacing: 1px;
        }

        .copy-button {
          background: #106cf5;
          color: white;
          border: none;
          border-radius: 8px;
          padding: 12px 20px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .copy-button:hover {
          background: #0a4fc4;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(16, 108, 245, 0.2);
        }

        .copy-button:active {
          transform: translateY(0);
        }

        .share-section {
          margin-top: 25px;
        }

        .share-label {
          font-size: 14px;
          color: #666;
          margin-bottom: 12px;
          font-weight: 500;
        }

        .share-buttons {
          display: flex;
          gap: 12px;
        }

        .share-button {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          background: #f8f9fa;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          color: #666;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 1px solid #e7eaee;
        }

        .share-button:hover {
          background: #e6f0ff;
          color: #106cf5;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .share-button:nth-child(1) { color: #25D366; }
        .share-button:nth-child(2) { color: #EA4335; }
        .share-button:nth-child(3) { color: #34B7F1; }
        .share-button:nth-child(4) { color: #106cf5; }

        /* Rewards Section */
        .rewards-section {
          margin-bottom: 25px;
        }

        .rewards-card {
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
          border-radius: 16px;
          padding: 24px;
          color: white;
          text-align: center;
          box-shadow: 0 4px 12px rgba(16, 108, 245, 0.2);
        }

        .rewards-label {
          font-size: 14px;
          opacity: 0.9;
          margin-bottom: 8px;
        }

        .rewards-amount {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .rewards-subtitle {
          font-size: 12px;
          opacity: 0.8;
        }

        /* Generation Section */
        .generation-section {
          margin-top: 25px;
        }

        .generation-stats {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .generation-item {
          background: #fff;
          border: 1px solid #e7eaee;
          border-radius: 12px;
          padding: 16px;
          transition: all 0.3s ease;
        }

        .generation-item:hover {
          border-color: #106cf5;
          box-shadow: 0 4px 8px rgba(16, 108, 245, 0.1);
        }

        .generation-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
          font-size: 15px;
          font-weight: 600;
          color: #222;
        }

        .generation-header i {
          color: #FFD700;
        }

        .generation-stats-row {
          display: flex;
          gap: 12px;
        }

        .stat-box {
          flex: 1;
          background: #f8f9fa;
          border-radius: 8px;
          padding: 16px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 1px solid transparent;
        }

        .stat-box:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .stat-box.approved:hover {
          border-color: #37b66a;
          background: #e7f7ef;
        }

        .stat-box.pending:hover {
          border-color: #ff7a00;
          background: #fff2e6;
        }

        .stat-value {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .stat-box.approved .stat-value {
          color: #37b66a;
        }

        .stat-box.pending .stat-value {
          color: #ff7a00;
        }

        .stat-label {
          font-size: 12px;
          color: #666;
        }

        /* Loading and Empty States */
        .loading-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px;
          color: #888f99;
        }

        .loading-state i {
          font-size: 24px;
          margin-bottom: 12px;
        }

        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px;
          color: #888f99;
          text-align: center;
        }

        .empty-state i {
          font-size: 48px;
          margin-bottom: 16px;
          opacity: 0.5;
        }

        .empty-state p {
          font-size: 14px;
          max-width: 200px;
          line-height: 1.4;
        }

        /* Toast Notification */
        .toast-notification {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: #37b66a;
          color: white;
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          z-index: 1001;
          display: flex;
          align-items: center;
          gap: 8px;
          animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .modal-content {
          background: white;
          border-radius: 16px;
          width: 100%;
          max-width: 400px;
          max-height: 80vh;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid #e7eaee;
        }

        .modal-title {
          font-size: 16px;
          font-weight: 600;
          color: #222;
          margin: 0;
        }

        .modal-close-btn {
          background: none;
          border: none;
          font-size: 18px;
          color: #999;
          cursor: pointer;
          padding: 0;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: background 0.3s ease;
        }

        .modal-close-btn:hover {
          background: #f5f5f5;
          color: #666;
        }

        .modal-body {
          padding: 20px;
          max-height: calc(80vh - 73px);
          overflow-y: auto;
        }

        .modal-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px;
          color: #106cf5;
        }

        .modal-loading i {
          font-size: 24px;
          margin-bottom: 12px;
        }

        .modal-empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px;
          color: #888f99;
          text-align: center;
        }

        .modal-empty-state i {
          font-size: 48px;
          margin-bottom: 16px;
          opacity: 0.5;
        }

        /* Members List */
        .members-list {
          list-style: none;
          padding: 0;
        }

        .member-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid #f0f0f0;
        }

        .member-item:last-child {
          border-bottom: none;
        }

        .member-info {
          flex: 1;
        }

        .member-email {
          font-size: 14px;
          font-weight: 500;
          color: #222;
          margin-bottom: 4px;
        }

        .member-date {
          font-size: 12px;
          color: #888f99;
        }

        .member-status {
          font-size: 12px;
          font-weight: 600;
          padding: 4px 8px;
          border-radius: 12px;
          text-transform: capitalize;
        }

        .member-status.approved {
          background: #e7f7ef;
          color: #37b66a;
        }

        .member-status.pending {
          background: #fff2e6;
          color: #ff7a00;
        }

        /* Responsive adjustments */
        @media (max-width: 380px) {
          .invitation-container {
            padding: 0;
          }

          .header {
            padding: 16px;
            min-height: 50px;
          }

          .content-card {
            padding: 25px 16px 100px;
          }

          .referral-code-box {
            flex-direction: column;
          }

          .referral-code-value {
            width: 100%;
            text-align: center;
          }

          .copy-button {
            width: 100%;
            justify-content: center;
          }

          .share-button {
            width: 44px;
            height: 44px;
            font-size: 18px;
          }

          .rewards-amount {
            font-size: 24px;
          }

          .generation-stats-row {
            flex-direction: column;
          }

          .modal-content {
            margin: 0 16px;
          }
        }

        @media (min-width: 768px) {
          .content-card {
            border-radius: 30px 30px 0 0;
          }

          .modal-content {
            max-width: 450px;
          }
        }
      `}</style>
    </div>
  );
}

export default Invitation;