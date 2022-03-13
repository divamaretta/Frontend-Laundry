import React from "react";
import axios from "axios";
import { baseUrl, authorization } from "../config";
import ReactToPdf from "react-to-pdf";
import domToPdf from 'dom-to-pdf'

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

            total += (harga * qty);
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
          <br />
          <a
            onClick={() => this.changeStatus(id_transaksi, 2)}
            className="text-dark"
          >
            Click here to the next level
          </a>
        </div>
      );
    } else if (status === 2) {
      return (
        <div className="badge bg-warning">
          Sedang diproses
          <br />
          <a
            onClick={() => this.changeStatus(id_transaksi, 3)}
            className="text-dark"
          >
            Click here to the next level
          </a>
        </div>
      );
    } else if (status === 3) {
      return (
        <div className="badge bg-secondary">
          Siap diambil
          <br />
          <a
            onClick={() => this.changeStatus(id_transaksi, 4)}
            className="text-dark"
          >
            Click here to the next level
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
          <br />
          <a
            className="text-primary"
            onClick={() => this.changeStatusBayar(id_transaksi, 1)}
          >
            Click here to change paid status
          </a>
        </div>
      );
    } else if (dibayar == 1) {
      return <div className="badge bg-warning text-white"> Sudah Dibayar </div>;
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
      let endpoint = `${baseUrl}/transaksi/${id}`
      axios.delete(endpoint, authorization)
      .then(response => {
        window.alert(response.data.message)
        this.getData()
      })
      .catch(error => console.log(error))
    }
  }

  convertPdf(){
    //ambil elemen yang akan di convert
    let element = document.getElementById(`topdf`)
    let options = {
        filename : "laporan.pdf"
    }
    domToPdf(element, options, () => {
        window.alert("File akan segera di Download")
    })
}
componentDidMount(){
    this.getData()
    let user = JSON.parse(localStorage.getItem("user"))
    this.setState({role: user.role})

    if(user.role === "Admin" || user.role === "Kasir"){
        this.setState({visible: true})
    }else{
        this.setState({visible: false})
    }
}
  render() {
    const target = React.createRef()
    const target2 = React.createRef()
    const optionPdf = {
        orientation: `landscape`,
        unit: `cm`,
        format: [21 , 29.7],
    }
    return (
      <div className="card">
        <div className="card-header bg-info">
          <h4 className="text-white">List Transaksi</h4>
        </div>
        <div className="card-body">
        {/*{<ReactToPdf targetRef={target} filename="coba.pdf"
        scale={0.8} options={optionPDF}>
            {({toPdf}) => (
              <button className="btn btn-danger"
              onClick={toPdf}>
              Generate PDF
              </button>
            )}
            </ReactToPdf>} */}
            <button className="btn btn-success" onClick={() => this.convertPdf()}>Generate PDF</button>
          <ul className="list-group" ref={target} id="topdf">
          <h3> List Transaksi </h3>
            {this.state.transaksi.map((trans) => (
              <li className="list-group-item">
                <div className="row">
                  {/* Member Area */}
                  <div className="col-lg-3">
                    <small className="text-info">Nama Member</small>
                    {trans.member.nama}
                  </div>
                  {/* Member Area */}
                  <div className="col-lg-3">
                    <small className="text-info">Tanggal Transaksi</small>
                    {trans.tgl}
                  </div>
                  {/* Member Area */}
                  <div className="col-lg-3">
                    <small className="text-info">Batas Waktu</small>
                    {trans.batas_waktu}
                  </div>
                  <div className="col-lg-3">
                    <small className="text-info">Tanggal Bayar</small>
                    {trans.tgl_bayar}
                  </div>
                  {/* Status Area */}
                  <div className="col-lg-3">
                    <small className="text-info">Status Transaksi</small>
                    {this.convertStatus(trans.id_transaksi, trans.status)}
                  </div>
                  {/* Status Pembayaran Area */}
                  <div className="col-lg-3">
                    <small className="text-info">Status Pembayaran</small>
                    <br />
                    {this.convertStatusBayar(trans.id_transaksi, trans.dibayar)}
                  </div>
                  {/* this is total */}
                  <div className="col-lg-3">
                    <small className="text-info">Total</small> <br />
                    Rp {trans.total}
                  </div>
                  {/* this is delete button */}
                  <div className="col-lg-3">
                    <small className="text-info">Option</small> <br />
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => this.deleteTransaksi(trans.id_transaksi)}>
                      Hapus
                    </button>
                  </div>
                </div>

                {/*  area detail transaksi */}
                <h5> Detail Transaksi </h5>
                {trans.detail_transaksi.map((detail) => (
                  <div className="row">
                    {/* area jenis paket col-3 */}
                    <div className="col-lg-3">{detail.paket.jenis_paket}</div>
                    {/* area quantity col-2 */}
                    <div className="col-lg-2">Qty: {detail.qty}</div>
                    {/* area harga paket col-3 */}
                    <div className="col-lg-3">@ Rp {detail.paket.harga}</div>
                    {/* area harga total col-4 */}
                    <div className="col-lg-4">
                      Rp {detail.paket.harga * detail.qty}
                    </div>
                  </div>
                ))}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Transaksi;
