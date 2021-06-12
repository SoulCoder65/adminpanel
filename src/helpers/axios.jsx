import axios from "axios";
import { api, JWT_SECRET_KEY } from "../configURL";
import store from "../store";
import { authStatic } from "../actions/static";
//getting token of logged in user
const axiosObject = axios.create({
  baseURL: api,
  headers: {
    Authorization: JWT_SECRET_KEY ? `Bearer ${JWT_SECRET_KEY}` : "",
  },
});

axiosObject.interceptors.request.use((req) => {
  req.headers.Authorization = `Bearer ${JWT_SECRET_KEY}`;

  return req;
});

axiosObject.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    const status = error.response ? error.response.status : 500;
    if (status && status === 500) {
      localStorage.clear();
      store.dispatch({
        type: authStatic.LOGOUT_SUCCESS,
      });
    }
    return Promise.reject(error);
  }
);
export default axiosObject;
