import React from "react";
export default function Footer() {
  return (
    <>
      <footer className="bg-success text-white py-5 footer-fade-in mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-4 mb-md-0 text-center">
              <h3>Quick Links</h3>
              <ul className="list-unstyled">
                <li>
                  <a href="#" className="footer-link text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-4 mb-4 mb-md-0 text-center">
              <h3>Contact Us</h3>
              <p>Email: info@example.com</p>
              <p>Phone: +1 123-456-7890</p>
            </div>
            <div className="col-md-4 text-center">
              <h3>Follow Us</h3>
              <div className="social-icons d-flex align-items-center justify-content-center">
                {/* Add your social media icons here */}
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mr-3 social-icon"
                >
                  <i className="fab fa-twitter text-white mx-3"></i>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mr-3 social-icon"
                >
                  <i className="fab fa-facebook text-white mx-3"></i>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                >
                  <i className="fab fa-instagram text-white mx-3"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-4">
          <p>&copy; 2024 Weatherly App. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
