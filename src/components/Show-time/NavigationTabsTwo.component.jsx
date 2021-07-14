import React from "react";
// redux hook
import { useDispatch, useSelector } from "react-redux";
// material ui
import { Grid } from "@material-ui/core";
import { nameCinematAction } from "../../store/actions/tabNavigationComponent.action";

function NavigationTabsTwocomponent() {
  const dispatch = useDispatch();
  const codeCinema = useSelector((state) => {
    return state.TabNavigationComponentReducer.codeCinema; // get data to TabNavigationReducer
  });
  console.log(codeCinema);
  const showTimeList = useSelector((state) => {
    return state.detaiMovielReducer.detail?.lichChieu; // get data to detaiMovielReducer
  });
  console.log(showTimeList);
  const handleTenPhim = (nameCinema) => {
    dispatch(nameCinematAction(nameCinema));
  };

  const renderTenRap = () => {
    return showTimeList
      .filter((item) => item.thongTinRap.maHeThongRap === codeCinema) // (note : (filter) call action more detaiMovielReducer ??? )
      .map((item, index) => {
        return (
          <Grid item xs={12} key={index} className="rowTwoNavigation_Child">
            <div className="rowTwoNavigation_Child_Intro">
              <div>
                <img src="" alt="" />
              </div>
              <div className="Child_Intro">
                <label className={`${codeCinema}`}>
                  {item.thongTinRap.maRap} - {item.thongTinRap.tenHeThongRap}
                </label>
                <p>{item.thongTinRap.tenCumRap}</p>
                <span
                  onClick={() => {
                    handleTenPhim(item.thongTinRap.maCumRap);
                  }}
                >
                  [Chi Tiết]
                </span>
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
      xs={5}
      className="rowTwoNavigation"
    >
      {renderTenRap()}
    </Grid>
  );
}

export default NavigationTabsTwocomponent;
