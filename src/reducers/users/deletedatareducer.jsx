import { deleteUserStatic } from "../../actions/static";

const initialState = {
  data: "",
  loading: false,
  error: "",
  message: "",
};
export default (state = initialState, action) => {
  switch (action.type) {
    case deleteUserStatic.DELETE_USERS_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case deleteUserStatic.DELETE_USERS_SUCCESS:
      state = {
        ...state,
        loading: false,
        data: action.payload.data,
        message: action.payload.msg,
      };
      break;
    case deleteUserStatic.DELETE_USERS_FAILURE:
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
