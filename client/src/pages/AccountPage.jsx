import React, { useEffect, useState } from "react";
import "../css/Account.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GetUserData } from "../axios";
import dateToString from "../dateToString";

import NameChange from "../components/NameChange";
import UsernameChange from "../components/UsernameChange";
import ChangePassword from "../components/ChangePassword";
import PPChange from "../components/PPChange";

const AccountPage = () => {
  const reduxData = useSelector((state) => state.users);

  const { username } = useParams();
  const [userData, setUserData] = useState();
  const [myUsernameRedux, setMyUsername] = useState();
  useEffect(() => {
    setMyUsername(reduxData.user?.user.username);
  }, [reduxData]);
  useEffect(() => {
    GetUserData({ username })
      .then((res) => {
        setUserData(res.data.user);
      })
      .catch((error) => {
        
      });
  }, []);

  return (
    <div className="Account">
      <div>
        {userData && (
          <div className="flip-card">
            <div className="flip-card-front">
              <div>
                <div>
                  {" "}
                  <img
                    src={require(`../../../server/uploads/${userData.photo}`)}
                    alt="Avatar"
                    style={{ width: 100, height: 100, borderRadius: "50%" }}
                  />
                </div>
                <div>
                  <div>{userData.fullname}</div>
                  <div style={{ color: "var(--cb)" }}>@{userData.username}</div>
                  <div>E-mail : {userData.email}</div>
                </div>
              </div>

              <div style={{ padding: 15 }}>
                <span style={{ color: "var(--cb)" }}>
                  Kayıt tarihi : {dateToString(userData.createDate)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      {myUsernameRedux == username && (
        <div style={{ display: "flex" }}>
          <NameChange userData={userData} setUserData={setUserData} />
          <UsernameChange userData={userData} setUserData={setUserData} />
          <ChangePassword userData={userData} setUserData={setUserData} />
          <PPChange userData={userData} setUserData={setUserData} />
        </div>
      )}
    </div>
  );
};

export default AccountPage;
