import React from "react";
import "../css/Footer.css";

const Footer = () => {
  return (
    <footer
      className="text-center text-lg-start text-white"
      style={{ backgroundColor: "#1c2331" }}
    >
      <section
        className="d-flex justify-content-between p-4 "
        style={{ backgroundColor: "#6C63FF" }}
      >
        <div className="me-5 mt-2">
          <span>Sosyal ağlarda bizimle bağlantı kurun:</span>
        </div>

        <div>
          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <i className="fab fa-facebook-f"></i>
          </a>

          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <i className="fab fa-twitter"></i>
          </a>

          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <i className="fab fa-google"></i>
          </a>

          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <i className="fab fa-instagram"></i>
          </a>

          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>

          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <i className="fab fa-github"></i>
          </a>
        </div>
      </section>

      <section className="">
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-6 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold">Hakkımızda</h6>
              <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={{
                  width: "60px",
                  backgroundColor: "#7c4dff",
                  height: "2px",
                }}
              />
              <p>
                Bu sayfa Zonguldak Bülent Ecevit Üniversite Bilgisayar
                Mühendisliği 4.Sınıfı öğrencilerin tarafından bitirme projesi
                olarak yapılmıştır. Bu projenin amacı insanların kullandıkların
                websitelerindeki kullanıcı deneyimlerini topluluklara
                aktarmasıdır.
              </p>
            </div>

            <div className="col-md-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold">Contact</h6>
              <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={{
                  width: "60px",
                  backgroundColor: "#7c4dff",
                  height: "2px",
                }}
              />
              <p>
                <i className="fas fa-home mr-3"></i> Zonguldak / Beü
              </p>
              <p>
                <i className="fas fa-envelope mr-3"></i> mail@mail.com
              </p>
              <p>
                <i className="fas fa-phone mr-3"></i> 0000 000 0000
              </p>
            </div>

            <div className="col-md-3  mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold">Emeği Geçenler</h6>
              <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={{
                  width: "60px",
                  backgroundColor: "#7c4dff",
                  height: "2px",
                }}
              />
              <p>İlkan Erdoğan</p>
              <p>Fazlı Cenk Bülbül</p>
              <p>İlkay Türkmen</p>
              <p>Hüseyin Şener</p>
            </div>
          </div>
        </div>
      </section>

      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        © 2023 Copyright:
        <a className="text-white" href="">
          All rights reserved.
        </a>
      </div>
    </footer>
  );
};

export default Footer;
