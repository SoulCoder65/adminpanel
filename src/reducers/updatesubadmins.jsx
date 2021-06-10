import { authStatic } from "../actions/static";

const initialState = {
  data: [],
  loading: false,
  error: "",
  message: "",
};
export default (state = initialState, action) => {
  switch (action.type) {
    case authStatic.EDIT_ADMIN_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case authStatic.EDIT_ADMIN_SUCCESS:
      state = {
        ...state,
        loading: false,
        data: action.payload.data,
         };
      break;
    case authStatic.EDIT_ADMIN_FAILURE:
      state = {
        ...state,
        loading: false,
        message:action.payload.msg,
        error: action.payload.error,
        // message:action.payload.msg
      };
      break;

    default:
      break;
  }
  return state;
};
