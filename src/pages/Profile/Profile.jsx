import React from "react";
import PropTypes from "prop-types";
// import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import ShoppingBasket from "@material-ui/icons/ShoppingBasket";
import Box from "@material-ui/core/Box";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getInfoUserAction } from "../../store/actions/getInfoUser.action";
import "./css/profile.scss";
import "./css/profile.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Button } from "@material-ui/core";
import Loader from "../../components/Loader/Loader";
import format from "date-format";

// import HelpIcon from "@material-ui/icons/Help";
// import ThumbDown from "@material-ui/icons/ThumbDown";
// import ThumbUp from "@material-ui/icons/ThumbUp";
// import PhoneIcon from "@material-ui/icons/Phone";
// import FavoriteIcon from "@material-ui/icons/Favorite";
// import { red } from "@material-ui/core/colors";
// import CreateIcon from "@material-ui/icons/Create";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      <div className="menu"></div>
      {value === index && (
        <Box p={3} className="reponsiveTable">
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-prevent-tab-${index}`,
    "aria-controls": `scrollable-prevent-tabpanel-${index}`,
  };
}

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//     width: "100%",
//     // backgroundColor: theme.palette.background.paper,
//     // backgroundColor: red,
//   },
// }));

export default function ProfileUser() {
  // const classes = useStyles();
  const [value, setValue] = React.useState(0);
  let loading = useSelector((state) => state.CommonReducer.loading);
  console.log("loading:", loading);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const taiKhoan = JSON.parse(localStorage.getItem("taiKhoan"));
  const maLoaiNguoiDung = JSON.parse(localStorage.getItem("maLoaiNguoiDung"));

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getInfoUserAction(taiKhoan));
  }, [dispatch, taiKhoan]);

  const user = useSelector((state) => state.infoUserReducer);
  console.log("lịch sử vé", user.thongTinDatVe);

  // const renderCumRap = (danhSachGhe) => {
  //   return danhSachGhe?.map((item, index) => {
  //     return item.tenHeThongRap;
  //   });
  // };
  const renderLichSuDatVe = () => {
    return user.thongTinDatVe?.map((donHang, index) => {
      let soLuong = donHang.danhSachGhe.length;
      // let now = new Date();
      // console.log("Giờ hiện tại", now);
      // let trangThai = "Đã chiếu";

      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{donHang.tenPhim}</td>
          <td>{donHang.danhSachGhe[0].tenHeThongRap}</td>
          <td>{format("hh:mm dd-mm-yyyy", new Date(donHang.ngayDat))}</td>
          <td>{soLuong}</td>

          <td style={{ textAlign: "center" }}>{donHang.giaVe * soLuong}</td>
        </tr>
      );
    });
  };
  return loading ? (
    <Loader />
  ) : (
    <div className="containerS">
      <div className={"root"}>
        <AppBar position="static" className="menu">
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="off"
            aria-label="scrollable prevent tabs example"
          >
            <Tab
              icon={<PersonPinIcon />}
              aria-label="person"
              {...a11yProps(2)}
            />

            <Tab
              icon={<ShoppingBasket />}
              aria-label="shopping"
              {...a11yProps(4)}
            />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <h3 style={{ textAlign: "center", margin: "0 0 10px 0" }}>
            THÔNG TIN NGƯỜI DÙNG
          </h3>

          {/* <Loader /> */}
          <table className="table">
            {/* <thead></thead> */}
            <thead>
              <tr>
                <td>Họ tên: </td>
                <td>{user.hoTen}</td>
              </tr>
              <tr>
                <td>Email: </td>
                <td>{user.email}</td>
              </tr>
              <tr>
                <td>Số điện thoại: </td>
                <td>{user.soDT}</td>
              </tr>
              <tr>
                <td>Tài khoản: </td>
                <td>{user.taiKhoan}</td>
              </tr>
              <tr>
                <td>Mật khẩu: </td>
                <td>*******</td>
              </tr>
              <tr>
                <td>Vai trò: </td>
                <td>
                  {maLoaiNguoiDung === "QuanTri"
                    ? "Quản trị viên"
                    : "Khách hàng"}
                </td>
              </tr>
            </thead>
          </table>
          <Button
            variant="outlined"
            style={{
              width: "auto",
              border: "1px solid white",
              color: "#fa5238",
            }}
            id="btnUpdate"
          >
            {"Cập nhật thông tin "}
            {/* <CreateIcon /> */}
          </Button>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <h3 style={{ textAlign: "center", margin: "0 0 10px 0" }}>
            LỊCH SỬ ĐẶT VÉ
          </h3>
          <table className="table" id="table__booking">
            <thead>
              <tr className="">
                <th scope="col">STT</th>
                <th scope="col">Tên Phim</th>
                <th scope="col">Cụm rạp</th>
                <th scope="col">Ngày đặt</th>
                <th scope="col">Số lượng</th>
                {/* <th scope="col">Ghế</th> */}
                <th scope="col">Thành tiền</th>
              </tr>
            </thead>
            <tbody>{renderLichSuDatVe()}</tbody>
          </table>
        </TabPanel>
      </div>
    </div>
  );
}
