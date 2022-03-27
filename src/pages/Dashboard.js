import React from "react";
import axios from "axios";
import { baseUrl, formatNumber, authorization } from "../config";
import gambar from "./HOME LAUNDRY.png";
import bucket from "./bucket.png";
import grafik from "./grafik.png";
import member from "./member card.png";
import transaksi from "./data transaksi.png";

export default class Dashboard extends React.Component {
  constructor() {
    super();

    this.state = {
      jmlMember: 0,
      jmlPaket: 0,
      jmlUser: 0,
      nmUser: 0,
      jmlTransaksi: 0,
      income: 0,
    };

    if (!localStorage.getItem("token")) {
      window.location.href = "/login";
    }
  }

  getSummary() {
    //get jumlah member
    let endpoint = `${baseUrl}/member`;
    axios
      .get(endpoint, authorization)
      .then((response) => {
        this.setState({ jmlMember: response.data.length });
      })
      .catch((error) => console.log(error));

    //get jumlah user
    endpoint = `${baseUrl}/users`;
    axios
      .get(endpoint, authorization)
      .then((response) => {
        this.setState({ jmlUser: response.data.length });
      })
      .catch((error) => console.log(error));

    //get jumlah paket
    endpoint = `${baseUrl}/paket`;
    axios
      .get(endpoint, authorization)
      .then((response) => {
        this.setState({ jmlPaket: response.data.length });
      })
      .catch((error) => console.log(error));

    //get jumlah transaksi
    endpoint = `${baseUrl}/transaksi`;
    axios
      .get(endpoint, authorization)
      .then((response) => {
        let dataTransaksi = response.data;
        let income = 0;
        for (let i = 0; i < dataTransaksi.length; i++) {
          let total = 0;
          for (let j = 0; j < dataTransaksi[i].detail_transaksi.length; j++) {
            let harga = dataTransaksi[i].detail_transaksi[j].paket.harga;
            let qty = dataTransaksi[i].detail_transaksi[j].qty;

            total += harga * qty;
          }

          income += total;
        }
        this.setState({
          jmlTransaksi: response.data.length,
          income: income,
        });
      })
      .catch((error) => console.log(error));
  }

  componentDidMount() {
    this.getSummary();
    let user = JSON.parse(localStorage.getItem("user"));
    this.setState({ NMUser: user.nama, userRole: user.role });
  }

  render() {
    return (
      <div className="container dashboard-page">
        <div className="row">
          <div className="col-lg-12">
            <div className="hello">
              <div className="row">
                <div className="col-lg-5">
                  <h2>
                    <span>Semangat </span> Menyambut <span> Hari Baru </span>{" "}
                    dengan <span>semangat </span> <span> baru</span>
                  </h2>
                </div>
                <div className="col-lg-2"></div>
                <div className="col-lg-5">
                  <img src={gambar} width="500"></img>
                </div>
              </div>
            </div>
            <div className="row summary">
              <div className="col-lg-6">
                <div className="card">
                  <div className="row">
                    <div className="col-lg-3">
                    <img src={member} width="130"></img>
                    </div>
                    <div className="col-lg-7">
                      <h4 className="card-title">Data Member</h4>
                      <h2>{this.state.jmlMember}</h2>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="card ">
                  <div className="row">
                    <div className="col-lg-3">
                    <img src={bucket} width="155"></img>
                    </div>
                    <div className="col-lg-7">
                      <h4 className="card-title">Data Paket</h4>
                      <h2>{this.state.jmlPaket}</h2>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 mt-4">
                <div className="card ">
                  <div className="row">
                    <div className="col-lg-3">
                    <img src={transaksi} width="150"></img>
                    </div>
                    <div className="col-lg-7">
                      <h4 className="card-title">Data Transaksi</h4>
                      <h2>{this.state.jmlTransaksi}</h2>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 mt-4">
                <div className="card ">
                <div className="row">
                  <div className="col-lg-3">
                  <img src={grafik} width="110"></img>
                  </div>
                  <div className="col-lg-7">
                    <h4 className="card-title">Income</h4>
                    <h2>Rp {formatNumber(this.state.income)}</h2>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
          <br></br>
        </div>
      </div>
    );
  }
}
