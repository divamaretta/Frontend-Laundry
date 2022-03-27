import React from "react";
import axios from "axios";
import { baseUrl, authorization, formatNumber } from "../config";
import domToPdf from "dom-to-pdf";
import "@fortawesome/fontawesome-free/css/all.min.css";
import gambar from "./transaksi laman.png";

class Transaksi extends React.Component {
  constructor() {
    super();
    this.state = {
      transaksi: [],
    };
  }
  getData() {
    let endpoint = `${baseUrl}/transaksi`;

    axios
      .get(endpoint, authorization)
      .then((response) => {
        let dataTransaksi = response.data;
        for (let i = 0; i < dataTransaksi.length; i++) {
          let total = 0;
          for (let j = 0; j < dataTransaksi[i].detail_transaksi.length; j++) {
            let harga = dataTransaksi[i].detail_transaksi[j].paket.harga;
            let qty = dataTransaksi[i].detail_transaksi[j].qty;

            total += harga * qty;
          }

          //tambah key "total"
          dataTransaksi[i].total = total;
        }
        this.setState({ transaksi: dataTransaksi });
      })
      .catch((error) => console.log(error));
  }
  convertStatus(id_transaksi, status) {
    if (status === 1) {
      return (
        <div className="badge bg-info">
          Transaksi Baru
          <a
            onClick={() => this.changeStatus(id_transaksi, 2)}
            className="text-dark"
          >
            <i class="fa-solid fa-forward mx-2 text-white"></i>
          </a>
        </div>
      );
    } else if (status === 2) {
      return (
        <div className="badge bg-warning">
          Sedang diproses
          <a
            onClick={() => this.changeStatus(id_transaksi, 3)}
            className="text-dark"
          >
            <i class="fa-solid fa-forward mx-2 text-white"></i>
          </a>
        </div>
      );
    } else if (status === 3) {
      return (
        <div className="badge bg-secondary">
          Siap diambil
          <a
            onClick={() => this.changeStatus(id_transaksi, 4)}
            className="text-dark"
          >
            <i class="fa-solid fa-forward mx-2 text-white"></i>
          </a>
        </div>
      );
    } else if (status === 4) {
      return <div className="badge bg-success">Telah diambil</div>;
    }
  }

  changeStatus(id, status) {
    if (
      window.confirm(`Apakah anda yakin ingin mengganti status transaksi ini?`)
    ) {
      let endpoint = `${baseUrl}/transaksi/status/${id}`;
      let data = {
        status: status,
      };

      axios
        .post(endpoint, data, authorization)
        .then((response) => {
          window.alert(`Status transaksi telah diubah`);
          this.getData();
        })
        .catch((error) => console.log(error));
    }
  }

  convertStatusBayar(id_transaksi, dibayar) {
    if (dibayar == 0) {
      return (
        <div className="badge bg-danger text-white">
          Belum Dibayar
          <a
            className="text-primary"
            onClick={() => this.changeStatusBayar(id_transaksi, 1)}
          >
            <i class="fa-solid fa-forward mx-2 text-white"></i>
          </a>
        </div>
      );
    } else if (dibayar == 1) {
      return <div className="badge bg-success text-white"> Sudah Dibayar </div>;
    }
  }
  changeStatusBayar(id, status) {
    if (window.confirm(`Apakah anda yakin mengubah status pembayaran ini?`)) {
      let endpoint = `${baseUrl}/transaksi/bayar/${id}`;
      axios
        .get(endpoint, authorization)
        .then((response) => {
          window.alert(`Status pembayaran telah diubah`);
          this.getData();
        })
        .catch((error) => console.log(error));
    }
  }

  deleteTransaksi(id) {
    if (window.confirm(`Apakah anda yakin menghapus transaksi ini ?`)) {
      let endpoint = `${baseUrl}/transaksi/${id}`;
      axios
        .delete(endpoint, authorization)
        .then((response) => {
          window.alert(response.data.message);
          this.getData();
        })
        .catch((error) => console.log(error));
    }
  }

  convertPdf() {
    //ambil elemen yang akan di convert
    let element = document.getElementById(`topdf`);
    let options = {
      filename: "laporan.pdf",
    };
    domToPdf(element, options, () => {
      window.alert("File akan segera di Download");
    });
  }
  componentDidMount() {
    this.getData();
    let user = JSON.parse(localStorage.getItem("user"));
    this.setState({ role: user.role });

    if (user.role === "Admin" || user.role === "Kasir") {
      this.setState({ visible: true });
    } else {
      this.setState({ visible: false });
    }
  }
  printStruk(id) {
    var element = document.getElementById(`struk${id}`);
    var options = {
      filename: `struk-${id}.pdf`,
    };
    domToPdf(element, options, function (pdf) {
      window.alert(`Struk will download soon`);
    });
  }
  render() {
    const target = React.createRef();
    const target2 = React.createRef();
    const optionPdf = {
      orientation: `landscape`,
      unit: `cm`,
      format: [21, 29.7],
    };
    return (
      <div className="container transaksi-page">
        <div className="">
          <div className="top-word">
            <div className="row">
              <div className="col-lg-5">
                <h2>
                  <span>Selamat </span> bekerja <span> selamat </span> datang{" "}
                  <span> dilaman </span> <span> Transaksi </span>
                  <div className="">
                  <button
                    className="btn btn-success text-white"
                    onClick={() => this.convertPdf()}
                  >
                    Generate PDF
                  </button>
                  </div>
                </h2>
              </div>
              <div className="col-lg-2"></div>
              <div className="col-lg-5">
                <img src={gambar} width="500"></img>
              </div>
            </div>
          </div>
          <div className="card-header bg-primary">
            <h4 className="text-white">List Transaksi</h4>
          </div>
          <div className="card">
            <div className="card-body">
              <ul className="list-group list-data" ref={target} id="topdf">
                <h3> List Transaksi </h3>
                {this.state.transaksi.map((trans) => (
                  <li className="list-group-item mt-3">
                    <div className="row">
                      {/* Member Area */}
                      <div className="col-lg-3">
                        <small className="text-info">Nama Member</small> <br />
                        {trans.member.nama}
                      </div>
                      {/* Transaksi Area */}
                      <div className="col-lg-3">
                        <small className="text-info">Tanggal Transaksi</small>{" "}
                        <br />
                        {trans.tgl}
                      </div>
                      {/* Batas Waktu Area */}
                      <div className="col-lg-3">
                        <small className="text-info">Batas Waktu</small> <br />
                        {trans.batas_waktu}
                      </div>
                      <div className="col-lg-3">
                        <small className="text-info">Tanggal Bayar</small>{" "}
                        <br />
                        {trans.tgl_bayar}
                      </div>

                      {/* Status Area */}
                      <div className="col-lg-3">
                        <small className="text-info">Status Transaksi</small>
                        <br />
                        {this.convertStatus(trans.id_transaksi, trans.status)}
                      </div>

                      {/* Status Pembayaran Area */}
                      <div className="col-lg-3">
                        <small className="text-info">Status Pembayaran</small>
                        <br />
                        {this.convertStatusBayar(
                          trans.id_transaksi,
                          trans.dibayar
                        )}
                      </div>
                      {/* this is total */}
                      <div className="col-lg-3">
                        <small className="text-info">Total</small> <br />
                        Rp {formatNumber(trans.total)}
                      </div>
                      {/* this is struk area */}
                      <div className="col-lg-1">
                        <small className="text-info">Struk</small> <br />
                        <button
                          className="btn btn-danger btn-sm "
                          onClick={() => this.printStruk(trans.id_transaksi)}
                        >
                          {" "}
                          <i class="fa-solid fa-print"></i>{" "}
                        </button>
                      </div>
                      <div style={{ display: `none` }}>
                        <div
                          className="col-lg-12 p-3"
                          id={`struk${trans.id_transaksi}`}
                        >
                          <h3 className=" text-info text-center">
                            Snezzy Laundry
                          </h3>
                          <h5 className="text-center">
                            Jalan Danau Toba No. 107 Sawojajar, Malang
                            <br />
                            Telp. 081252552982 | IG: @Snezzy_laundry
                          </h5>
                          <h4 className="text-dark ">
                            Member : {trans.member.nama}
                          </h4>
                          <h4 className="text-dark">Tanggal: {trans.tgl}</h4>

                          <div
                            className="row mt-3"
                            style={{ borderBottom: `3px dotted blck` }}
                          >
                            <div className="col-4">Paket</div>
                            <div className="col-2">Qty</div>
                            <div className="col-3">Harga Satuan</div>
                            <div className="col-3">Total</div>
                            {/* this is delete button */}
                            <div className="col-lg-3">
                              <small className="text-info">Hapus Data</small>{" "}
                              <br />
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() =>
                                  this.deleteTransaksi(trans.id_transaksi)
                                }
                              >
                                <i class="fa-solid fa-trash-can"></i>
                              </button>
                            </div>
                          </div>
                          {trans.detail_transaksi.map((item) => (
                            <div
                              className="row mt-3"
                              style={{ borderBottom: `1px dotted blck` }}
                            >
                              <div className="col-4">
                                <h5>{item.paket.jenis_paket}</h5>
                              </div>
                              <div className="col-2">
                                <h5>{item.qty}</h5>
                              </div>
                              <div className="col-3">
                                <h5>Rp {item.paket.harga}</h5>
                              </div>
                              <div className="col-3">
                                <h5>Rp {item.paket.harga * item.qty}</h5>
                              </div>
                            </div>
                          ))}

                          <div className="row mt-2">
                            <div className="col-lg-9"></div>
                            <div className="col-lg-3">
                              <h4> Rp {formatNumber(trans.total)}</h4>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* this is delete button */}
                      <div className="col-lg-1">
                        <small className="text-info">Hapus Data</small> <br />
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() =>
                            this.deleteTransaksi(trans.id_transaksi)
                          }
                        >
                          <i class="fa-solid fa-trash-can"></i>
                        </button>
                      </div>
                    </div>

                    {/*  area detail transaksi */}
                    <h5> Detail Transaksi </h5>
                    {trans.detail_transaksi.map((detail) => (
                      <div className="row">
                        {/* area jenis paket col-3 */}
                        <div className="col-lg-3">
                          {detail.paket.jenis_paket}
                        </div>
                        {/* area quantity col-2 */}
                        <div className="col-lg-2">Qty: {detail.qty}</div>
                        {/* area harga paket col-3 */}
                        <div className="col-lg-3">
                          @ Rp {formatNumber(detail.paket.harga)}
                        </div>
                        {/* area harga total col-4 */}
                        <div className="col-lg-4">
                          Rp {formatNumber(detail.paket.harga * detail.qty)}
                        </div>
                      </div>
                    ))}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Transaksi;
