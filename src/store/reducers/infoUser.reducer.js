import { GET_INFO_USER, UPDATE_INFO_USER } from "../constants/getInfoUser.const";

const initialState = {
  inforUser: {
    hoTen: "",
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDT: "",
    loaiNguoiDung: "",
    maNhom: "",
  },
  thongTinDatVe: [],

};

const infoUserReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_INFO_USER: {
      const { thongTinDatVe, ..._payload } = payload
      state.thongTinDatVe = thongTinDatVe
      state.inforUser = _payload;
      return { ...state };
    }
    case UPDATE_INFO_USER: {
      let update = { ...state.inforUser }
      update = payload
      state.inforUser = update
      return { ...state };
    }
    default:
      return state;
  }
};
export default infoUserReducer;
