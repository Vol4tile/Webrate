import React from "react";
import parse from "html-react-parser";
import starLogo from "../assets/blackStar.svg";
import { memo } from "react";
import starLogoYellow from "../assets/yellowStar.svg";
import LinkLogo from "../assets/toLink.svg";
import defaultLogo from "../assets/defaultWebsiteLogo.svg";
import { Link } from "react-router-dom";
const Mycard = ({ data, cardNo }) => {
  const star = data.starRating;

  return (
    <div className="mycard">
      <div className="cardUser">
        <img
          src={require(`../../../server/uploads/${data.user_doc[0].photo}`)}
          alt=""
          height="50px"
          width="50px"
        />
        <div className="userName">
          <Link to={`Account/${data.user_doc[0].username}`}>
            {data.user_doc[0].fullname}
          </Link>
        </div>
      </div>
      <div className="comment">{parse(data.rates.comment)}</div>
      <div>
        <div className="stars">
          {[...Array(5)].map((e, i) => {
            if (i >= star) {
              return (
                <div className="star" key={i}>
                  <img src={starLogo} alt="" />
                </div>
              );
            } else {
              return (
                <div className="star" key={i}>
                  <img src={starLogoYellow} alt="" />
                </div>
              );
            }
          })}
        </div>
      </div>
      <div className="forSite">
        <img
          src={
            data.logo
              ? require(`../../../server/uploads/${data.logo}`)
              : defaultLogo
          }
          alt=""
          height="30px"
          width="30px"
          style={{ padding: "0px 5px 0px 5px" }}
        />
        <Link to={`Site/${data.domain}`}>
          {data.domain}
          <img src={LinkLogo} alt="" height="20x" width="20px" />
        </Link>
      </div>
    </div>
  );
};

export default memo(Mycard);
