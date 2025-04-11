import { useState, useEffect } from "react";
import LOGO from "../assets/Ogera_Logo.png";
import "../style/Home.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 992
  );

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener("resize", handleResize);
    
    // Clean up event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isDesktop = windowWidth >= 992;

  // Create a style object for mobile links with !important
  const mobileNavLinkStyle = {
    padding: "15px 20px",
    borderBottom: "1px solid #e9ecef",
    color: "red !important", // Using CSS !important flag with string
    textDecoration: "none",
    display: "block",
    fontSize: "16px"
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          {/* Logo */}
          <a className="navbar-brand" href="#">
            <img
              src={LOGO} 
              alt="Ogera Logo"
              style={{
                height: "50px", 
                width: "auto",  
              }}
            />
          </a>
          
          {/* Hamburger menu button for mobile */}
          {!isDesktop && (
            <button
              className="navbar-toggler"
              type="button"
              onClick={toggleMenu}
              aria-controls="navbarNav"
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          )}

          {/* Desktop Navigation */}
          {isDesktop && (
            <div className="collapse navbar-collapse show" id="navbarNav">
              <div className="navbar-nav">
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
                <a className="nav-link" href="/Shop">
                  Shop
                </a>
                <a className="nav-link" href="/Aboutus">
                  About Us
                </a>
                <a className="nav-link" href="/Support" tabIndex="-1" aria-disabled="true">
                  Support
                </a>
              </div>
            </div>
          )}
        </div> 
      </nav>

      {/* Mobile Navigation Menu */}
      {!isDesktop && isMenuOpen && (
        <div 
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            width: "100%", 
            backgroundColor: "#ffffff",
            zIndex: 1000,
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
          }}
        >
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            <li>
              <a 
                href="/"
                style={{...mobileNavLinkStyle}}
              >
                <span style={{ color: "red" }}>Home</span>
              </a>
            </li>
            <li>
              <a 
                href="/Shop"
                style={{...mobileNavLinkStyle}}
              >
                <span style={{ color: "red" }}>Shop</span>
              </a>
            </li>
            <li>
              <a 
                href="/Aboutus"
                style={{...mobileNavLinkStyle}}
              >
                <span style={{ color: "red" }}>About Us</span>
              </a>
            </li>
            <li>
              <a 
                href="/Support"
                style={{...mobileNavLinkStyle, borderBottom: "none"}}
              >
                <span style={{ color: "red" }}>Support</span>
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;