import { businessStatic, businessListStatic } from "../../actions/static";

const initialState = {
  data: "",
  loading: false,
  error: "",
  message: "",
};
export default (state = initialState, action) => {
  switch (action.type) {
    case businessStatic.BUSINESS_FETCH_MONTH_DATA_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case businessStatic.BUSINESS_FETCH_MONTH_DATA_SUCCESS:
      state = {
        ...state,
        loading: false,
        data: action.payload.data,
        message: action.payload.msg,
      };
      break;
    case businessStatic.BUSINESS_FETCH_MONTH_DATA_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
        // message:action.payload.msg
      };
      break;
    
      // Business List
    case businessListStatic.BUSINESS_DATA_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case businessListStatic.BUSINESS_DATA_SUCCESS:
      state = {
        ...state,
        loading: false,
        data: action.payload.data,
        message: action.payload.msg,
      };
      break;
    case businessListStatic.BUSINESS_DATA_FAILURE:
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
