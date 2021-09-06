import React, { Component } from "react";
// action redux thunk
import { connect } from "react-redux";
import { postSignUp_Action } from "../../store/actions/signUp.action";
// material
import { Container, Input } from "@material-ui/core";
import "./scss/signup.css";
import { Visibility, VisibilityOff } from "@material-ui/icons";

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
    showPassword: false,
    showConfrimPassword: false,
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
  handleClickShowPassword = () => {
    this.setState({ ...this.state, showPassword: !this.state.showPassword });
  };

  handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  handleClickShowConfrimPassword = () => {
    this.setState({ ...this.state, showConfrimPassword: !this.state.showConfrimPassword });
  };

  handleMouseDownConfrimPassword = (event) => {
    event.preventDefault();
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
    const { taiKhoan, matKhau, hoTen, email, maNhom, soDt } =
      this.props.inforSignIn;
    if (this.props.mesageSuccess === 200) {
      return (
        <div className="modalMesage">
          <h5>Thông Tin Của Bạn</h5>
          <table className="tableMesage">
            <thead>
              <tr>
                <td>Họ tên</td>
                <td>: {hoTen}</td>
              </tr>
              <tr>
                <td>Tài khoản</td>
                <td>: {taiKhoan}</td>
              </tr>
              <tr>
                <td>Mật khẩu</td>
                <td>: {matKhau}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>: {email}</td>
              </tr>
              <tr>
                <td>Phone</td>
                <td>: {soDt}</td>
              </tr>
              <tr>
                <td>Vai trò</td>
                <td>: Khách hàng</td>
              </tr>
              <tr>
                <td>Nhóm</td>
                <td>: {maNhom}</td>
              </tr>
            </thead>
          </table>
          <div style={{ textAlign: "center" }}>
            <button
              onClick={() => {
                this.goSignIn();
              }}
            >
              Sign In Now
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
              <h5>Sign Up</h5>
              <form onSubmit={this.handleSubmit}>
                <label>Tài Khoản</label>
                <input
                  onChange={this.handleChange}
                  value={User.taiKhoan}
                  placeholder="Tài Khoản"
                  name="taiKhoan"
                  type="text"
                />
                <p>{error.taiKhoan}</p>

                <label>Mật Khẩu</label>
                <Input
                  id="standard-adornment-password"
                  className="inputShow"
                  name="matKhau"
                  type={this.state.showPassword ? "text" : "password"}
                  value={User.matKhau}
                  onChange={this.handleChange}
                  endAdornment={
                    <span
                      className="showPassWord"
                      aria-label="toggle password visibility"
                      onClick={this.handleClickShowPassword}
                      onMouseDown={this.handleMouseDownPassword}
                    >
                      {User.showPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </span>
                  }
                />
                <p>{error.matKhau}</p>

                <label>Xác Nhận Mật Khẩu</label>
                <Input
                  id="standard-adornment-password"
                  className="inputShow"
                  name="confirmMatKhau"
                  type={this.state.showConfrimPassword ? "text" : "password"}
                  onChange={this.handleChange}
                  value={User.confirmMatKhau}
                  endAdornment={
                    <span
                      className="showPassWord"
                      aria-label="toggle password visibility"
                      onClick={this.handleClickShowConfrimPassword}
                      onMouseDown={this.handleMouseDownConfrimPassword}
                    >
                      {User.showConfrimPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </span>
                  }
                />
                <p>{error.confirmMatKhau}</p>

                <label>Họ Tên</label>
                <input
                  onChange={this.handleChange}
                  value={User.hoTen}
                  placeholder="User Name"
                  name="hoTen"
                  type="text"
                  pattern="^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ + ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ + ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$"
                />
                <p>{error.hoTen}</p>

                <label>Email</label>
                <input
                  onChange={this.handleChange}
                  value={User.email}
                  placeholder="Email"
                  name="email"
                  type="email"
                  pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
                />
                <p>{error.email}</p>

                <label>Phone</label>
                <input
                  onChange={this.handleChange}
                  value={User.soDt}
                  placeholder="Số Điện Thoại"
                  name="soDt"
                />
                <p>{error.soDt}</p>

                <label>Vai Trò</label>
                <input placeholder="Khách Hàng" disabled />

                <label>Chọn Nhóm</label>
                <select
                  name="maNhom"
                  value={User.maNhom}
                  onChange={this.handleChange}
                >
                  <option value="">Mã Nhóm</option>
                  {this.renderMaNhom()}
                </select>
                <br />
                <p>{error.maNhom}</p>

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
