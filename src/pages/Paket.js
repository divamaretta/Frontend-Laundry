import React from "react";
import { Modal } from "bootstrap";
import axios from "axios";
import { baseUrl, authorization } from "../config";

//nama class paket sesuai dengan file
class Paket extends React.Component {
  constructor() {
    super();
    this.state = {
      id_paket: "",
      jenis_paket: "",
      harga: "",
      action: "",

      list_paket: [],
    };
  }
  tambahData() {
    //memunculkan modal
    this.modalPaket = new Modal(document.getElementById("modal-paket"));
    this.modalPaket.show();

    //mengosongkan inputannya
    this.setState({
      jenis_paket: "",
      harga: "",
      id_paket: Math.random(1, 10000000),
      action: "tambah",
    });
  }

  simpanData(event) {
    event.preventDefault();

    if (this.state.action === "tambah") {
      let endpoint = `${baseUrl}/paket`;
      let data = {
        jenis_paket: this.state.jenis_paket,
        harga: this.state.harga,
      };
      // let temp = this.state.members;
      // temp.push(data);
      // this.setState({ members: temp });

      axios
        .post(endpoint, data, authorization)
        .then((response) => {
          window.alert(response.data.message);
          this.getData();
        })
        .catch((error) => console.log(error));
      this.modalPaket.hide();
    } else if (this.state.action === "ubah") {
      let endpoint = `${baseUrl}/paket/` + this.state.id_paket;

      let data = {
        jenis_paket: this.state.jenis_paket,
        harga: this.state.harga,
      };
      axios
        .put(endpoint, data, authorization)
        .then((response) => {
          window.alert(response.data.message);
          this.getData();
        })
        .catch((error) => console.log(error));

      // let temp = this.state.members;
      // let index = temp.findIndex(
      //   (member) => member.id_member === this.state.id_member
      // );
      // temp[index].nama = this.state.nama;
      // temp[index].alamat = this.state.alamat;
      // temp[index].jenis_kelamin = this.state.jenis_kelamin;
      // temp[index].telpon = this.state.telpon;

      // this.setState({ members: temp });
      this.modalPaket.hide();
    }
  }

  ubahData(id_paket) {
    this.modalPaket = new Modal(document.getElementById("modal-paket"));
    this.modalPaket.show();

    //mencari posisi index dari data paket
    //berdasarkan id member nya pada array "pakets"

    let index = this.state.list_paket.findIndex(
      (paket) => paket.id_paket === id_paket
    );

    this.setState({
      id_paket: this.state.list_paket[index].id_paket,
      jenis_paket: this.state.list_paket[index].jenis_paket,
      harga: this.state.list_paket[index].harga,
      action: "ubah",
    });
  }

  hapusData(id_paket) {
    if (window.confirm("Apakah anda yakin menghapus data ini?")) {
      //mencari posisi index data yang akan dihapus

      let endpoint = `${baseUrl}/paket/` + id_paket;
      axios
        .delete(endpoint, authorization)
        .then((response) => {
          window.alert(response.data.message);
          this.getData();
        })
        .catch((error) => console.log(Error));
      //let temp = this.state.pakets
      //let index = temp.findIndex(
      //    paket => paket.id_paket === id_paket)

      //menghapus data pada array
      //temp.splice(index, 1)

      //this.setState({member: temp})
    }
  }

  getData() {
    let endpoint =  `${baseUrl}/paket`;
    axios
      .get(endpoint, authorization)
      .then((response) => {
        this.setState({
          list_paket: response.data,
        });
      })
      .catch((error) => console.log(error));
  }

  componentDidMount() {
    this.getData();
    let user = JSON.parse(localStorage.getItem("user"));

    // cara pertama
    this.setState({
      role: user.role,
    })

    //cara kedua
    if (user.role === "Admin" || user.role === "Kasir") {
      this.setState({
        visible : true
      })     
  }else {
    this.setState({
      visible : false
    })
  }
}

showAddButton() {
  if (this.state.role === "Admin" || this.state.role === "kasir") {
    return (
      <button
        className="btn btn-success me-md-2"
        type="button"
        onClick={() => this.tambahData()}>
          Tambah
      </button>
    );
  }
}

  render() {
    return (
      <div className="card">
        <div className="card-header bg-primary">
          <h4 className="text-white">List Daftar Paket </h4>
        </div>
        <div className="card-body">
          <ul className="list-group">
            {this.state.list_paket.map((paket) => (
              <li className="list-group-item">
                <div className="row">
                  {/*bagian untuk paket*/}
                  <div className="col-lg-4">
                    <small className="text-info"> Paket </small> <br />
                    {paket.jenis_paket}
                  </div>
                  {/*bagian untuk harga*/}
                  <div className="col-lg-4">
                    <small className="text-info"> Harga </small> <br />
                    {paket.harga}
                  </div>
                  {/*bagian untuk button edit dan delete */}
                  <div className="col-lg-4 align-self-center">
                    <button
                      type="button"
                      className={`btn btn-warning btn-sm mx-2 ${this.state.visible ? `` : `d-none`}`}
                      onClick={() => this.ubahData(paket.id_paket)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className={`btn btn-danger btn-sm ${this.state.visible ? `` : `d-none`}`}
                      onClick={() => this.hapusData(paket.id_paket)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <br />
          <div className="align-self-center d-grid gap-2 d-md-flex justify-content-md-end">
            {this.showAddButton()}
          </div>
          <br />
        </div>
        {/* form modal paket */}
        <div className="modal" id="modal-paket">
          <div className="modal-dialog modal-md">
            <div className="modal-content">
              <div className="modal-header bg-success">
                <h4 className="text-white">Form Paket </h4>
              </div>
              <div className="modal-body">
                <form onSubmit={(ev) => this.simpanData(ev)}>
                  Paket
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={this.state.jenis_paket}
                    onChange={(ev) =>
                      this.setState({
                        jenis_paket: ev.target.value,
                      })
                    }
                    required
                  />
                  Harga
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={this.state.harga}
                    onChange={(ev) =>
                      this.setState({
                        harga: ev.target.value,
                      })
                    }
                    required
                  />
                  <button className="btn btn-success btn-sm" type="submit">
                    Simpan
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Paket;
