import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import {
  faHouse,
  faPhone,
  faEnvelope
} from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer
      className="text-center text-lg-start text-white w-100"
      style={{ backgroundColor: "#040404" }}
    >
      <section
        className="d-flex justify-content-between p-4"
        style={{ backgroundColor: "#D1111C" }}
      >
        <div className="me-5 ms-4">
          <span>Get connected with us on social networks:</span>
        </div>

        <div className="me-4">
          <a
            href="https://www.facebook.com/share/1BFY79FyQi/?mibextid=wwXIfr"
            className="text-white me-4"
            target="_blank" rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a
            href="https://x.com/ogeraglobal"
            className="text-white me-4"
            target="_blank" rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a
            href="https://www.instagram.com/ogeraglobal?igsh=MXdlY200dWx4ZDU5aw=="
            className="text-white me-4"
            target="_blank" rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a
            href="https://www.linkedin.com/in/ogera-global-b5805b347/"
            className="text-white me-4"
            target="_blank" rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a
            href="https://youtube.com/@ogeraglobal?si=TYB-of4WCYY_KeCG"
            className="text-white me-4"
            target="_blank" rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faYoutube} />
          </a>
        </div>
      </section>

      <section>
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold">Company</h6>
              <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={{ width: "60px", backgroundColor: "#D1111C", height: "2px" }}
              />
              <p>
                QUALITY OGERA INTERNATIONAL LLP<br />
                Door No.71423H, Kondotty,<br />
                Kumminiparamaba PO,<br />
                Malappuram, Kerala, 673638
              </p>
            </div>

            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold">Products</h6>
              <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={{ width: "60px", backgroundColor: "#D1111C", height: "2px" }}
              />
              <p><a href="/Shop" className="text-white">Electronics</a></p>
              <p><a href="/Shop" className="text-white">Consumer Goods</a></p>
              <p><a href="/Shop" className="text-white">Technology</a></p>
              <p><a href="/Shop" className="text-white">View All Products</a></p>
            </div>

            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold">Quick Links</h6>
              <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={{ width: "60px", backgroundColor: "#D1111C", height: "2px" }}
              />
              <p><a href="/Aboutus" className="text-white">About Us</a></p>
              <p><a href="/careers" className="text-white">Careers</a></p>
              <p><a href="/Support" className="text-white">Services</a></p>
              <p><a href="/Support" className="text-white">Contact Us</a></p>
            </div>

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold">Contact</h6>
              <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={{ width: "60px", backgroundColor: "#D1111C", height: "2px" }}
              />
              
              <p>
                <a href="https://www.google.com/maps?q=Kondotty,+Kerala+673638,+India" 
                   className="text-white" 
                   target="_blank" 
                   rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faHouse} style={{ color: "#e0e2e6" }} /> Kondotty, Kerala 673638, India
                </a>
              </p>
              
              <p>
                <a href="mailto:info@ogera.com" className="text-white">
                  <FontAwesomeIcon icon={faEnvelope} style={{ color: "#e2e6ee" }} /> info@ogera.com
                </a>
              </p>
              
              <p>
                <a href="tel:+91XXXXXXXXXX" className="text-white">
                  <FontAwesomeIcon icon={faPhone} style={{ color: "#f3f4f7" }} /> +91 XXXXXXXXXX
                </a>
              </p>

              <p>
                <a href="/support" className="text-white">
                  Customer Support
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        © 2025 Copyright:{" "}
        <a className="text-white" href="/">
          Quality Ogera International LLP
        </a>
      </div>
    </footer>
  );
};

export default Footer;
