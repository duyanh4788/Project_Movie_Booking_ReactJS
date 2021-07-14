import React, { Component } from "react";
// action redux thunk
import { postSignUp_Action } from "../../store/actions/signUp.action";
// material
import TextField from "@material-ui/core/TextField";
import { Button, Container, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
// styled materiall
import { styled } from "./Sign-Up.style";

class SignUpPage extends Component {
  state = {
    User: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: "GP01",
      maLoaiNguoiDung: "KhachHang",
      hoTen: "",
    },
    error: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      hoTen: "",
    },
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    let valuesUpdate = { ...this.state.User, [name]: value };
    let errorUpdate = { ...this.state.error, [name]: value };
    if (value.trim() === "") {
      errorUpdate[name] = " Is required ! ";
    } else {
      errorUpdate[name] = "";
    }
    this.setState({
      User: valuesUpdate,
      error: errorUpdate,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    postSignUp_Action // post data up axios action/signUp.action
      .signUp(this.state.User) // data client import
      .then((result) => {
        console.log(result.data);// check log data post up axios 
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    const { classes } = this.props;
    const { User, error } = this.state;
    return (
      <Container>
        <Typography className={classes.textIntro}>Form Register</Typography>
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={this.handleSubmit}
        >
          <div>
            <TextField
              onChange={this.handleChange}
              value={User.taiKhoan}
              className={classes.textFiled}
              id="standard-secondary"
              label="Tài Khoản"
              name="taiKhoan"
              color="secondary"
            />
            <Typography className={classes.errMesage}>
              {error.taiKhoan}
            </Typography>
          </div>
          <div>
            <TextField
              onChange={this.handleChange}
              value={User.matKhau}
              className={classes.textFiled}
              id="standard-secondary"
              label="Mật Khẩu"
              name="matKhau"
              color="secondary"
            />
            <Typography className={classes.errMesage}>
              {error.matKhau}
            </Typography>
          </div>
          <div>
            <TextField
              onChange={this.handleChange}
              value={User.email}
              className={classes.textFiled}
              id="standard-secondary"
              label="Email"
              name="email"
              color="secondary"
            />
            <Typography className={classes.errMesage}>{error.email}</Typography>
          </div>
          <div>
            <TextField
              onChange={this.handleChange}
              value={User.soDt}
              className={classes.textFiled}
              id="standard-secondary"
              label="Số Điện Thoại"
              name="soDt"
              color="secondary"
            />
            <Typography className={classes.errMesage}>{error.soDt}</Typography>
          </div>
          <div>
            <TextField
              onChange={this.handleChange}
              value={User.hoTen}
              className={classes.textFiled}
              id="standard-secondary"
              label="User Name"
              name="hoTen"
              color="secondary"
            />
            <Typography className={classes.errMesage}>{error.hoTen}</Typography>
          </div>
          <div>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </div>
        </form>
      </Container>
    );
  }
}
export default withStyles(styled)(SignUpPage);
