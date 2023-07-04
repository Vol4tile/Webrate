import React, { useEffect, useRef, useState } from "react";
import BestSite from "./BestSite";
import { Link } from "react-router-dom";
import defaultLogo from "../assets/defaultWebsiteLogo.svg";
import { GetBestSites, GetQuestions } from "../axios";

import illustratedOne from "../assets/illus1.svg";
import illustratedTwo from "../assets/illus2.svg";
import illustratedThree from "../assets/illus3.svg";
import NavbarCSS from "../css/Navbar.module.css";
import metaTags from "../metaTags";
import Loading from "../assets/refresh.png";
import Footer from "./Footer";

import Mycard from "./Mycard.jsx";

import { SearchUser } from "../axios";
import "../css/Main.css";
const Main = () => {
  let box = document.querySelector(".product-container");
  metaTags("Anasayfa", "Kullanıcı deneyimlerine ulaş.");

  const btnpressprev = () => {
    let width = box.clientWidth;
    box.scrollLeft = box.scrollLeft - width;

    if (box.scrollLeft == 0) {
      box.scrollLeft = 2000;
    }
  };

  const btnpressnext = () => {
    let width = box.clientWidth;
    box.scrollLeft = box.scrollLeft + width;

    if (box.scrollLeft > 1200) {
      box.scrollLeft = 0;
    }
  };
  let userData = null;
  try {
    userData = JSON.parse(localStorage.getItem("user"));
  } catch {
    localStorage.removeItem("user");
  }
  const [searchData, setSearchData] = useState({ search: "" });

  const [visibility, setVisibility] = useState(0);
  const [loadingGif, setLoadingGif] = useState(0);
  const [searchComplateData, setSearchComplateData] = useState([]);

  const [bestSites, setBestSites] = useState([]);
  const [lastRatings, setLastReytings] = useState([]);

  useEffect(() => {
    GetBestSites()
      .then((res) => {
        if (res.status == 200) {
          setBestSites(res.data);
        } else {
        }
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    GetQuestions()
      .then((res) => {
        if (res.status == 200) {
          setLastReytings(res.data.latest);
        } else {
        }
      })
      .catch((error) => {});
  }, []);

  const searchHandler = (e) => {
    setSearchData({ ...searchData, search: e.target.value });
    setSearchComplateData([]);
    setLoadingGif(1);

    searchText.current.style.background = `white`;
    if (e.target.value.length < 1) {
      searchText.current.classList.add(NavbarCSS.inputBg);
      searchText.current.classList.remove(NavbarCSS.focusedSearch);
      setVisibility(0);
    }
  };

  useEffect(() => {
    if (searchData.search.length < 1) {
      setLoadingGif(0);
    }
    if (searchData.search.length >= 1) {
      SearchUser(searchData)
        .then((res) => {
          setLoadingGif(0);
          setSearchComplateData(res.data.site);
        })
        .catch((err) => {});
    } else {
      if (!visibility) {
        setSearchComplateData([]);
      }
    }
    return () => {
      setLoadingGif(0);
      setSearchComplateData([]);
    };
  }, [searchData]);

  const myRef = useRef();

  const searchText = useRef();
  const loadingRef = useRef();
  const handleClickOutside = (e) => {
    if (
      e.target != null &&
      myRef.current != null &&
      !myRef.current.contains(e.target) &&
      searchText.current != null &&
      !searchText.current.contains(e.target)
    ) {
      setVisibility(false);
      searchText.current.classList.add(NavbarCSS.inputBg);
      searchText.current.classList.remove(NavbarCSS.focusedSearch);
      setSearchData({ ...searchData, search: "" });
    }
  };
  useEffect(() => {
    if (searchComplateData.length > 0) {
      searchText.current.classList.remove(NavbarCSS.inputBg);
      searchText.current.classList.add(NavbarCSS.focusedSearch);
      setVisibility(1);
    } else {
      setVisibility(false);
      searchText.current.classList.add(NavbarCSS.inputBg);
      searchText.current.classList.remove(NavbarCSS.focusedSearch);
    }
  }, [searchComplateData]);
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  return (
    <div className="main">
      <div
        style={{
          paddingTop: "0vh",
          margin: "0px",
          padding: "0px",
          color: "white",
          minHeight: "92vh",

          maxWidth: "1200px",
          margin: "auto",
          width: "100%",
          position: "relative",
        }}
      >
        <div style={{}} className={NavbarCSS.searchSection}>
          <div className={NavbarCSS.searchBar}>
            <div style={{ color: "var(--cb)", margin: "auto" }}>
              <h4>80.680 şikayet yüzlerce site</h4>
            </div>
            <div
              className={NavbarCSS.search}
              onBlur={(e) => {
                if (e.relatedTarget?.classList[0] !== "results") {
                }
              }}
            >
              <form style={{ position: "relative" }}>
                <div>
                  <input
                    type="text"
                    placeholder=" Ara..."
                    name="search"
                    onChange={searchHandler}
                    autoComplete="off"
                    value={searchData.search}
                    ref={searchText}
                    className={`${NavbarCSS.inputField} ${NavbarCSS.inputBg}`}
                  ></input>
                </div>
              </form>

              <div>
                {visibility === 1 ? (
                  <div
                    style={{
                      zIndex: "99",
                      position: "absolute",
                      backgroundColor: "white",

                      color: "white",

                      maxHeight: "300px",
                      width: "100%",
                      top: "60px",
                      left: "0px",
                      height: "auto",
                      border: "1px solid var(--cb)",
                      borderRadius: "2vh",
                      borderTop: "none",
                      borderTopRightRadius: "0px",
                      borderTopLeftRadius: "0px",
                      outline: "1px solid var(--cb)",
                      visibility: "auto",
                      wordW: "break-word",
                      overflowX: "auto",
                    }}
                    className={NavbarCSS.results}
                    ref={myRef}
                  >
                    {loadingGif === 1 && searchComplateData && (
                      <img
                        style={{
                          height: "30px",
                          width: "30px",
                          position: "relative",
                          top: "175px",
                        }}
                        ref={loadingRef}
                        className={`${NavbarCSS.spinner}  ${NavbarCSS.rotate}`}
                        src={Loading}
                        alt="loading"
                      ></img>
                    )}
                    {searchComplateData.map((data, key) => {
                      return (
                        <Link
                          key={key}
                          to={`Site/${data.domain}`}
                          params={data.domain}
                        >
                          <div style={{ zIndex: "99" }}>
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              {data.logo ? (
                                <img
                                  style={{
                                    maxHeight: "48px",
                                    maxWidth: "48px",
                                    borderRadius: "50%",
                                    margin: "5px",
                                    padding: "5px",
                                  }}
                                  src={require(`../../../server/uploads/${data.logo}`)}
                                  alt="ProfilePhoto"
                                ></img>
                              ) : (
                                <img
                                  style={{
                                    maxHeight: "48px",
                                    maxWidth: "48px",
                                    borderRadius: "50%",
                                  }}
                                  src={defaultLogo}
                                  alt="ProfilePhoto"
                                ></img>
                              )}
                              <div style={{ display: "block" }}>
                                <div> {data.domain}</div>
                                <i
                                  data-star={(
                                    data.starRating / data.ratingNumber
                                  ).toFixed(1)}
                                ></i>
                                {` `}{" "}
                                {(data.starRating / data.ratingNumber).toFixed(
                                  1
                                )}
                              </div>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            width: "100%",
            color: "black",
            height: "300px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "0px",
          }}
        >
          <div
            style={{
              marginRight: "10px",
              height: "300px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "200px",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img src={illustratedOne} width="100%" height="100%"></img>
            </div>
            <div>Bu sitede 10.000 şikayet bulunmaktadır.</div>
          </div>
          <div
            style={{
              marginRight: "10px",
              height: "300px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              padding: "10px0",
              borderRadius: "10px",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "200px",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img src={illustratedTwo} width="100%" height="100%"></img>
            </div>
            <div>Bu sitede 167 websitesi bulunmaktadır.</div>
          </div>
          <div
            style={{
              height: "300px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "200px",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img src={illustratedThree} width="100%" height="100%"></img>
            </div>
            <div>Bu sitede 10.000 kullanıcı bulunmaktadır.</div>
          </div>
        </div>
        <div className="carousel">
          <h3>
            En yeni <span style={{ color: "var(--cb)" }}>değerlendirmeler</span>{" "}
          </h3>

          <div className="product-carousel">
            <button className="pre-btn" onClick={btnpressprev}>
              <p>&lt;</p>
            </button>
            <button className="next-btn" onClick={btnpressnext}>
              <p>&gt;</p>
            </button>

            <div className="product-container">
              {lastRatings.map((i, key) => {
                return <Mycard data={i} cardNo={key + 1} key={key}></Mycard>;
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="bestSites">
        <h3
          style={{ width: "fit-content", margin: "auto", paddingTop: "20px" }}
        >
          En iyi siteler
        </h3>

        {bestSites.map((data, key) => {
          return <BestSite data={data} rank={key + 1} key={key}></BestSite>;
        })}
      </div>

      <Footer />
    </div>
  );
};

export default Main;
