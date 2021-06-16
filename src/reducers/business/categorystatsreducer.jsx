import { categoryStatsStatic } from "../../actions/static";

const initialState = {
  data: [],
  loading: false,
  error: "",
  message: "",
};
export default (state = initialState, action) => {
  switch (action.type) {
    case categoryStatsStatic.CATEGORY_STATS_STATIC_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case categoryStatsStatic.CATEGORY_STATS_STATIC_SUCCESS:
      state = {
        ...state,
        loading: false,
        data: action.payload.data,
         };
      break;
    case categoryStatsStatic.CATEGORY_STATS_STATIC_FAILURE:
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