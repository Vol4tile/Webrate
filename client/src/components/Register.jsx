import React from "react";
import { FloatingLabel, Form, Button, Container } from "react-bootstrap";

import { useState } from "react";
import { Link } from "react-router-dom";
import { Kayit } from "../axios";
import { useNavigate } from "react-router-dom";
import "../css/Register.css";
const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    password: "",
    email: "",
    username: "",
    filename: null,
  });

  const [buttonText, setButtonText] = useState("Kaydı tamamla");

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
  
    Kayit(data)
      .then((res) => {
        if (res.status == 200) {
          setButtonText("Kayıt Başarılı Girişe yönlendiriliyorsunuz...");
          setTimeout(() => {
            navigate("/Login");
          }, 1500);
        } else setButtonText("Lütfen tekrar deneyin");
        setTimeout(() => {
          setButtonText("Kaydı tamamla");
        }, 1500);
      })
      .catch((error) => {
        setButtonText("Lütfen tekrar deneyin");
        setTimeout(() => {
          setButtonText("Kaydı tamamla");
        }, 1500);
      });
  };

  return (
    <div
      style={{
        margin: "auto",

        width: "100%",

        height: "92vh",
        borderRadius: 22,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      className="register"
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
        <div style={{ color: "var(--cb)", paddingTop: 30, fontWeight: 600 }}>
          Kaydol
        </div>
        <br />
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Websitelerini değerlendirmek için bize katıl.
        </div>
        <Form
          encType="multipart/form-data"
          onSubmit={handleSubmit}
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <FloatingLabel
            controlId="floatingPassword"
            label="İsim Soyisim"
            className="mb-3"
          >
            <Form.Control
              onChange={(e) =>
                setFormData({ ...formData, fullname: e.target.value })
              }
              type="text"
              placeholder="İsim Soyisim"
              name="fullname"
              minLength="5"
              maxLength="30"
              style={{ borderRadius: 10 }}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingUserName"
            label="Kullanıcı Adı"
            className="mb-3"
          >
            <Form.Control
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              type="text"
              placeholder="Kullanıcı Adı"
              name="username"
              minLength="5"
              maxLength="30"
              style={{ borderRadius: 10 }}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="E-mail"
            className="mb-3 mt-3"
          >
            <Form.Control
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              type="text"
              name="email"
              placeholder="name@example.com"
              style={{ borderRadius: 10 }}
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
              placeholder="Şifre"
              minLength="8"
              maxLength="50"
              name="password"
              style={{ borderRadius: 10 }}
            />
          </FloatingLabel>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Control
              type="file"
              accept="image/*"
              name="file"
              style={{ borderRadius: 10 }}
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button
              size="lg"
              type="submit"
              onClick={() => {
                setButtonText("İşlem sürüyor...");
              }}
              style={{
                backgroundColor: "var(--cb)",
                borderRadius: "10px",
                border: "none",
              }}
            >
              {buttonText}
            </Button>
            <Form.Text className="text-center" style={{ marginTop: 10 }}>
              Zaten bir hesabın var mı ? <Link to="/Login">Giriş Yap</Link>
            </Form.Text>{" "}
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default Register;
