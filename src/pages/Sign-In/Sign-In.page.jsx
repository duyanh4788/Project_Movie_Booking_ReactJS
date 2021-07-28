import React, { useEffect, useState } from "react";
import "./scss/signIn.css";
// redux hook
import { useDispatch, useSelector } from "react-redux";
// action redux thunk
import { signIn_Action } from "../../store/actions/signIn.action";
// react router dom
import { useHistory } from "react-router-dom";
// material
import { Container } from "@material-ui/core";
// styled materiall
// modal
import Loader from "../../components/Loader/Loader";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
/**
 * localStorage save signIn.action
 */

function SignInPage(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    taiKhoan: "",
    matKhau: "",
  });

  // snackbar
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  // show status
  const statusCode = useSelector(
    (state) => state.MessageSnackbarReducer.statusCode
  );
  const errorMessage = useSelector(
    (state) => state.MessageSnackbarReducer.errorMessage
  );
  // show status
  useEffect(() => {
    if (statusCode === 500) {
      handleClick();
    }
  }, [statusCode]);
  // snackbar

  const hanldeSubmit = (event) => {
    event.preventDefault(); // lock submit
    dispatch(signIn_Action(user, history)); // post data ( user => client impot , history =>  use to navigate ) up axios action/signIn.action
    handleClick();
  };

  const handlChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value }); // es6 object literal
  };

  // loading
  const loading = useSelector((state) => {
    return state.CommonReducer.loading;
  });

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="backgroundSignIn">
          <div className="wrapLogin">
            <Container>
              <h5>Sign in</h5>
              <form noValidate onSubmit={hanldeSubmit}>
                <input
                  type="text"
                  placeholder="Tài Khoản"
                  name="taiKhoan"
                  value={user.taiKhoan}
                  onChange={handlChange}
                />
                <input
                  type="password"
                  placeholder="Mật Khẩu"
                  name="matKhau"
                  value={user.matKhau}
                  onChange={handlChange}
                />

                <div style={{ textAlign: "center" }}>
                  <button type="submit">Đăng Nhập</button>
                </div>
              </form>
            </Container>
          </div>
        </div>
      )}
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default SignInPage;
