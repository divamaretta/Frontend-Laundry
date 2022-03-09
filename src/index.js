import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//import Transaksi from './pages/Transaksi';
//import FormTransaksi from './pages/FormTransaksi';
//import Navbar from './components/Navbar';


import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.bundle"

//import Member from "./pages/Member";
//import Paket from "./pages/Paket";
//import User from "./pages/User";
import Login from "./pages/Login";
//import NotFound from "./notfound";
//import header from "./header.js";
//import Footer from './footer';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
