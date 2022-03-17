import React from "react";
import { Link } from "react-router-dom";

function Logout() {
  //remove data token dan user local storage
  localStorage.removeItem("user");
  localStorage.removeItem("token");
}

export default function Navbar(props) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">

        <div className="container">
          {/* brand */}
          <a className="navbar-brand"> La la laundry </a>

          {/* button toggler */}
          <button
            className="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#myNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* define menus */}
          <div className="collapse navbar-collapse" id="myNav">
            <ul className="navbar-nav me-auto mt-2 nt-lg-0">
            <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/member" className="nav-link">
                  Member
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/paket" className="nav-link">
                  Paket
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/user" className="nav-link">
                  User
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/transaksi" className="nav-link">
                  Transaksi
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/formtransaksi" className="nav-link">
                  Form Transaksi
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-link" onClick={() => Logout()}>
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {props.children}
    </div>
  );
}
