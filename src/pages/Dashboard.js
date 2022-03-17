import React from "react";
import axios from "axios";
import { baseUrl, formatNumber, authorization } from "../config";
import gambar from "./welcome laundry.png";

export default class Dashboard extends React.Component {
  constructor() {
    super();

    this.state = {
      jmlMember: 0,
      jmlPaket: 0,
      jmlUser: 0,
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
  }

  render() {
    return (
      <div className="container dashboard-page">
        <div className="row">
          <div className="col-lg-12">
            <div className="hello">
              <div className="row">
                <div className="col-lg-5">
                  <h1>Selamat Datang!</h1>
                  <button className="btn btn-success">+ Transaksi</button>
                </div>
                <div className="col-lg-2"></div>
                <div className="col-lg-5">
                  <img src={gambar} width="400"></img>
                </div>
              </div>
            </div>
            <div className="row summary">
              <div className="col-lg-4">
                <div className="card">
                  <div className="row">
                    <div className="col-lg-4">
                      <i class="fa-solid fa-address-book bg-danger p-4 text-white"></i>
                    </div>
                    <div className="col-lg-7">
                      <h4 className="card-title">Data Member</h4>
                      <h2>{this.state.jmlMember}</h2>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="col-lg-4">
                <div className="card">
                  <div className="row">
                    <div className="col-lg-5">
                      <i class="fa-solid fa-id-card-clip bg-primary p-4 text-white"></i>
                    </div>
                    <div className="col-lg-7">
                      <h4 className="card-title">Data User</h4>
                      <h2>{this.state.jmlUser}</h2>
                    </div>
                  </div>
                </div>
              </div> */}
              <div className="col-lg-4">
                <div className="card">
                  <div className="row">
                    <div className="col-lg-4">
                      <i class="fa-solid fa-box-open bg-warning p-4 text-white"></i>
                    </div>
                    <div className="col-lg-7">
                      <h4 className="card-title">Data Paket</h4>
                      <h2>{this.state.jmlPaket}</h2>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="card">
                  <div className="row">
                    <div className="col-lg-4">
                      <i class="fa-solid fa-bag-shopping bg-success p-4 text-white"></i>
                    </div>
                    <div className="col-lg-7">
                      <h4 className="card-title">Data Transaksi</h4>
                      <h2>{this.state.jmlTransaksi}</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-12 text-center">
            <div className="card">
              <div className="row">
              <div className="col-lg-12">
                <i class="fa-solid fa-chart-line-up bg-primary p-4 text-white"></i>
              </div>
              <h4 className="card-title">Income</h4>
              <h2>Rp {formatNumber(this.state.income)}</h2>
            </div>
            </div>
          </div>
          {/* <div className="col-lg-6 col-md-6">
            <div className="card">
              <div className="row">
              <div className="col-lg-4 text center">
                      <i class="fa-solid fa-address-book bg-danger"></i>
                    </div>
                <h4 className="card-title">Data Member</h4>
                <h2>{this.state.jmlMember}</h2>
                </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-6">
            <div className="card text-center bg-info m-1 text-white">
              <div className="card-body">
                <h4 className="card-title">Data User</h4>
                <h2>{this.state.jmlUser}</h2>
                <h6>Paket yang kami layani dengan sepenuh hati</h6>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-6">
            <div className="card text-center bg-info m-1 text-white">
              <div className="card-body">
                <h4 className="card-title">Data Paket</h4>
                <h2>{this.state.jmlPaket}</h2>
                <h6>Paket yang kami layani dengan sepenuh hati</h6>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-6">
            <div className="card text-center bg-dark m-1 text-white">
              <div className="card-body">
                <h4 className="card-title">Data Transaksi</h4>
                <h2>{this.state.jmlTransaksi}</h2>
                <h6>Transaksi yang kami layani dengan sepenuh hati</h6>
              </div>
            </div>
          </div>


          <div className="col-lg-12">
            <div className="card bg-secondary m-1">
              <div className="card-body">
                <h4 className="card-title">Income</h4>
                <h2>Rp {formatNumber(this.state.income)}</h2>
                <h6>Transaksi yang kami layani dengan sepenuh hati</h6>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    );
  }
}
