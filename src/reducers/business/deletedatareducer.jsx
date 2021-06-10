import { deleteBusinessStatic } from "../../actions/static";

const initialState = {
  data: "",
  loading: false,
  error: "",
  message: "",
};
export default (state = initialState, action) => {
  switch (action.type) {
    case deleteBusinessStatic.DELETE_BUSINESS_USERS_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case deleteBusinessStatic.DELETE_BUSINESS_USERS_SUCCESS:
      state = {
        ...state,
        loading: false,
        data: action.payload.data,
        message: action.payload.msg,
      };
      break;
    case deleteBusinessStatic.DELETE_BUSINESS_USERS_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
        // message:action.payload.msg
      };
      break;

    default:
      break;
  }
  return state;
};
