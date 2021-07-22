import React, { Component } from "react";
// action redux thunk
import { connect } from "react-redux";
import { postSignUp_Action } from "../../store/actions/signUp.action";
// material
import { Container } from "@material-ui/core";
import "./scss/signup.css";

class SignUpPage extends Component {
  state = {
    User: {
      taiKhoan: "",
      matKhau: "",
      confirmMatKhau: "",
      email: "",
      soDt: "",
      maNhom: "",
      maLoaiNguoiDung: "KhachHang",
      hoTen: "",
    },
    error: {
      taiKhoan: "",
      matKhau: "",
      confirmMatKhau: "",
      email: "",
      soDt: "",
      maNhom: "",
      hoTen: "",
    },
    valid: false,
    showInforUser: false,
  };

  handleChange = (event) => {
    const { name, value, type, pattern } = event.target;
    let valuesUpdate = { ...this.state.User, [name]: value };
    let errorUpdate = { ...this.state.error, [name]: value };
    this.setState(
      {
        User: valuesUpdate,
        error: errorUpdate,
      },
      () => {
        this.validButtonSubmit();
      }
    );
    // check pattern
    let regex = new RegExp(pattern);
    // check empty
    if (value.trim() === "") {
      errorUpdate[name] = " Do Not Empty ! ";
    } else {
      errorUpdate[name] = "";
    }
    // check empty

    // check text
    if (name === "hoTen") {
      if (value.trim() === "") {
        errorUpdate[name] = "Do Not Empty ! ";
      } else if (!regex.test(value)) {
        errorUpdate[name] = "Không Đúng Định Dạng !";
      }
    }
    // check text

    // check password
    if (name === "confirmMatKhau") {
      if (value === valuesUpdate["matKhau"]) {
        errorUpdate[name] = "";
      } else {
        errorUpdate[name] = "Mật Khẩu Không Trùng Nhau !";
      }
    }
    // check password

    // check email
    if (type === "email") {
      if (!value) {
        errorUpdate[name] = "Do Not Empty !";
      } else if (!regex.test(value)) {
        errorUpdate[name] = "Email Invaild !";
      }
    }
    // check email
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.dispatch(postSignUp_Action(this.state.User));
    this.setState({
      showInforUser: true,
    });
    this.refeshInput();
  };
  refeshInput = () => {
    let elementsInput = document.querySelectorAll("input");
    for (let refesh of elementsInput) {
      refesh.value = "";
    }
  };

  validButtonSubmit() {
    let validS = true;
    for (let key in this.state.error) {
      if (this.state.error[key] !== "" || this.state.User[key] === "") {
        validS = false;
      }
    }
    this.setState({
      ...this.state,
      valid: validS,
    });
  }

  renderMaNhom() {
    let arrMaNhom = [
      "GP01",
      "GP02 ",
      "GP03",
      "GP04 ",
      "GP05",
      "GP06 ",
      "GP07",
      "GP08 ",
      "GP09",
      "GP10 ",
    ];
    return arrMaNhom.map((item, index) => {
      return (
        <option key={index} value={item}>
          {item}
        </option>
      );
    });
  }

  renderShowMessage() {
    const { taiKhoan, matKhau, hoTen, email, maNhom, soDt, maLoaiNguoiDung } =
      this.props.inforSignIn;
    if (this.props.mesageSuccess === 200) {
      return (
        <div className="modalMesage">
          <h5>Thông Tin Của Bạn</h5>
          <table className="tableMesage">
            <thead>
              <tr>
                <td>Họ tên : </td>
                <td>{hoTen}</td>
              </tr>
              <tr>
                <td>Tài khoản : </td>
                <td>{taiKhoan}</td>
              </tr>
              <tr>
                <td>Mật khẩu : </td>
                <td>{matKhau}</td>
              </tr>
              <tr>
                <td>Email : </td>
                <td>{email}</td>
              </tr>
              <tr>
                <td>Phone : </td>
                <td>{soDt}</td>
              </tr>
              <tr>
                <td>Vai trò: </td>
                <td>
                  {maLoaiNguoiDung === "QuanTri"
                    ? "Quản trị viên"
                    : "Khách hàng"}
                </td>
              </tr>
              <tr>
                <td>Nhóm : </td>
                <td>{maNhom}</td>
              </tr>
            </thead>
          </table>
          <div style={{ textAlign: "center" }}>
            <button
              onClick={() => {
                this.goSignIn();
              }}
            >
              Go To Sign In
            </button>
          </div>
        </div>
      );
    } else if (this.props.messageSignUp) {
      return (
        <div className="modalMesage">
          <span>{this.props.messageSignUp}</span>
          <div style={{ textAlign: "center" }}>
            <button
              onClick={() => {
                this.goComback();
              }}
            >
              Đăng Ký Lại
            </button>
          </div>
        </div>
      );
    }
  }

  goSignIn() {
    this.props.history.replace("/signIn");
    this.setState({
      showInforUser: false,
    });
  }
  goComback() {
    this.setState({
      showInforUser: false,
    });
  }

  render() {
    const { User, error } = this.state;
    return (
      <>
        <div className="backgroundSignUp">
          <div className="wrapSignUp">
            <Container maxWidth="md">
              <h4>Form Đăng Ký</h4>
              <form onSubmit={this.handleSubmit}>
                <input
                  onChange={this.handleChange}
                  value={User.taiKhoan}
                  placeholder="Tài Khoản"
                  name="taiKhoan"
                  type="text"
                />
                <span>{error.taiKhoan}</span>
                <input
                  onChange={this.handleChange}
                  value={User.matKhau}
                  placeholder="Mật Khẩu"
                  name="matKhau"
                  type="password"
                />
                <span>{error.matKhau}</span>
                <input
                  onChange={this.handleChange}
                  value={User.confirmMatKhau}
                  placeholder="Xác Nhận Mật Khẩu Mật Khẩu"
                  name="confirmMatKhau"
                  type="password"
                />
                <span>{error.confirmMatKhau}</span>

                <input
                  onChange={this.handleChange}
                  value={User.hoTen}
                  placeholder="User Name"
                  name="hoTen"
                  type="text"
                  pattern="^[A-Za-z]+$"
                />
                <span>{error.hoTen}</span>

                <input
                  onChange={this.handleChange}
                  value={User.email}
                  placeholder="Email"
                  name="email"
                  type="email"
                  pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
                />
                <span>{error.email}</span>

                <input
                  onChange={this.handleChange}
                  value={User.soDt}
                  placeholder="Số Điện Thoại"
                  name="soDt"
                />
                <span>{error.soDt}</span>

                <input placeholder="Khách Hàng" disabled />

                <select
                  name="maNhom"
                  value={User.maNhom}
                  onChange={this.handleChange}
                >
                  <option value="">Mã Nhóm</option>
                  {this.renderMaNhom()}
                </select>
                <br />
                <span>{error.maNhom}</span>

                <br />
                <br />

                <div style={{ textAlign: "center" }}>
                  {this.state.valid ? (
                    <button type="submit" style={{ cursor: "pointer" }}>
                      Đăng Ký
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled
                      style={{ cursor: "no-drop" }}
                    >
                      Đăng Ký
                    </button>
                  )}
                </div>
              </form>
            </Container>
          </div>
        </div>
        {this.state.showInforUser ? (
          <div className="mesageInfoUser">{this.renderShowMessage()}</div>
        ) : (
          ""
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    messageSignUp: state.SignUpReducer.messageSignUp,
    mesageSuccess: state.SignUpReducer.mesageSuccess,
    inforSignIn: state.SignUpReducer.inforSignIn,
  };
};

export default connect(mapStateToProps)(SignUpPage);
