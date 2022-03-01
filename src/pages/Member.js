import React from "react";
import "./Pages.css";
import { Modal } from "bootstrap";
import axios from "axios";
import { baseUrl, authorization } from "../config";

//nama class member sesuai dengan file
class Member extends React.Component {
  constructor() {
    super();
    this.state = {
      members: [
        {
          id_member: "111",
          nama: "Lee Haechan",
          alamat: "Seoul, Korea Selatan",
          jenis_kelamin: "Pria",
          telepon: "081206062000",
        },
        {
          id_member: "112",
          nama: "Lee Jeno",
          alamat: "Incheon, Korea Selatan",
          jenis_kelamin: "Pria",
          telepon: "081223042000",
        },
        {
          id_member: "113",
          nama: "Aeri Uchiga",
          alamat: "Sinsa-dong, Seoul, Korea Selatan",
          jenis_kelamin: "Wanita",
          telepon: "08123082000",
        },
      ],

      id_member: "",
      nama: "",
      alamat: "",
      telepon: "",
      jenis_kelamin: "",
      action: "", // berguna untuk aksi dari tambah atau ubah data
    };

    if (!localStorage.getItem("token")) {
      window.location.href = "/login";
    }
  }
  tambahData() {
    //memunculkan modal
    this.modalMember = new Modal(document.getElementById("modal-member"));
    this.modalMember.show();

    //mengosongkan inputannya
    this.setState({
      nama: "",
      alamat: "",
      telepon: "",
      jenis_kelamin: "Pria",
      id_member: Math.random(1, 10000000),
      action: "tambah",
    });
  }

  simpanData(event) {
    event.preventDefault();
    //event preventDefault adalah mencegah aksi default dari form submit

    //menghilangkan modal
    this.modalMember.hide();

    //cek aksi tambah atau ubah
    if (this.state.action === "tambah") {
      let endpoint = `${baseUrl}/member`;
      //menampung data dari pengguna
      let newMember = {
        id_member: this.state.id_member,
        nama: this.state.nama,
        alamat: this.state.alamat,
        telepon: this.state.telepon,
        jenis_kelamin: this.state.jenis_kelamin,
      };

      //let temp = this.state.members
      //temp.push(newMember)

      //this.setState({members: temp})
      axios
        .post(endpoint, newMember, authorization)
        .then((response) => {
          window.alert(response.data.message);
          this.getData();
        })
        .catch((error) => console.log(error));
    } else if (this.state.action === "ubah") {
      this.modalMember.hide();
      let endpoint = `${baseUrl}/member` + this.state.id_member;
      let newMember = {
        id_member: this.state.id_member,
        nama: this.state.nama,
        alamat: this.state.alamat,
        telepon: this.state.telepon,
        jenis_kelamin: this.state.jenis_kelamin,
      };
      axios
        .put(endpoint, newMember, authorization)
        .then((response) => {
          window.alert(response.data.message);
          this.getData();
        })
        .catch((error) => console.log(error));

      //mencari posisi index dari data member
      //berdasarkan id member nya pada array "members"

      let index = this.state.members.findIndex(
        (member) => member.id_member === this.state.id_member
      );

      //let temp = this.state.members
      //temp[index].nama = this.state.nama
      //temp[index].alamat = this.state.alamat
      //temp[index].telepon = this.state.telepon
      //temp[index].jenis_kelamin = this.state.jenis_kelamin

      //this.setState({ members:temp })
    }
  }

  ubahData(id_member) {
    this.modalMember = new Modal(document.getElementById("modal-member"));
    this.modalMember.show();

    //mencari posisi index dari data member
    //berdasarkan id member nya pada array "members"

    let index = this.state.members.findIndex(
      (member) => member.id_member === id_member
    );

    this.setState({
      id_member: this.state.members[index].id_member,
      nama: this.state.members[index].nama,
      alamat: this.state.members[index].alamat,
      jenis_kelamin: this.state.members[index].jenis_kelamin,
      telepon: this.state.members[index].telepon,
      action: "ubah",
    });
  }

  hapusData(id_member) {
    if (window.confirm("Apakah anda yakin menghapus data ini?")) {
      //mencari posisi index dari data yang akan dihapus

      let endpoint = `${baseUrl}/member` + id_member;
      axios
        .delete(endpoint, authorization)
        .then((response) => {
          window.alert(response.data.message);
          this.getData();
        })
        .catch((error) => console.log(error));

      //let temp = this.state.members
      //let index = temp.findIndex(
      //    member => member.id_member === id_member)

      //menghapus data pada array
      //temp.splice(index, 1)

      //this.setState({member: temp})
    }
  }

  getData() {
    let endpoint = `${baseUrl}/member`;
    axios
      .get(endpoint, authorization)
      .then((response) => {
        this.setState({ members: response.data });
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
    if (this.state.role === "Admin" || this.state.role === "kasir") {
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
          <h4 className="text-white">List Daftar Member</h4>
        </div>

        <div className="card-body">
          <ul className="list-group">
            {this.state.members.map((member) => (
              <li className="list-group-item">
                <div className="row">
                  {/*bagian untuk nama*/}
                  <div className="col-lg-4">
                    <small className="text-info">Nama</small> <br />
                    {member.nama}
                  </div>
                  {/*bagian untuk jenis kelamin*/}
                  <div className="col-lg-3">
                    <small className="text-info">Gender</small> <br />
                    {member.jenis_kelamin}
                  </div>
                  {/*bagian untuk telepon*/}
                  <div className="col-lg-3">
                    <small className="text-info">Telepon</small> <br />
                    {member.telepon}
                  </div>
                  {/*bagian untuk button edit dan delete */}
                  <div className="col-lg-2 align-self-center">
                    <button
                      type="button"
                      className={`btn btn-warning btn-sm mx-2 ${this.state.visible ? `` : `d-none`}`}
                      onClick={() => this.ubahData(member.id_member)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className={`btn btn-danger btn-sm ${this.state.visible ? `` : `d-none`}`}
                      onClick={() => this.hapusData(member.id_member)}
                    >
                      Delete
                    </button>
                  </div>
                  {/*bagian untuk alamat*/}
                  <div className="col-lg-5">
                    <small className="text-info">Alamat</small> <br />
                    {member.alamat}
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
        {/* form modal member*/}
        <div className="modal" id="modal-member">
          <div className="modal-dialog modal-md">
            <div className="modal-content">
              <div className="modal-header bg-success">
                <h4 className="text-white">Form Member</h4>
              </div>

              <div className="modal-body">
                <form onSubmit={(ev) => this.simpanData(ev)}>
                  Nama
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={this.state.nama}
                    onChange={(ev) => this.setState({ nama: ev.target.value })}
                    required
                  />
                  Alamat
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={this.state.alamat}
                    onChange={(ev) =>
                      this.setState({ alamat: ev.target.value })
                    }
                    required
                  />
                  Telepon
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={this.state.telepon}
                    onChange={(ev) =>
                      this.setState({ telepon: ev.target.value })
                    }
                    required
                  />
                  Jenis Kelamin
                  <select
                    className="form-control mb-2"
                    value={this.state.jenis_kelamin}
                    onChange={(ev) =>
                      this.setState({ jenis_kelamin: ev.target.value })
                    }
                  >
                    <option value="Pria">Pria</option>
                    <option value="Wanita">Wanita</option>
                  </select>
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

export default Member;
