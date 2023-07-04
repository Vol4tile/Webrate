import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  AdminChangeLogo,
  DeleteRating,
  getWebsite,
  getWebsiteComments,
} from "../axios";
import css from "../css/Site.module.css";
import { Form } from "react-bootstrap";
import { SikayetEt } from "../axios";
import imageInput from "../assets/imageInput.svg";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const SitePage = () => {
  const { domain } = useParams();
  const [site, setSite] = useState();
  const [isDone, setIsDone] = useState(false);
  const [rates, setRates] = useState([]);
  const [offset, setOffset] = useState(10);

  const userData = useSelector((state) => state.users);

  
  function formatDate(string) {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
  }
  useEffect(() => {
    getWebsite(domain)
      .then((res) => {
        if (res.status == 200) {
          setSite(res.data);

          setRates(res.data.rates);
        } else {
          
        }
      })
      .catch((error) => {
       
      });
  }, []);
  let handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      getWebsiteComments(domain, offset)
        .then((res) => {
          if (res.status == 200) {
            if (res.data.rates.length > 0) {
              res.data.rates.map((data) => {
                return setRates((rates) => [...rates, data]);
              });

              setOffset(offset + 10);
            }
          } else {
            
          }
        })
        .catch((error) => {
       
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    const data = new FormData(e.target);
    data.append("domain", site.domain);
   
    AdminChangeLogo(data)
      .then((res) => {
      
      })
      .catch((error) => {
       
      });
  };
  return (
    <>
      {site && (
        <div className={css.container} onScroll={handleScroll}>
          <div className={css.website}>
            <div className={css.siteLogo}>
              <img
                src={require(`../../../server/uploads/${site.logo}`)}
                alt=""
              />
              {userData?.user?.user?.isAdmin && (
                <Form encType="multipart/form-data" onSubmit={handleSubmit}>
                  <Form.Group controlId="formFile">
                    <Form.Label>
                      <img
                        src={imageInput}
                        alt="changeImage"
                        style={{
                          width: "25px",
                          height: "25px",
                          position: "absolute",
                          top: "0",
                          right: "0",
                          cursor: "pointer",
                        }}
                      />
                      <Form.Control
                        type="file"
                        accept="image/*"
                        name="file"
                        style={{ display: "none" }}
                      />
                    </Form.Label>
                  </Form.Group>
                  <button type="submit">Tamamla</button>
                </Form>
              )}
            </div>
            <div className={css.siteInfo}>
              <div className={css.siteDomain}>{site.domain}</div>
              <div className={css.siteStar}>
                <i
                  data-star={(site.starRating / site.ratingNumber).toFixed(1)}
                ></i>
                {` `} {(site.starRating / site.ratingNumber).toFixed(1)}
              </div>
              <div className={css.date}>
                <span> {formatDate(site.createDate)}</span> tarihinden itibaren{" "}
                <span>{site.ratingNumber}</span> kez değerlendirildi.
              </div>
            </div>
          </div>
          <div className={css.Rates}>
            {rates.map((data, key) => {
              return (
                <div className={css.rate} key={key}>
                  <div className={css.rater}>
                    <div className={css.raterPhoto}>
                      <img
                        style={{ width: "50px", height: "50px" }}
                        src={require(`../../../server/uploads/${data.rater.photo}`)}
                        alt=""
                      />
                    </div>
                    <div>
                      <div>
                        <Link to={`../Account/${data.rater.username}`}>
                          {data.rater.fullname}
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className={css.comment}>{parse(data.comment)}</div>
                  <div className={css.star}>
                    <i data-star={data.rate}></i>
                    {` `}{" "}
                    <span style={{ color: "var(--cb)" }}>{data.rate}</span>
                  </div>
                  <div className={css.createDate}>
                    <div> {formatDate(data.createDate)}</div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                      }}
                    >
                      {userData?.user?.user?.isAdmin && (
                        <div
                          style={{ color: "red", cursor: "pointer" }}
                          onClick={() => {
                            var ratesId = data._id;
                            DeleteRating({ ratesId })
                              .then((res) => {
                             
                                const newRates = [...rates];
                                newRates.splice(key, 1);
                                setRates(newRates);
                              })
                              .catch((error) => {
                              
                              });
                         
                          }}
                        >
                          Sil
                        </div>
                      )}
                      {userData?.user?.user && (
                        <div
                          style={{ color: "grey", cursor: "pointer" }}
                          onClick={() => {
                            var ratesId = data._id;
                            SikayetEt({ ratesId })
                              .then((res) => {
                            
                                setIsDone(true);
                                setTimeout(() => {
                                  setIsDone(false);
                                }, 1500);
                              })
                              .catch((error) => {
                               
                              });
                         
                          }}
                        >
                          Şikayet Et
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div
            style={{
              color: "green",
              position: "absolute",
              bottom: 0,
              display: isDone ? "block" : "none",
            }}
          >
            Şikayet Edildi
          </div>
        </div>
      )}
    </>
  );
};

export default SitePage;
