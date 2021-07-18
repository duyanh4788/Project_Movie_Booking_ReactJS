import React, { useState } from "react";
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
import { withStyles } from "@material-ui/styles";
import { styled } from "./Sign-In.style";
// modal
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Loader from "../../components/Loader/Loader";
/**
 * localStorage save signIn.action
 */

function SignInPage(props) {
  const { classes } = props;
  const history = useHistory();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    taiKhoan: "",
    matKhau: "",
  });
  // const apiUrl = props.location.state;
  const hanldeSubmit = (event) => {
    event.preventDefault(); // lock submit
    setOpen(true); // open modal
    dispatch(signIn_Action(user, history)); // post data ( user => client impot , history =>  use to navigate ) up axios action/signIn.action
  };

  const hanldeChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value }); // es6 object literal
  };

  // modal
  const errMesage = useSelector((state) => {
    return state.signInReducer.errMesage;
  });

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  // modal

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
              <h4>Sign in</h4>
              <form noValidate onSubmit={hanldeSubmit}>
                <input
                  type="text"
                  placeholder="Tài Khoản"
                  name="taiKhoan"
                  value={user.taiKhoan}
                  onChange={hanldeChange}
                />
                <input
                  type="password"
                  placeholder="Mật Khẩu"
                  name="matKhau"
                  value={user.matKhau}
                  onChange={hanldeChange}
                />

                <div style={{ textAlign: "center" }}>
                  <button type="submit">Đăng Nhập</button>
                </div>
              </form>
            </Container>
          </div>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <div className="modalTitle">
                <p>{errMesage}</p>
              </div>
            </Fade>
          </Modal>
        </div>
      )}
    </>
  );
}

export default withStyles(styled)(SignInPage);
