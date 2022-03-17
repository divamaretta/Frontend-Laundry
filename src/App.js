import React from "react";
import NotFound from "./notfound";
import Member from "./pages/Member";
import Paket from "./pages/Paket";
import User from "./pages/User";
import FormTransaksi from "./pages/FormTransaksi";
import Login from "./pages/Login";
import header from "./header";
import Navbar from "./components/Navbar";
import  Footer from "./footer";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Route, Routes, } from "react-router-dom";
import Transaksi from "./pages/Transaksi";
import './style.css'


export default function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar> <Dashboard /> </Navbar>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/member" element={<Navbar> <Member /> </Navbar> } />
          <Route path="/paket" element={<Navbar> <Paket />  </Navbar>} />
          <Route path="/user" element={<Navbar> <User /> </Navbar> } />
          <Route path="/transaksi" element={<Navbar> <Transaksi /> </Navbar> } />
          <Route path="/formtransaksi" element={ <Navbar> <FormTransaksi /> </Navbar> } />
        </Routes>
        {/* <Footer /> */}
    </BrowserRouter>
    
  );
}
