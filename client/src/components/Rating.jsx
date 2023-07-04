import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import ReactQuill from "react-quill";
import "../../node_modules/react-quill/dist/quill.snow.css";
import NavbarCSS from "../css/Navbar.module.css";
import { CreateQuestioner } from "../axios/index";
import "../css/Post.css";
import starLogo from "../assets/blackStar.svg";
import starLogoYellow from "../assets/yellowStar.svg";
import "prismjs/themes/prism-tomorrow.css";
import "../css/CreateQuestion.css";
import { useNavigate } from "react-router-dom";
import { SearchUser } from "../axios/index";

import Loading from "../assets/refresh.png";
import defaultLogo from "../assets/defaultWebsiteLogo.svg";
import metaTags from "../metaTags";
const Rating = () => {
  const navi = useNavigate();
  const [starRating, setStarRating] = useState(0);
  const [searchData, setSearchData] = useState({ search: "" });

  const [visibility, setVisibility] = useState(0);
  const [loadingGif, setLoadingGif] = useState(0);
  const [searchComplateData, setSearchComplateData] = useState([]);
  const searchHandler = (e) => {
    setSearchData({ ...searchData, search: e.target.value });
    setFormData({ ...formData, baslik: e.target.value });
    setSearchComplateData([]);
    setLoadingGif(1);

    setIsClick(false);
    searchText.current.style.background = `white`;
    if (e.target.value.length < 1) {
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
        .catch((err) => {
       
        });
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

  useEffect(() => {
    if (searchComplateData.length > 0) {
      setVisibility(1);
    } else {
      setVisibility(false);
    }
  }, [searchComplateData]);
  const [formData, setFormData] = useState({
    baslik: "",
    yazi: "Birşey yaz",

    starRating: 0,
  });
  const [buttonText, setButtonText] = useState("Paylaş");
  const [status, setStatus] = useState();
  const [token, setToken] = useState();
  const [isClick, setIsClick] = useState(false);

  useEffect(() => {
    setToken(JSON.parse(localStorage.getItem("token")));
  }, []);
  useEffect(() => {
  
  }, [formData]);
  useEffect(() => {
    setFormData({ ...formData, starRating });
  }, [starRating]);
  metaTags("Değerlendir", "Değerlendirme yap ve insanlarla paylaş");
  return (
    <div style={{ marginTop: "10vh" }} className="createQuestion">
      <br />

      {status === 1 && (
        <div style={{ color: "var(--cb)", margin: "0 auto", width: "200px" }}>
          {" "}
          İşlem Başarılı{" "}
        </div>
      )}
      {status === 0 && (
        <div style={{ color: "red", margin: "0 auto", width: "200px" }}>
          İşlem Başarısız.
        </div>
      )}
      {status === 2 && (
        <div style={{ color: "red", margin: "0 auto", width: "200px" }}>
          Yasaklı kelimeler kullanıyorsunuz. Lütfen biraz kibar ol!
        </div>
      )}
      <br />
      <form
        style={{ width: "70vw", marginLeft: "15vw" }}
        encType="multipart/form-data"
        onSubmit={(e) => {
          e.preventDefault();
          setButtonText("Paylaşılıyor...");

          CreateQuestioner(formData, token)
            .then((res) => {
              if (res.status === "200") {
                setStatus(1);

                setTimeout(() => {
                  setStatus(null);
                 
                }, 1500);
              } else {
                setStatus(1);
                setTimeout(() => {
                  setStatus(null);
                  navi("/");
                }, 1500);
              }
              setButtonText("Paylaş");
            })
            .catch((error) => {
              if (error.response.status === 403) {
                setStatus(2);

                setTimeout(() => {
                  setStatus(null);
                  setButtonText("Paylaş");
                }, 1500);
              } else {
               
                setButtonText("Paylaş");
                setStatus(0);
                setTimeout(() => {
                  setStatus(null);
                }, 1500);
              }
            });
        }}
      >
        <div className="form-group">
          <span>https://www.</span>
          <input
            className="form-field"
            name="search"
            type="text"
            onChange={searchHandler}
            autoComplete="off"
            value={formData.baslik}
            ref={searchText}
            minLength="3"
            maxLength="60"
            placeholder="domain.com"
          />{" "}
          <div>
            {visibility === 1 && isClick === false ? (
              <div
                style={{
                  zIndex: "99",
                  position: "absolute",
                  backgroundColor: "white",

                  color: "white",
                  height: "auto",
                  maxHeight: "300px",
                  width: "calc(100% - 110px)",
                  top: "43px",
                  left: "110px",

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
                    <div
                      style={{
                        zIndex: "99",
                        color: "black",
                        cursor: "pointer",
                      }}
                      key={key}
                      onClick={() => {
                        setFormData({
                          ...formData,
                          baslik: data.domain,
                        });
                        setVisibility(0);
                        setIsClick(true);
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
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
                          {(data.starRating / data.ratingNumber).toFixed(1)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>

        <br />

        <div className="stars">
          {[...Array(5)].map((e, i) => {
            if (i >= starRating) {
              return (
                <div
                  className="star"
                  key={i}
                  onClick={(e) => {
                    setStarRating(i + 1);
                  }}
                >
                  <img src={starLogo} alt="" />
                </div>
              );
            } else {
              return (
                <div
                  className="star"
                  key={i}
                  onClick={(e) => {
                    setStarRating(i + 1);
                  }}
                >
                  <img src={starLogoYellow} alt="" />
                </div>
              );
            }
          })}
        </div>

        <br />
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          style={{
            width: "100%",
            margin: "auto",
            marginBottom: "0px",
            color: "1f2833",
            backgroundColor: "white",
            borderRadius: "5px",
          }}
          onChange={(e) => {
            setFormData({
              ...formData,
              yazi: e,
            });
          }}
        />

        <Button
          variant="primary"
          type="submit"
          className="createQuestionButton"
          style={{
            backgroundColor: "var(--cb)",
            float: "right",
            marginTop: "1vh",
            width: "15vw",
            borderRadius: "5px",
          }}
        >
          {buttonText}
        </Button>
      </form>
    </div>
  );
};
const modules = {
  toolbar: [[{ header: [1, 2, false] }], ["bold"], ["image"]],
};

const formats = [
  "italic",
  "underline",
  "header",
  "bold",
  "image",
  "code-block",
];

export default Rating;
