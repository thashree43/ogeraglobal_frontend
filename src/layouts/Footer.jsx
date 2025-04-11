import React, { useState } from "react";
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
  faEnvelope,
  faChevronDown,
  faChevronUp
} from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  // State for mobile accordions
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    if (openSection === section) {
      setOpenSection(null);
    } else {
      setOpenSection(section);
    }
  };

  return (
    <footer
      className="text-center md:text-left text-white w-full"
      style={{ backgroundColor: "#040404" }}
    >
      {/* Social media banner */}
      <section
        className="flex flex-col md:flex-row justify-between items-center p-3 md:p-4"
        style={{ backgroundColor: "#D1111C" }}
      >
        <div className="mb-3 md:mb-0 md:ml-4">
          <span className="text-sm md:text-base">Get connected with us on social networks:</span>
        </div>

        <div className="md:mr-4 flex space-x-4">
          <a
            href="https://www.facebook.com/share/1BFY79FyQi/?mibextid=wwXIfr"
            className="text-white hover:text-gray-200"
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a
            href="https://x.com/ogeraglobal"
            className="text-white hover:text-gray-200"
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a
            href="https://www.instagram.com/ogeraglobal?igsh=MXdlY200dWx4ZDU5aw=="
            className="text-white hover:text-gray-200"
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a
            href="https://www.linkedin.com/in/ogera-global-b5805b347/"
            className="text-white hover:text-gray-200"
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a
            href="https://youtube.com/@ogeraglobal?si=TYB-of4WCYY_KeCG"
            className="text-white hover:text-gray-200"
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="YouTube"
          >
            <FontAwesomeIcon icon={faYoutube} />
          </a>
        </div>
      </section>

      {/* Main footer content */}
      <section className="px-4 py-5 md:py-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Company Info - Always visible on mobile */}
            <div className="mb-6 md:mb-0">
              <h6 className="text-uppercase font-bold text-lg mb-2">Company</h6>
              <hr
                className="mb-4 mt-0 inline-block"
                style={{ width: "60px", backgroundColor: "#D1111C", height: "2px" }}
              />
              <p className="text-sm md:text-base">
                QUALITY OGERA INTERNATIONAL LLP<br />
                Door No.71423H, Kondotty,<br className="hidden md:block" />
                Kumminiparamaba PO,<br className="hidden md:block" />
                Malappuram, Kerala, 673638
              </p>
            </div>

            {/* Products Section - Collapsible on mobile */}
            <div className="mb-6 md:mb-0">
              <div 
                className="flex justify-between items-center cursor-pointer md:cursor-default"
                onClick={() => toggleSection('products')}
              >
                <h6 className="text-uppercase font-bold text-lg mb-2">Products</h6>
                <FontAwesomeIcon 
                  icon={openSection === 'products' ? faChevronUp : faChevronDown} 
                  className="md:hidden" 
                />
              </div>
              <hr
                className="mb-4 mt-0 inline-block"
                style={{ width: "60px", backgroundColor: "#D1111C", height: "2px" }}
              />
              <div className={`${openSection === 'products' || window.innerWidth >= 768 ? 'block' : 'hidden'} md:block`}>
                <p className="mb-2"><a href="/Shop" className="text-white hover:text-gray-300 text-sm md:text-base">Electronics</a></p>
                <p className="mb-2"><a href="/Shop" className="text-white hover:text-gray-300 text-sm md:text-base">Consumer Goods</a></p>
                <p className="mb-2"><a href="/Shop" className="text-white hover:text-gray-300 text-sm md:text-base">Technology</a></p>
                <p className="mb-2"><a href="/Shop" className="text-white hover:text-gray-300 text-sm md:text-base">View All Products</a></p>
              </div>
            </div>

            {/* Quick Links - Collapsible on mobile */}
            <div className="mb-6 md:mb-0">
              <div 
                className="flex justify-between items-center cursor-pointer md:cursor-default"
                onClick={() => toggleSection('links')}
              >
                <h6 className="text-uppercase font-bold text-lg mb-2">Quick Links</h6>
                <FontAwesomeIcon 
                  icon={openSection === 'links' ? faChevronUp : faChevronDown} 
                  className="md:hidden" 
                />
              </div>
              <hr
                className="mb-4 mt-0 inline-block"
                style={{ width: "60px", backgroundColor: "#D1111C", height: "2px" }}
              />
              <div className={`${openSection === 'links' || window.innerWidth >= 768 ? 'block' : 'hidden'} md:block`}>
                <p className="mb-2"><a href="/Aboutus" className="text-white hover:text-gray-300 text-sm md:text-base">About Us</a></p>
                <p className="mb-2"><a href="/careers" className="text-white hover:text-gray-300 text-sm md:text-base">Careers</a></p>
                <p className="mb-2"><a href="/Support" className="text-white hover:text-gray-300 text-sm md:text-base">Services</a></p>
                <p className="mb-2"><a href="/Support" className="text-white hover:text-gray-300 text-sm md:text-base">Contact Us</a></p>
              </div>
            </div>

            {/* Contact - Collapsible on mobile */}
            <div className="mb-6 md:mb-0">
              <div 
                className="flex justify-between items-center cursor-pointer md:cursor-default"
                onClick={() => toggleSection('contact')}
              >
                <h6 className="text-uppercase font-bold text-lg mb-2">Contact</h6>
                <FontAwesomeIcon 
                  icon={openSection === 'contact' ? faChevronUp : faChevronDown} 
                  className="md:hidden" 
                />
              </div>
              <hr
                className="mb-4 mt-0 inline-block"
                style={{ width: "60px", backgroundColor: "#D1111C", height: "2px" }}
              />
              <div className={`${openSection === 'contact' || window.innerWidth >= 768 ? 'block' : 'hidden'} md:block`}>
                <p className="mb-2">
                  <a 
                    href="https://www.google.com/maps?q=Kondotty,+Kerala+673638,+India" 
                    className="text-white hover:text-gray-300 text-sm md:text-base flex items-center"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon icon={faHouse} className="mr-2" /> 
                    <span className="truncate">Kondotty, Kerala</span>
                  </a>
                </p>
                
                <p className="mb-2">
                  <a 
                    href="mailto:info@ogera.com" 
                    className="text-white hover:text-gray-300 text-sm md:text-base flex items-center"
                  >
                    <FontAwesomeIcon icon={faEnvelope} className="mr-2" /> 
                    <span>info@ogera.com</span>
                  </a>
                </p>
                
                <p className="mb-2">
                  <a 
                    href="tel:+91XXXXXXXXXX" 
                    className="text-white hover:text-gray-300 text-sm md:text-base flex items-center"
                  >
                    <FontAwesomeIcon icon={faPhone} className="mr-2" /> 
                    <span>+91 XXXXXXXXXX</span>
                  </a>
                </p>

                <p className="mb-2">
                  <a 
                    href="/support" 
                    className="text-white hover:text-gray-300 text-sm md:text-base"
                  >
                    Customer Support
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Copyright */}
      <div
        className="text-center p-3 text-sm"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        © 2025 Copyright:{" "}
        <a className="text-white hover:text-gray-300" href="/">
          Quality Ogera International LLP
        </a>
      </div>
    </footer>
  );
};

export default Footer;