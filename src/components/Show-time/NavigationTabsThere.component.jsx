import React from "react";
// redux hook
import { useSelector } from "react-redux";
// material ui
import { Grid } from "@material-ui/core";

function NavigationTabsTherecomponent() {
  const nameCinema = useSelector((state) => {
    return state.TabNavigationComponentReducer.nameCinema; // get data to TabNavigationReducer
  });
  const listFlimDetail = useSelector((state) => {
    return state.detaiMovielReducer.detail?.lichChieu; // get data to detaiMovielReducer
  });
  console.log("listFlimDetail", listFlimDetail);
  const renderTenPhim = () => {
    return listFlimDetail
      .filter((name) => name.thongTinRap.maCumRap === nameCinema)
      .map((item, index) => {
        return (
          <Grid item xs={12} key={index} className="rowThereNavigation_Child">
            <div className="rowThereNavigation_Child_Intro">
              {/* <div className="Child_Intro_Img">
                <img src="" alt="" />
              </div> */}
              <div className="Child_Intro">
                <label className={`maRap_${item.thongTinRap.maHeThongRap}`}>
                  {item.maRap}
                </label>
                <span> Tên Phim : {item.tenPhim}</span>
                <p>
                  Thời Lượng : {item.thoiLuong} phút - {item.ngayChieuGioChieu}
                </p>
                <p className={`${item.thongTinRap.maHeThongRap}`}>
                  Tên Rạp : {item.thongTinRap.tenCumRap}
                </p>
              </div>
            </div>
          </Grid>
        );
      });
  };
  return (
    <Grid
      container
      item
      xs={6}
      className="rowThereNavigation"
    >
      {renderTenPhim()}
    </Grid>
  );
}

export default NavigationTabsTherecomponent;
