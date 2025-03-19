import "../style/Home.css";
import LOGO from "../assets/Ogera_Logo.png";

const Header = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          {/* Replace "Ogera" with the logo image */}
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
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav" 
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav"> 

            <div className="navbar-nav">
              <a className="nav-link active" aria-current="page" href="/">
                Home
              </a>
              <a className="nav-link" href="/Shop" >
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
        </div>
      </nav>
    </div>
  );
};

export default Header