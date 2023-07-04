import React, { useEffect } from "react";
import { useState } from "react";
import { updateUsername } from "../axios";
import { useNavigate } from "react-router";
import "../css/NameChange.css";
const NameChange = ({ userData, setUserData }) => {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [token, setToken] = useState();
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
      {!toggle && <div className="changeButton">Kullanıcı Adı değiştir</div>}

      {toggle && (
        <div className="changeInput">
          <input
            type="text"
            onChange={(e) => {
              setNewUsername(e.target.value);
            }}
          />
          <div className="space"></div>
          <div
            className="buttons"
            onClick={(e) => {
              updateUsername(newUsername, token)
                .then((res) => {
                  localStorage.setItem("token", JSON.stringify(res.data.token));
                  let myData = JSON.parse(localStorage.getItem("user"));
                  myData.username = newUsername;

                  localStorage.setItem("user", JSON.stringify(myData));

                  setToggle(!toggle);

                  setUserData((userData) => ({
                    ...userData,
                    username: newUsername,
                  }));
                  navigate("/");
                })
                .catch((error) => {});
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

export default NameChange;
