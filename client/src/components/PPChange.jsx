import React, { useEffect } from "react";
import { useState } from "react";
import { updatePP } from "../axios";
import "../css/NameChange.css";
import { ReactComponent as Icon } from "../assets/imageInput.svg";
import { useDispatch, useSelector } from "react-redux";

const PPChange = () => {
  const userDataRedux = useSelector((state) => state.users);


  const [formData, setFormData] = useState({
    filename: null,
  });
  const fileHandler = (evt) => {
    const f = evt.target.files[0];

    if (f) {
      const reader = new FileReader();
      reader.onload = ({ target: { result } }) => {
        setPreview(result);
      };
      setFormData({ ...formData, filename: f.name });

      reader.readAsDataURL(f);
    } else {
      setPreview(null);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.target);

    updatePP(data, token)
      .then((res) => {
        setToggle(false);
        setPreview(false);
        window.location.reload();
      })
      .catch((error) => {
       
      });
  };
  const [preview, setPreview] = useState("");
  const [toggle, setToggle] = useState(false);

  const [token, setToken] = useState();
  useEffect(() => {
    try {
      setToken(JSON.parse(localStorage.getItem("token")));
    } catch (err) {}
  }, []);

  return (
    <>
      <div
        className="setting"
        onClick={() => {
          setToggle(true);
        }}
      >
        {!toggle && <div className="changeButton">Profil resmini değiştir</div>}

        {toggle && (
          <div className="changeInput">
            <form
              encType="multipart/form-data"
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <label>
                <Icon
                  style={{
                    height: "35px",
                    width: "35px",
                    padding: "5px",
                    fill: "var(--cb)",
                  }}
                ></Icon>
                <input
                  type="file"
                  accept="image/*"
                  name="file"
                  style={{ borderRadius: 10, display: "none" }}
                  onChange={fileHandler}
                />
              </label>
              <button
                type="submit"
                style={{
                  height: "25px",
                  width: "70px",
                  color: "var(--cb)",
                  border: "1px solid var(--cb)",
                  backgroundColor: "white",
                }}
              >
                {" "}
                Bitir
              </button>
            </form>
            <div className="space"></div>

            <div className="space"></div>
            <div
              className="buttons"
              style={{ color: "gray" }}
              onClick={(e) => {
                setToggle(false);
                setPreview(false);
                e.stopPropagation();
              }}
            >
              X
            </div>
          </div>
        )}
      </div>
      {preview ? (
        <div className="preview">
          <div className="prevContainer">
            <img src={preview}></img>
            <div>Profil resmini değiştirmek için Bitir butonuna tıkla </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default PPChange;
