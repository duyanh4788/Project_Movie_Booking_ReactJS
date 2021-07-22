import React, { useState } from "react";
import "./scss/ClientManagement.css";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import { useEffect } from "react";
import {
  btnEditClient,
  btnThemNguoiDung,
  deleteListClientManagement,
  getInfoClient,
  getListClientManagement,
  getListSearchClientManagement,
  showFormClient,
} from "../../store/actions/clientManagement.action";
import FromEditClient from "./FromEditClient";
import Loader from "../Loader/Loader";
import FromAddClient from "./FromAddClient";

const useStyles = makeStyles({
  table: {
    maxWidth: "100%",
  },
});

const ClientMaragement = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  let loading = useSelector((state) => state.CommonReducer.loading);
  const listClient = useSelector((state) => {
    return state.ClientManagementReducer.listClient;
  });
  const pageFormClient = useSelector((state) => {
    return state.ClientManagementReducer.pageFormClient;
  });

  const [stateSearch, setStateSearch] = useState({
    search: "",
    maNhom: "GP01",
  });

  useEffect(() => {
    if (stateSearch.search === "") {
      dispatch(getListClientManagement(stateSearch.maNhom));
    }
  }, [dispatch, stateSearch.maNhom, stateSearch.search]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStateSearch({ ...stateSearch, [name]: value });
  };
  const submitSearchList = (e) => {
    e.preventDefault();
    dispatch(
      getListSearchClientManagement(stateSearch.maNhom, stateSearch.search)
    );
    if (stateSearch.search === "") {
      dispatch(getListClientManagement(stateSearch.maNhom));
    }
  };

  const deleteClient = (taiKhoan) => {
    dispatch(deleteListClientManagement(taiKhoan));
  };
  const editClient = (infoClient) => {
    dispatch(btnEditClient(0));
    dispatch(getInfoClient(infoClient));
    dispatch(showFormClient("updateList"));
  };
  const themNguoiDung = () => {
    dispatch(showFormClient("addClient"));
    dispatch(btnThemNguoiDung(null));
  };

  // table material
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, listClient.length - page * rowsPerPage);
  // table material

  // maNhom
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

  return loading ? (
    <Loader />
  ) : (
    <>
      {pageFormClient === "updateList" ? (
        <FromEditClient maNhom={stateSearch.maNhom} />
      ) : pageFormClient === "addClient" ? (
        <FromAddClient />
      ) : (
        <>
          <div className="titleClient"></div>
          <form onSubmit={submitSearchList}>
            <h5>Danh Sách Người Dùng</h5>
            <span>Mã Nhóm : </span>
            <select
              name="maNhom"
              value={stateSearch.maNhom}
              onChange={handleChange}
            >
              {renderMaNhom()}
            </select>
            <button type="button" onClick={themNguoiDung}>
              Thêm Người Dùng
            </button>
            <input
              className="inputSearch"
              type="text"
              placeholder="Tìm Người Dùng"
              name="search"
              onChange={handleChange}
              value={stateSearch.search}
            />
          </form>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: "bold" }}>
                    Tài Khoản
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>Mật Khẩu</TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>Họ Tên</TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>Email</TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>
                    Số Điện Thoại
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>Chức Vụ</TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>
                    Chức Năng
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listClient
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.taiKhoan}</TableCell>
                      <TableCell>{item.matKhau}</TableCell>
                      <TableCell>{item.hoTen}</TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>{item.soDt}</TableCell>
                      <TableCell>
                        {item.maLoaiNguoiDung === "QuanTri"
                          ? "Quản Trị"
                          : "Khách Hàng"}
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
                  ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={listClient.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </TableContainer>
        </>
      )}
    </>
  );
};
export default ClientMaragement;
