import { updateUsersQueriesStatic } from "../../actions/static";

const initialState = {
  data: {},
  loading: false,
  error: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case updateUsersQueriesStatic.UPDATE_USER_QUERIES_STATIC_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case updateUsersQueriesStatic.UPDATE_USER_QUERIES_STATIC_SUCCESS:
      state = {
        ...state,
        loading: false,
        data: action.payload.data,
      };
      break;
    case updateUsersQueriesStatic.UPDATE_USER_QUERIES_STATIC_FAILURE:
      state = {
        ...state,
        loading: false,
        data: {},
        error: action.payload.data,
      };
    default:
      break;
  }
  return state;
};
