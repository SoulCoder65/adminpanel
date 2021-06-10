import { blockUnblockBusinessStatic } from "../../actions/static";

const initialState = {
  data: "",
  loading: false,
  error: "",
  message: "",
};
export default (state = initialState, action) => {
  switch (action.type) {
    case blockUnblockBusinessStatic.BLOCK_UNBLOCK_BUSINESS_USERS_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case blockUnblockBusinessStatic.BLOCK_UNBLOCK_BUSINESS_USERS_SUCCESS:
      state = {
        ...state,
        loading: false,

        message: action.payload.msg,
      };
      break;
    case blockUnblockBusinessStatic.BLOCK_UNBLOCK_BUSINESS_USERS_FAILURE:
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
