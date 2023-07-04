import React, { useEffect } from "react";
import { Form, Button, Container, FloatingLabel } from "react-bootstrap";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../actions/userData/user";
import googleLogo from "../assets/google.svg";
import appleLogo from "../assets/apple.svg";
import loginCSS from "../css/Login.module.css";
const Login = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [buttonText, setButtonText] = useState("Giriş Yap");

  const userDataError = useSelector((state) => state.users.errorHandler);
  const userDataSucces = useSelector((state) => state.users.succes);
  const navi = useNavigate();
  const [firstTry, setFirstTry] = useState(true);
  useEffect(() => {
    if (userDataSucces) {
      setButtonText("Giriş Yapıldı");

      navi("/");
    }
  }, [userDataSucces]);
  useEffect(() => {
    if (userDataError && !firstTry) {
      setButtonText("Tekrar Deneyiniz");
      setTimeout(() => {
        setButtonText("Giriş Yap");
      }, 1500);
    }
  }, [userDataError]);
  useEffect(() => {
    setTimeout(() => {
      setFirstTry(false);
    }, 1500);
  }, []);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
        fontFamily: "cursive",
      }}
      className={loginCSS.login}
    >
      <Container
        style={{
          backgroundColor: "white",
          minWidth: "20vw",
          paddingBottom: 30,
          borderRadius: 22,
          width: 400,
          boxShadow: "rgba(0, 0, 0, 0.5) 0px 5px 10px",
        }}
      >
        <div
          style={{
            width: "100%",
            margin: "auto",
            paddingTop: 30,
            fontWeight: 600,
            color: "var(--cb)",
          }}
        >
          Giriş Yap
        </div>
        <br />
        <div>Giriş yap ve kullanıcı deneyimi paylaş.</div>

        {userDataSucces && (
          <div style={{ color: "green" }}>
            İşlem Başarılı Anasayfaya yönlendiriliyorsunuz{" "}
          </div>
        )}

        <Form
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(getUserData(formData));
          }}
          style={{ paddingTop: "20px" }}
        >
          <FloatingLabel
            controlId="floatingInputs"
            label="Kullanıcı adı"
            className="mb-3 mt-3"
          >
            <Form.Control
              minLength="5"
              maxLength="30"
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              type="text"
              placeholder="Username"
              style={{ borderRadius: "10px" }}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingPasswords"
            label="Şifre"
            className="mb-3"
          >
            <Form.Control
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              type="password"
              placeholder="Password"
              style={{ borderRadius: "10px" }}
              minLength="8"
              maxLength="50"
            />
          </FloatingLabel>
          <div className="d-grid gap-2">
            <Button
              size="lg"
              type="submit"
              style={{
                backgroundColor: "var(--cb)",
                borderRadius: "10px",
                border: "none",
              }}
              onClick={() => {
                if (formData.username.length > 7 && formData.password.length)
                  setButtonText("Giriş Yapılıyor...");
              }}
            >
              {buttonText}
            </Button>
            <Form.Text className="text-center " style={{ marginTop: 20 }}>
              Bir hesabın yok mu ? <Link to="/Register">Kayıt ol</Link>
            </Form.Text>
          </div>
        </Form>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <span
            style={{ borderTop: "1px solid var(--cb)", width: "30%" }}
          ></span>
          <span style={{ margin: 10, color: "var(--cb)" }}> Ya da </span>
          <span
            style={{ borderTop: "1px solid var(--cb)", width: "30%" }}
          ></span>
        </div>
        <div>
          <Button
            size="lg"
            type="submit"
            className={loginCSS.google}
            style={{
              width: "80%",

              backgroundColor: "white",
              borderRadius: "10px",
              border: "1px solid #47B5FF",
              color: "#47B5FF",
              display: "flex",
              alignItems: "center",
              margin: "auto",
              marginTop: 20,
            }}
          >
            <img style={{ height: 30, marginRight: 20 }} src={googleLogo}></img>
            Google ile giriş yap
          </Button>
          <Button
            className={loginCSS.apple}
            size="lg"
            type="submit"
            style={{
              width: "80%",
              display: "flex",
              alignItems: "center",
              margin: "auto",
              marginTop: 10,
              backgroundColor: "white",
              borderRadius: "10px",
              border: "1px solid black",
              color: "black",
            }}
          >
            <img style={{ height: 30, marginRight: 20 }} src={appleLogo}></img>
            Apple ile giriş yap
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default Login;
