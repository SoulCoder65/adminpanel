import { authStatic } from "../actions/static";

const initialState = {
  token: null,
  user: {
    email: "",
  },
  authenticate: false,
  authenticating: false,
  loading: false,
  error: "",
  message: "",
};
//login and logout reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case authStatic.LOGIN_REQUEST:
      state = {
        ...state,
        authenticating: true,
        loading: true,
      };
      break;
    case authStatic.LOGIN_SUCCESS:
      state = {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        authenticate: true,
        authenticating: false,
        loading: false,
      };
      break;
    case authStatic.LOGIN_FAILURE:
      state = {
        error: action.payload.error,
        loading: false,
        authenticating: false,
      };
      break;

      // signup
      case authStatic.SIGNUP_REQUEST:
      state = {
        ...state,
        authenticating: true,
        loading: true,
      };
      break;
    case authStatic.SIGNUP_SUCCESS:
      state = {
        ...state,
        message: action.payload.msg,
        authenticate: true,
        authenticating: false,
        loading: false,
      };
      break;
    case authStatic.SIGNUP_FAILURE:
      state = {
        error: action.payload.error,
        loading: false,
        authenticating: false,
      };
      break;

    //logout reducers
    case authStatic.LOGOUT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case authStatic.LOGOUT_SUCCESS:
      state = {
        ...initialState,
      };
      break;
    case authStatic.LOGOUT_FAILURE:
      state = {
        error: action.payload.error,
        loading: false,
      };
      break;

    // Email verification
    case authStatic.EMAIL_VERIFICATION_REQUEST:
      state = {
        ...state,
        message:"",
        loading: true,
      };
      break;
    case authStatic.EMAIL_VERIFICATION_SUCCESS:
      state = {
        ...state,
        user: action.payload.email,
        loading: false,
        message: action.payload.msg,
      };
      break;
    case authStatic.EMAIL_VERIFICATION_FAILURE:
      state = {
        loading: false,
        message: action.payload.msg,
      };
      break;

    // CHANGE PASSWORD
    case authStatic.CHANGE_PASSWORD_REQUEST:
      state = {
        ...state,
        message:"",

        loading: true,
      };
      break;
    case authStatic.CHANGE_PASSWORD_SUCCESS:
      state = {
        ...state,
        user: action.payload.user,
        loading: false,
        message: action.payload.msg,
      };
      break;
    case authStatic.CHANGE_PASSWORD_FAILURE:
      state = {
        loading: false,
        message: action.payload.msg,
      };
      break;

    default:
      break;
  }
  return state;
};
