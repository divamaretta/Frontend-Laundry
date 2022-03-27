import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "./logo.png";

function Logout() {
  //remove data token dan user local storage
  localStorage.removeItem("user");
  localStorage.removeItem("token");
}

export default function Navbar(props) {
  let user = JSON.parse(localStorage.getItem("user"));
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          {/* brand */}
          <a href="/" className="navbar-brand">
            <img src={logo} class="img" width="50" />
          </a>

          {/* button toggler */}
          <button
            className="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#myNav"
          >
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
            </ul>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end text-dark pt-2">
              <i class="fa-solid fa-user mt-1"></i>
              Hi, {user.nama}
            </div>
            <div className="nav-item ">
              <div className="link mt-2">
                <Link to="/login" className="nav-link" onClick={() => Logout()}>
                  <i class="fa-solid fa-arrow-right-from-bracket"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {props.children}
    </div>
  );
}
