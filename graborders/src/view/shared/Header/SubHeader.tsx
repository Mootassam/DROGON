
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import authSelectors from "src/modules/auth/authSelectors";
import useNotifications from "../notifications/useNotifications";
import notificationListSelectors from "src/modules/notification/list/notificationListSelectors";

function SubHeader(props) {
  const history = useHistory();
  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const count = useSelector(notificationListSelectors.selectCount);

  const { notifications } = useNotifications(currentUser.id);

  const goBack = () => {
    history.goBack(); // This will take you back to the previous page
  };

  // Example notification count - you can replace this with actual data
 // This should come from your state/props

  return (
    <div className="header">
      <div className="header-content">
        <div className="back-button" onClick={() => goBack()}>
          <i className="fas fa-arrow-left" />
        </div>
        <Link to="/" className="notification-link">
          <i className="fas fa-home header-icon" style={{
            color: "white", marginLeft: 9
          }} />
        </Link>
        <div className="page-title">{props?.title}</div>
        <div className="header-icons">
          <Link to="/notification" className="notification-link">
            <i className="fas fa-bell header-icon" />
            {count > 0 && (
              <span className="notification-badge">{count}</span>
            )}

          </Link>
          <Link to="/profile" className="notification-link">
            <i className="fas fa-user header-icon" style={{
              color: "white", marginLeft: 9
            }} />
          </Link>

        </div>
      </div>
      <style>{` /* Header Section */
  .header {
      background-color: #0f0f0f;
      padding: 15px 10px;
      position: sticky;
      top: 0;
      z-index: 100;
      /* margin-bottom: 20px; */
  }

  .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
  }

  .back-button {
      color: #FFFFFF;
      font-size: 20px;
  }

  .page-title {
      font-size: 20px;
      font-weight: bold;
      color: #FFFFFF;
  }

  .header-icons {
      display: flex;
      gap: 15px;
  }

  .header-icon {
      color: #FFFFFF;
      font-size: 20px;
  }

  .notification-link {
      position: relative;
      display: inline-block;
  }

  .notification-badge {
      position: absolute;
      top: -8px;
      right: -8px;
      background: #FF4444;
      color: white;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      font-size: 10px;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: pulse 2s infinite;
  }

  @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.1); }
      100% { transform: scale(1); }
  }
`}</style>
    </div>
  );
}
export default SubHeader;
