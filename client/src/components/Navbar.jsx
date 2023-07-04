import React, { useEffect, useRef } from "react";

import "../App.css";
import NavbarCSS from "../css/Navbar.module.css";
import Sikayet from "./Sikayet";
import { useSelector } from "react-redux";
import { ReactComponent as Alarm } from "../assets/alarm.svg";

import Webrate from "../assets/WebRate.png";
import { useDispatch } from "react-redux";
import { Logout } from "../actions/userData/user";
import { useNavigate, useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { SearchUser, Sikayetler } from "../axios";
const Navbar = () => {
  const userData = useSelector((state) => state.users);
  const [sikayetToggle, setSikayetToggle] = useState(false);
  const [searchData, setSearchData] = useState({ search: "" });
  const [username, setUserName] = useState();
  const [profilePhoto, setProfilePhoto] = useState();
  const [sikayetler, setSikayetler] = useState([]);
  const [visibility, setVisibility] = useState(0);
  const [loadingGif, setLoadingGif] = useState(0);
  const [searchComplateData, setSearchComplateData] = useState([]);
  const [temp, setTemp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const logoutClick = () => {
    dispatch(Logout());
    navigate("/Login");
  };
  useEffect(() => {}, [temp]);
  const searchHandler = (e) => {
    setSearchData({ ...searchData, search: e.target.value });
    setSearchComplateData([]);
    setLoadingGif(1);
    searchText.current.style.background = `white`;
  };
  useEffect(() => {
    function fonksiyon() {
      if (visibility && localStorage.getItem("search") != undefined) {
        var x = JSON.parse(localStorage.getItem("search"));
        setSearchComplateData(x);
      }
    }
    fonksiyon();
  }, [visibility]);
  useEffect(() => {
    if (searchData.search.length < 1) {
      setLoadingGif(0);
    }
    if (searchData.search.length >= 1) {
      SearchUser(searchData)
        .then((res) => {
          setLoadingGif(0);
          setSearchComplateData(res.data.user);
          localStorage.setItem("search", JSON.stringify(res.data.user));
        })
        .catch((err) => {
        
        });
    } else {
      if (!visibility) {
        setSearchComplateData([]);
      }
    }
  }, [searchData]);

  useEffect(() => {
    if (userData.user != null) {
      setUserName(userData.user.user.username);
      setProfilePhoto(userData.user.user.photo);
    } else {
      setProfilePhoto();
      setUserName();
    }
  }, [userData]);
  const myRef = useRef();

  const searchText = useRef();
  const loadingRef = useRef();
  const handleClickOutside = (e) => {
    if (e.target != null && myRef.current != null) {
      setVisibility(false);

      setTemp(searchData.search);
      setSearchData({ ...searchData, search: "" });
      searchText.current.classList.add(NavbarCSS.inputBg);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });
  return (
    <div className={NavbarCSS.Navbar}>
      <div className={NavbarCSS.ustTaraf}>
        <div className="companyName">
          <NavLink to="/">
            {" "}
            <img
              src={Webrate}
              alt="Webrate Logo"
              style={{ width: "90px", height: "90px" }}
            />{" "}
            <span style={{ fontWeight: "600", fontSize: "20px" }}>WebRate</span>
          </NavLink>
        </div>

        <div
          style={{
            width: "30vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "right",
            height: "100%",
          }}
        >
          <div className={NavbarCSS.ratingButton}>
            {userData.user != null && (
              <NavLink to="/Rating">Değerlendir</NavLink>
            )}
          </div>
          {!userData.user && (
            <div
              className={NavbarCSS.loginButton}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "auto",
              }}
            >
              <NavLink className="text-decoration-none dropMenu" to={"Login"}>
                Giriş Yap
              </NavLink>
            </div>
          )}
          {userData.user?.user?.isAdmin && (
            <div
              style={{
                width: "20px",
                height: "20px",
                margin: "0px 10px 0px 10px",
                cursor: "pointer",
              }}
              onClick={() => {
                setSikayetToggle(!sikayetToggle);
                Sikayetler().then((res) => {
                  setSikayetler(res.data);
                });
              }}
            >
              <Alarm style={{ width: "20px", height: "20px", fill: "white" }} />
            </div>
          )}
          {userData.user?.user?.isAdmin && sikayetToggle && (
            <div
              style={{
                position: "absolute",
                top: "40%",
                left: "30%",
                height: "auto",
                width: "40%",
                backgroundColor: "var(--c8)",
                color: "white",
                minHeight: "30px",
                zIndex: 2,
                border: "0.5px solid",
                borderRadius: "5px",
                padding: "3px",
              }}
            >
              {sikayetler.length < 1 && <div>Şikayet listesi boş.</div>}
              {sikayetler.map((data, key) => {
                return <Sikayet ratesId={data.rate} key={key} />;
              })}
            </div>
          )}
          {userData && (
            <div
              className={NavbarCSS.accountBar}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <ul style={{ height: "100%" }}>
                <li
                  style={{
                    width: "auto",
                    height: "70%",
                    cursor: "pointer",
                    marginTop: "30px",
                    position: "relative",
                  }}
                >
                  {" "}
                  {profilePhoto && (
                    <img
                      style={{
                        height: "45px",
                        width: "45px",

                        borderRadius: "50%",
                        marginLeft: "10px",
                      }}
                      src={require(`../../../server/uploads/${profilePhoto}`)}
                      alt="ProfilePhoto"
                    ></img>
                  )}
                  <ul>
                    <li
                      style={{
                        position: "absolute",
                        top: "0px",
                        left: "-100px",
                        height: "30px",
                      }}
                    >
                      <NavLink
                        className="text-decoration-none dropMenu"
                        to={"/Account/" + username}
                      >
                        Hesabım{" "}
                      </NavLink>
                    </li>
                    <li
                      style={{
                        position: "absolute",
                        top: "30px",
                        left: "-100px",
                        height: "30px",
                      }}
                    >
                      <NavLink
                        className="text-decoration-none dropMenu"
                        to={"/myRatings"}
                      >
                        Değerlendirmeler{" "}
                      </NavLink>
                    </li>
                    {userData != null && (
                      <li
                        style={{
                          position: "absolute",
                          top: "60px",
                          left: "-100px",
                          height: "30px",
                        }}
                      >
                        <NavLink
                          className="text-decoration-none dropMenu"
                          to={""}
                          onClick={logoutClick}
                        >
                          Çıkış Yap{" "}
                        </NavLink>
                      </li>
                    )}
                  </ul>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
