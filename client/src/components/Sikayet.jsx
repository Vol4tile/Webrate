import React, { useState } from "react";
import { useEffect } from "react";
import { BelirliSikayet, DeleteRating, SikayetSil } from "../axios";
import parse from "html-react-parser";
const Sikayet = ({ ratesId }) => {
  const [sikayet, setSikayet] = useState("");
  const [id, setId] = useState({});
  const [text, setText] = useState("Sil");
  const handleClick = () => {
    DeleteRating(id).then((res) => {
      SikayetSil({ ratesId }).then((res) => {
        setText("Silindi");
      });
    });
  };
  useEffect(() => {
    BelirliSikayet({ ratesId }).then((res) => {
      setSikayet(res.data.rate);
    });
  }, []);
  useEffect(() => {
    setId({ ratesId });
  }, []);
  useEffect(() => {}, [id]);
  return (
    <div>
      <div
        style={{
          backgroundColor: "white",
          padding: "5px",
          border: "1px solid var(--cb)",
          color: "var(--cb)",
        }}
      >
        <i data-star={sikayet.rate}></i>

        {sikayet.comment && parse(sikayet.comment)}

        <div style={{ cursor: "pointer", color: "red" }} onClick={handleClick}>
          {text}
        </div>
      </div>
    </div>
  );
};

export default Sikayet;
