import React, { useEffect } from "react";
import { useState } from "react";
import { updateFullname } from "../axios";
import "../css/NameChange.css";
const NameChange = ({ userData, setUserData }) => {
  const [toggle, setToggle] = useState(false);
  const [newFullname, setNewFullname] = useState("");
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
      {!toggle && <div className="changeButton">İsim değiştir</div>}

      {toggle && (
        <div className="changeInput">
          <input
            type="text"
            onChange={(e) => {
              setNewFullname(e.target.value);
            }}
          />
          <div className="space"></div>
          <div
            className="buttons"
            onClick={(e) => {
              updateFullname(newFullname, token)
                .then((res) => {
                  setToggle(!toggle);
                  setUserData((userData) => ({
                    ...userData,
                    fullname: newFullname,
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

export default NameChange;
