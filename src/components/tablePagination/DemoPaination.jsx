import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Pagination from "@material-ui/lab/Pagination";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import "./scss/DemoPaination.css";
import {
  getListClientPagination,
  getListSearchClientPagination,
} from "../../store/actions/listClientPagination.action";
import { Container, Grid } from "@material-ui/core";
import {
  btnEditClient,
  btnThemNguoiDung,
  deleteListClientManagement,
  getInfoClient,
  showFormClient,
} from "../../store/actions/clientManagement.action";
import { setDataErrorToZero } from "../../store/actions/messageSnackbar.action";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Loader from "../Loader/Loader";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const DemoPaination = () => {
  const dispatch = useDispatch();
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
  // snackbar
  // show loading
  const loading = useSelector((state) => state.CommonReducer.loading);
  // get data reducer
  const listUserPagination = useSelector(
    (state) => state.ListClientPaginationReducer.listUserPagination
  );
  const updateSuccess = useSelector((state) => {
    return state.ClientManagementReducer?.updateSuccess;
  });
  // page
  const [page, setPage] = React.useState(1);
  // row page
  const [stateRowsPage, setRowsPage] = useState({
    page: "5",
  });
  //search
  const [stateSearch, setSearch] = useState({
    search: "",
  });
  // get maNhom
  const [stateMaNhom, setMaNhom] = useState({
    maNhom: "GP01",
  });
  // call api
  useEffect(() => {
    if (stateSearch.search === "") {
      dispatch(
        getListClientPagination(stateMaNhom.maNhom, page, stateRowsPage.page)
      );
    }
  }, [
    dispatch,
    stateMaNhom.maNhom,
    page,
    stateSearch.search,
    stateRowsPage.page,
  ]);
  // call api
  useEffect(() => {
    if (stateSearch.search !== "" || updateSuccess === 200) {
      dispatch(
        getListSearchClientPagination(
          stateMaNhom.maNhom,
          stateSearch.search,
          page,
          stateRowsPage.page
        )
      );
    }
  }, [
    dispatch,
    stateMaNhom.maNhom,
    page,
    stateSearch.search,
    stateRowsPage.page,
    updateSuccess,
  ]);
  // setpage
  const handleChangePage = (event, value) => {
    setPage(value);
  };
  const handleMaNhom = (e) => {
    setMaNhom({ ...stateMaNhom, maNhom: e.target.value });
    setPage(1);
  };
  const handleSearch = (e) => {
    setSearch({ ...stateSearch, search: e.target.value });
  };
  const handleRowPage = (e) => {
    setRowsPage({ ...stateRowsPage, page: e.target.value });
  };
  // delete
  const deleteClient = (taiKhoan) => {
    dispatch(deleteListClientManagement(taiKhoan));
    handleClick();
  };
  // edit
  const editClient = (infoClient) => {
    dispatch(btnEditClient(0));
    dispatch(getInfoClient(infoClient));
    dispatch(setDataErrorToZero(0));
    dispatch(showFormClient("updateList"));
  };
  // update
  const themNguoiDung = () => {
    dispatch(btnThemNguoiDung(null));
    dispatch(setDataErrorToZero(0));
    dispatch(showFormClient("addClient"));
  };
  // render
  const renderListClient = () => {
    return listUserPagination.map((item, index) => {
      return (
        <TableRow key={index}>
          <TableCell>{item.taiKhoan}</TableCell>
          <TableCell>{item.matKhau}</TableCell>
          <TableCell>{item.hoTen}</TableCell>
          <TableCell>{item.soDt}</TableCell>
          <TableCell>{item.email}</TableCell>
          <TableCell>{item.maLoaiNguoiDung}</TableCell>
          <TableCell>
            {item.maLoaiNguoiDung === "QuanTri" ? "Quản Trị" : "Khách Hàng"}
          </TableCell>
          <TableCell>
            <DeleteOutlineRoundedIcon
              className="iconDelete"
              onClick={() => {
                deleteClient(item.taiKhoan);
              }}
            />
            <EditRoundedIcon
              className="iconEdit"
              onClick={() => {
                editClient(item);
              }}
            />
          </TableCell>
        </TableRow>
      );
    });
  };
  // render maNhom
  const renderMaNhom = () => {
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
  };
  // render html
  return loading ? (
    <Loader />
  ) : (
    <>
      <div className="formClient">
        <span>Mã Nhóm : </span>
        <select
          name="maNhom"
          value={stateMaNhom.maNhom}
          onChange={handleMaNhom}
        >
          {renderMaNhom()}
        </select>
        <button type="button" onClick={themNguoiDung}>
          Thêm Người Dùng
        </button>
        <input
          className="inputSearch"
          type="text"
          placeholder="Tìm Người Dùng API"
          name="search"
          onChange={handleSearch}
          value={stateSearch.search}
        />
      </div>
      <TableContainer component={Paper}>
        <Table className="tableClient" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>Tài Khoản</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Mật Khẩu</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Họ Tên</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Phone</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Email</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Chức Vụ</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Thao Tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderListClient()}</TableBody>
        </Table>
        <Container maxWidth="sm" className="pagination">
          <Grid container>
            <Grid item lg={4}>
              <span> Rows per page : </span>
              <select
                name="stateRowsPage"
                onChange={handleRowPage}
                value={stateRowsPage.page}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
              </select>
            </Grid>
            <Grid item lg={8}>
              <Pagination count={5} page={page} onChange={handleChangePage} />
            </Grid>
          </Grid>
        </Container>
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          {statusCode === 200 ? (
            <Alert onClose={handleClose} severity="success">
              Xoá Thành Công
            </Alert>
          ) : (
            <Alert onClose={handleClose} severity="error">
              {errorMessage}
            </Alert>
          )}
        </Snackbar>
      </TableContainer>
    </>
  );
};
export default DemoPaination;
