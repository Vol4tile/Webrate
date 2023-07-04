import React from "react";
import defaultLogo from "../assets/defaultWebsiteLogo.svg";
import { memo } from "react";
import { NavLink } from "react-router-dom";
const BestSite = ({ data, rank }) => {
  return (
    <NavLink className={"bestSiteLink bestSite"} to={"Site/" + data._id.domain}>
      <div className="innerBestSite">
        <div>
          <img
            src={
              data._id.logo
                ? require(`../../../server/uploads/${data._id.logo}`)
                : defaultLogo
            }
            alt=""
            height="100px"
            width="100px"
            style={{ padding: "10px" }}
          />
        </div>
        <div>
          <div>
            <h5>
              {rank}. {data._id.domain}
            </h5>
          </div>
          <div>
            <i data-star={data.avgRate.toFixed(1)}></i>
            {` `} {data.avgRate.toFixed(1)}
          </div>
        </div>
      </div>
      <div className="text">
        <p>{data.rateCount} kullanıcı tarafından değerlendirildi.</p>
        <p></p>
      </div>
    </NavLink>
  );
};

export default memo(BestSite);
