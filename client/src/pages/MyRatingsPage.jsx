import React, { useEffect, useState } from "react";
import { getMyRatings } from "../axios";
import MyRatingsCSS from "./../css/MyRatings.module.css";
import parse from "html-react-parser";
import dateToString from "../dateToString";
const MyRatingsPage = () => {
  var token;
  const [ratings, setRatings] = useState([]);
  const [offset, setOffset] = useState(0);
  if (JSON.parse(localStorage.getItem("token"))) {
    token = JSON.parse(localStorage.getItem("token"));
  }
  useEffect(() => {
    if (token) {
      getMyRatings(token, offset).then((res) => {
        setRatings(res.data);
        setOffset(offset + 10);
      });
    }
  }, []);

  let handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      getMyRatings(token, offset)
        .then((res) => {
          if (res.status == 200) {
            if (res.data.length > 0) {
              res.data.map((data) => {
                setRatings((ratings) => [...ratings, data]);
              });

              setOffset(offset + 10);
            }
          } else {
          }
        })
        .catch((error) => {});
    }
  };
  return (
    <div className={MyRatingsCSS.container} onScroll={handleScroll}>
      <div className={MyRatingsCSS.innerContainer}>
        {ratings.map((data, key) => {
          return (
            <div key={key} className={MyRatingsCSS.rating}>
              <div className={MyRatingsCSS.site}>
                <div>
                  {data.logo && (
                    <img
                      src={require(`../../../server/uploads/${data.logo}`)}
                      alt="siteLogo"
                      style={{ padding: "5px", margin: "5px" }}
                    />
                  )}
                </div>
                <div>{data.domain}</div>
              </div>
              <div className={MyRatingsCSS.comment}>
                {parse(data.rates.comment)}
              </div>
              <div className={MyRatingsCSS.rate}>
                <i data-star={data.rates.rate.toFixed(1)}></i>
                {` `} {data.rates.rate.toFixed(1)}
              </div>
              <div className={MyRatingsCSS.date}>
                {dateToString(data.rates.createDate)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyRatingsPage;
