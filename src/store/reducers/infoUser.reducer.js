import { GET_INFO_USER } from "../constants/getInfoUser.const";

const initialState = {
  hoTen: "",
  email: "",
  soDT: "",
  taiKhoan: "",
  matKhau: "",
};

const infoUserReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_INFO_USER:
      console.log("payload", payload);
      state = payload;
      return { ...state };
    default:
      return state;
  }
};
export default infoUserReducer;
