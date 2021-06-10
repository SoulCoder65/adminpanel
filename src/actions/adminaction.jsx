import { businessQueriesStatic,updateBusinessQueriesStatic,usersQueriesStatic,updateUsersQueriesStatic} from "./static";
import axios from "../helpers/axios";
// <======================BusinessQueries=================================>
export const getBusinessQueries = (date) => {
  return async (dispatch) => {
    dispatch({ type: businessQueriesStatic.BUSINESS_QUERIES_STATIC_REQUEST });
    try {
      const res = await axios.post("/adminpanel/getbusinessqueriesdaywise", {
        date,
      });
      if (res.status == 200) {
        dispatch({
          type: businessQueriesStatic.BUSINESS_QUERIES_STATIC_SUCCESS,
          payload: {
            data: res.data,
          },
        });
      } else {
        dispatch({
          type: businessQueriesStatic.BUSINESS_QUERIES_STATIC_FAILURE,
          payload: {
            data: res.data,
          },
        });
      }
      return res;
    } catch (error) {
      dispatch({
        type: businessQueriesStatic.BUSINESS_QUERIES_STATIC_FAILURE,
        payload: {
          error: error.response,
        },
      });
      return error
    }
  };
};

export const updateBusinessQuery = (_id,status) => {
  return async (dispatch) => {
    dispatch({ type: updateBusinessQueriesStatic.UPDATE_BUSINESS_QUERIES_STATIC_REQUEST });
    try {
      const res = await axios.post("/adminpanel/updatebusinessquerystatus", {
        _id,
        status
      });
      if (res.status == 200) {
        dispatch({
          type: updateBusinessQueriesStatic.UPDATE_BUSINESS_QUERIES_STATIC_SUCCESS,
          payload: {
            data: res.data,
          },
        });
      } else {
        dispatch({
          type: updateBusinessQueriesStatic.UPDATE_BUSINESS_QUERIES_STATIC_FAILURE,
          payload: {
            data: res.data,
          },
        });
      }
      return res;
    } catch (error) {
      dispatch({
        type: updateBusinessQueriesStatic.UPDATE_BUSINESS_QUERIES_STATIC_FAILURE,
        payload: {
          error: error.response,
        },
      });
      return error
    }
  };
};

// <======================UsersQueries=================================>

export const getUsersQueries = (date) => {
  return async (dispatch) => {
    dispatch({ type: usersQueriesStatic.USER_QUERIES_STATIC_REQUEST });
    try {
      const res = await axios.post("/adminpanel/getusersqueriesdaywise", {
        date,
      });
      if (res.status == 200) {
        dispatch({
          type: usersQueriesStatic.USER_QUERIES_STATIC_SUCCESS,
          payload: {
            data: res.data,
          },
        });
      } else {
        dispatch({
          type: usersQueriesStatic.USER_QUERIES_STATIC_FAILURE,
          payload: {
            data: res.data,
          },
        });
      }
      return res;
    } catch (error) {
      dispatch({
        type: usersQueriesStatic.USER_QUERIES_STATIC_FAILURE,
        payload: {
          error: error.response,
        },
      });
      return error
    }
  };
};


export const updateUserQuery = (_id,status) => {
  return async (dispatch) => {
    dispatch({ type: updateUsersQueriesStatic.UPDATE_USER_QUERIES_STATIC_REQUEST });
    try {
      const res = await axios.post("/adminpanel/updateUserQueryStatus", {
        _id,
        status
      });
      if (res.status == 200) {
        dispatch({
          type: updateUsersQueriesStatic.UPDATE_USER_QUERIES_STATIC_SUCCESS,
          payload: {
            data: res.data,
          },
        });
      } else {
        dispatch({
          type: updateUsersQueriesStatic.UPDATE_USER_QUERIES_STATIC_FAILURE,
          payload: {
            data: res.data,
          },
        });
      }
      return res;
    } catch (error) {
      dispatch({
        type: updateUsersQueriesStatic.UPDATE_USER_QUERIES_STATIC_FAILURE,
        payload: {
          error: error.response,
        },
      });
      return error
    }
  };
};

// <------------------------Get all admins------------------->



// <------------------------Get all admins END------------------->
