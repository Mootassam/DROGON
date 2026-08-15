import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "../styles/styles.css";
import { Link } from "react-router-dom";
import authActions from "src/modules/auth/authActions";
import authSelectors from "src/modules/auth/authSelectors";
import { useHistory } from "react-router-dom"; // Assuming you're using React Router
import actions from "src/modules/record/list/recordListActions";
import selectors from "src/modules/record/list/recordListSelectors";
import Message from "src/view/shared/message";
import ImagesFormItem from "src/shared/form/ImagesFormItems";
import Storage from "src/security/storage";
import { i18n } from "../../../i18n";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import yupFormSchemas from "src/modules/shared/yup/yupFormSchemas";

const schema = yup.object().shape({
  avatars: yupFormSchemas.images(i18n("user.fields.avatars"), {
    max: 1,
  }),
});



function Profile() {
  const dispatch = useDispatch();
  const total = useSelector(selectors.selectTotal);
  const totalperday = useSelector(selectors.selectTotalPerday);

  useEffect(() => {
    const values = {
      status: "completed",
    };
    dispatch(actions.doCountDay());
    dispatch(actions.doFetch(values, values));
  }, [dispatch]);

  const doSignout = () => {
    dispatch(authActions.doSignout());
  };
  const history = useHistory();

  const goto = (param) => {
    history.push(param);
  };
  const currentUser = useSelector(authSelectors.selectCurrentUser);
   const data = [
     {
       icon: "fa-solid fa-clock-rotate-left",
       name: "Tasks History",
       url: "/order",
     },
     { icon: "fa-solid fa-wallet", name: "Bind Wallet", url: "/wallet" },
     {
       icon: "fa-solid fa-arrow-right-arrow-left",
       name: "Transactions",
       url: "/transacation",
     },
     {
       icon: "fa-solid fa-money-bill-transfer",
       name: "Withdraw",
       url: "/withdraw",
     },
     
     { icon: "fa-solid fa-user", name: "Profile", url: "/myprofile" },
     { icon: "fa-solid fa-lock", name: "Security", url: "/security" },
   ];

   // Filter out restricted items for demo accounts
   const filteredData = currentUser?.accountType === 'demo'
     ? data.filter(item => !['/wallet', '/withdraw', '/security'].includes(item.url))
     : data;
  const referenceCodeRef = useRef<any>(null);

  const copyToClipboard = () => {
    const referenceCode = referenceCodeRef.current.innerText;

    // Check if the browser supports the modern clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(referenceCode)
        .then(() => {
          Message.success("Copied");
          // You can add any additional logic here, such as showing a success message
        })
        .catch((error) => {
          console.error("Error copying to clipboard:", error);
          // You can handle errors here, such as displaying an error message to the user
        });
    } else {
      // Fallback for browsers that do not support the modern clipboard API
      const textArea = document.createElement("textarea");
      textArea.value = referenceCode;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      Message.success("Copied");

      // You can add any additional logic here for the fallback mechanism
    }
  };

  const [initialValues] = useState(() => {
    const record = currentUser || {};

    return {
      avatars: record.avatars || [],
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: "all",
    defaultValues: initialValues,
  });
  const onSubmit = (values) => {
    dispatch(authActions.doUpdateProfile(values));

 
  };

  return (
    <div className="app__profile">
      <div className="profiles__header">
        <div className="header__background"></div>
        <div className="carde__profile">
          <div className="cadre__top">
            <div className="cadre__left">
              <FormProvider {...form}>
                <form>
                  <ImagesFormItem
                    name="avatars"
                    storage={Storage.values.userAvatarsProfiles}
                    max={1}
                  />
                </form>
              </FormProvider>
               <div className="left__details">
                 <div className="user__title">
                   {currentUser?.fullName}
                   {currentUser?.accountType === 'demo' && (
                     <span style={{
                       backgroundColor: '#FF6838',
                       color: 'white',
                       padding: '2px 8px',
                       borderRadius: '4px',
                       fontSize: '12px',
                       marginLeft: '8px',
                       fontWeight: 'bold'
                     }}>DEMO</span>
                   )}

                   <img src="/images/check.png" alt="" style={{ width: 30 }} />
                 </div>
                <div className="my__code">
                  UID : {currentUser?.invitationcode}
                </div>
                <div className="small__invitation">
                  <div className="small__inviation__left">
                    <span className="promotion__code">Promotion code:</span>
                    <span ref={referenceCodeRef}> {currentUser?.refcode}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="cadre__bottom">

            <div className="firt__cadre">
              <span className="title__cadre">
                {" "}
                ${currentUser?.balance?.toFixed(2) || 0.0}
              </span>
              <span className="promotion__code">Wallet Amount</span>
            </div>
          </div>
          {/* <div className="score">
            <div className="score__right">Credit Score:</div>
            <div className="score__left">
              {currentUser?.score ? currentUser.score : 100}%
            </div>
          </div>
          <div className="bar">
            <div
              className="progress-value"
              style={{
                width: `${currentUser?.score ? currentUser.score : 100}%`,
              }}
            ></div>
          </div> */}

          <div className="assesment__">
            <div className="text__assesment">Credit assesment:</div>
            <div className="credit__bar">
              <div
                className="circle__bar"
                style={{
                  left: `calc(${
                    currentUser?.score ? currentUser.score : 100
                  }% - 30px)`,
                }}
              >
             
                {currentUser?.score ? currentUser.score : 100}%
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="profile__content">


        <div>
          <label htmlFor="" className="titre">
            My Details
          </label>
          <div className="detail__section">
            <Link to="/myprofile" className="remove__ligne">
              <div className="line__section border__">
                <div className="titre__section">
                  <i className="fa-solid fa-user profile__icon"></i>
                  <span>Profile</span>
                </div>
                <div>
                  <i className="fa fa-arrow-right " />
                </div>
              </div>
            </Link>
      
          </div>
        </div>

        <div>
          <label htmlFor="" className="titre">
            Other
          </label>
          <div className="detail__section">
            <Link to="/online" className="remove__ligne">
              <div className="line__section border__">
                <div className="titre__section">
                  <img
                    src="/icons/headset.svg"
                    alt=""
                    style={{ width: 20, color: "white" }}
                  />{" "}
                  <span>Customer Support</span>
                </div>
                <div>
                  <i className="fa fa-arrow-right " />
                </div>
              </div>
            </Link>

            <Link to="/order" className="remove__ligne">
              <div className="line__section border__">
                <div className="titre__section">
                  <i className="fa-solid fa-clock-rotate-left profile__icon"></i>
                  <span>Tasks History</span>
                </div>
                <div>
                  <i className="fa fa-arrow-right " />
                </div>
              </div>
             </Link>

             {/* Hide Withdraw for demo users */}
             {currentUser?.accountType !== 'demo' && (
               <Link to="/withdraw" className="remove__ligne">
                 <div className="line__section border__">
                   <div className="titre__section">
                     <i className="fa-solid fa-money-bill-transfer profile__icon"></i>
                     <span>Withdraw</span>
                   </div>
                   <div>
                     <i className="fa fa-arrow-right " />
                   </div>
                 </div>
               </Link>
             )}




             <Link to="/transacations" className="remove__ligne">
              <div className="line__section border__">
                <div className="titre__section">
                  <i className="fa-solid fa-arrow-right-arrow-left profile__icon"></i>
                  <span>Transaction</span>
                </div>
                <div>
                  <i className="fa fa-arrow-right " />
                </div>
              </div>
            </Link>

            <Link to="/security" className="remove__ligne">
              <div className="line__section border__">
                <div className="titre__section">
                  <i className="fa-solid fa-lock profile__icon"></i>
                  <span>Security</span>
                </div>
                <div>
                  <i className="fa fa-arrow-right " />
                </div>
              </div>
             </Link>

             {/* Hide Security for demo users */}
             {currentUser?.accountType !== 'demo' && (
               <Link to="/security" className="remove__ligne">
                 <div className="line__section border__">
                   <div className="titre__section">
                     <i className="fa-solid fa-lock profile__icon"></i>
                     <span>Security</span>
                   </div>
                   <div>
                     <i className="fa fa-arrow-right " />
                   </div>
                 </div>
               </Link>
             )}
          </div>
        </div>
      </div>
      <div className="logout__button" onClick={() => doSignout()}>
        Logout
      </div>
    </div>
  );
}

export default Profile;
