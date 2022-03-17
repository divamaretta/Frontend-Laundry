import React from "react";
import axios from "axios";
import { baseUrl } from "../config";
import "@fortawesome/fontawesome-free/css/all.min.css";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
    };
  }

  loginProcess(event) {
    event.preventDefault();
    let endpoint = `${baseUrl}/auth`;
    let request = {
      username: this.state.username,
      password: this.state.password,
    };

    axios
      .post(endpoint, request)
      .then((result) => {
        if (result.data.logged) {
          // store token in local storaage
          localStorage.setItem("token", result.data.token);
          localStorage.setItem("user", JSON.stringify(result.data.user));
          window.alert("Congratulation! You're logged babe");
          window.location.href = "/";
        } else {
          window.alert("Sorry, your username and password is invalid");
        }
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <div className=" login container d-flex h-100 justify-content-center align-items-center">
        <div className="col-lg-8" style={{ margin: "0 auto" }}>
          <div className="card bg-info">
            <div className="row">
              <div className="col-lg-6">
                
              </div>
              <div className="col-lg-6 p-4">
                <div className="card-body">
                <div className="text-center header" >
                  <h5>Selamat Datang</h5>
                  <span>Masuk ke dalam akunmu sekarang</span>
                </div>
                  <form onSubmit={(ev) => this.loginProcess(ev)} className="mt-5">
                    <input
                      type="text"
                      className="form-control mb-2"
                      required
                      value={this.state.username}
                      placeholder="Masukkan Username"
                      onChange={(ev) =>
                        this.setState({ username: ev.target.value })
                      }
                    />

                    <input
                      type="password"
                      className="form-control mb-2"
                      required
                      value={this.state.password}
                      placeholder="masukkan Password"
                      onChange={(ev) =>
                        this.setState({ password: ev.target.value })
                      }
                    />

                    <button type="submit" className="btn btn-primary">
                      Log in
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
