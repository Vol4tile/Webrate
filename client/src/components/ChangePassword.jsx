import React, { useEffect } from "react";
import { useState } from "react";
import { updatePassword } from "../axios";

import { ReactComponent as HideToggle } from "../assets/visibility.svg";
import "../css/NameChange.css";
const ChangePassword = ({ userData, setUserData }) => {
  const [toggle, setToggle] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [token, setToken] = useState();
  const [hide, setHide] = useState(1);
  useEffect(() => {
    try {
      setToken(JSON.parse(localStorage.getItem("token")));
    } catch (err) {}
  }, []);

  return (
    <div
      className="setting"
      onClick={() => {
        setToggle(true);
      }}
    >
      {!toggle && <div className="changeButton">Şifre değiştir</div>}

      {toggle && (
        <div className="changeInput">
          <HideToggle
            height="15px"
            width="15px"
            onClick={() => {
              setHide(!hide);
            }}
          ></HideToggle>
          <input
            type={hide ? "password" : "text"}
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
          />

          <div className="space"></div>
          <div
            className="buttons"
            onClick={(e) => {
              updatePassword(newPassword, token)
                .then((res) => {
                  localStorage.setItem("token", JSON.stringify(res.data.token));
                  let myData = JSON.parse(localStorage.getItem("user"));
                  myData.password = newPassword;
                
                  localStorage.setItem("user", JSON.stringify(myData));

                  setToggle(!toggle);

                 
                  setUserData((userData) => ({
                    ...userData,
                    password: newPassword,
                  }));
                })
                .catch((error) => {
                  
                });
            }}
          >
            {" "}
            &#x2714;
          </div>
          <div className="space"></div>
          <div
            className="buttons"
            style={{ color: "gray" }}
            onClick={(e) => {
              setToggle(false);

              e.stopPropagation();
            }}
          >
            X
          </div>
        </div>
      )}
    </div>
  );
};

export default ChangePassword;
