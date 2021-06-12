import {
  userStatic,
  userListStatic,
  deleteUserStatic,
  blockUnblockUserStatic,
  daywiseConstants,
} from "./static";
import axios from "../helpers/axios";

export const getUserData = (check) => {
  var res;

  return async (dispatch) => {
    dispatch({ type: userStatic.USER_FETCH_MONTH_DATA_REQUEST });
    try {
      if (check === "year") {
        res = await axios.get("/adminpanel/getusersstatsmonthwise");
      } else if (check === "month") {
        res = await axios.get("/adminpanel/getusersstatscurrentmonth");
      } else if (check === "sevendays") {
        res = await axios.get("/adminpanel/getusersstatsdaywise");
      } else if (check === "lst24hrs") {
        res = await axios.get("/adminpanel/getusersstatslst24hrs");
      }
      if (res.status === 200) {
        const data = res.data;
        dispatch({
          type: userStatic.USER_FETCH_MONTH_DATA_SUCCESS,
          payload: {
            data,
            msg: res.data.msg,
          },
        });
      } else {
        dispatch({
          type: userStatic.USER_FETCH_MONTH_DATA_FAILURE,
          payload: {
            error: res.data.error,
          },
        });
      }
    } catch (e) {
      if (e.response) {
        dispatch({
          type: userStatic.USER_FETCH_MONTH_DATA_FAILURE,
          payload: {
            error: e.response.data.message,
          },
        });
      } else {
        dispatch({
          type: userStatic.USER_FETCH_MONTH_DATA_FAILURE,
          payload: {
            error: "Something Went Wrong",
          },
        });
      }
    }
  };
};
//get users
export const getUsersListData = () => {
  return async (dispatch) => {
    dispatch({ type: userListStatic.USER_DATA_REQUEST });
    try {
      const res = await axios.get("/adminpanel/getuserslist");
      if (res.status === 200) {
        const data = res.data;
        dispatch({
          type: userListStatic.USER_DATA_SUCCESS,
          payload: {
            data,
            msg: res.data.msg,
          },
        });
      } else {
        dispatch({
          type: userListStatic.USER_DATA_FAILURE,
          payload: {
            error: res.data.error,
          },
        });
      }
    } catch (e) {
      if (e.response) {
        dispatch({
          type: userListStatic.USER_DATA_FAILURE,
          payload: {
            error: e.response.data.message,
          },
        });
      } else {
        dispatch({
          type: userListStatic.USER_DATA_FAILURE,
          payload: {
            error: "Something Went Wrong",
          },
        });
      }
    }
  };
};

//delete user
export const removeUserAccount = (_id, isInactive) => {
  return async (dispatch) => {
    dispatch({ type: deleteUserStatic.DELETE_USERS_REQUEST });
    try {
      const res = await axios.post("/adminpanel/activeinactivecustomers", {
        _id: _id,
        isInactive: isInactive,
      });
      if (res.status === 200) {
        dispatch({
          type: deleteUserStatic.DELETE_USERS_SUCCESS,
          payload: {
            msg: res.data,
          },
        });
      } else {
        dispatch({
          type: deleteUserStatic.DELETE_USERS_FAILURE,
          payload: {
            msg: res.data,
          },
        });
      }
      return res;
    } catch (error) {
      if (error.response) {
        dispatch({
          type: deleteUserStatic.DELETE_USERS_FAILURE,
          payload: {
            msg: error.response.data,
          },
        });
      } else {
        dispatch({
          type: deleteUserStatic.DELETE_USERS_FAILURE,
          payload: {
            msg: "Something Went Wrong",
          },
        });
      }
    }
    dispatch({
      type: deleteUserStatic.DELETE_USERS_REQUEST,
      payload: {
        ..._id,
      },
    });
  };
};

// block unblock usersaccount

export const blockUnblockUser = (_id, isBlock) => {
  return async (dispatch) => {
    dispatch({
      type: blockUnblockUserStatic.BLOCK_UNBLOCK_USERS_REQUEST,
    });
    try {
      const res = await axios.post("/adminpanel/blockunblockuser", {
        _id,
        isBlock,
      });
      if (res.status === 200) {
        dispatch({
          type: blockUnblockUserStatic.BLOCK_UNBLOCK_USERS_SUCCESS,
          payload: {
            msg: res.data,
          },
        });
      } else {
        dispatch({
          type: blockUnblockUserStatic.BLOCK_UNBLOCK_USERS_FAILURE,
          payload: {
            msg: res.data,
          },
        });
      }
      return res;
    } catch (error) {
      if (error.response) {
        dispatch({
          type: blockUnblockUserStatic.BLOCK_UNBLOCK_USERS_FAILURE,
          payload: {
            msg: error.response.data,
          },
        });
      } else {
        dispatch({
          type: blockUnblockUserStatic.BLOCK_UNBLOCK_USERS_FAILURE,
          payload: {
            msg: "Something Went Wrong",
          },
        });
      }
    }
  };
};

// <--------------DayWise Records----------------------------->

export const daywiseData = (date) => {
  return async (dispatch) => {
    dispatch({
      type: daywiseConstants.DAY_WISE_STATIC_REQUEST,
    });
    try {
      const res = await axios.post("/adminpanel/getlistoftokensdaywise", {
        date,
      });
      if (res.status === 200) {
        dispatch({
          type: daywiseConstants.DAY_WISE_STATIC_SUCCESS,
          payload: {
            data: res.data,
          },
        });
      } else {
        dispatch({
          type: daywiseConstants.DAY_WISE_STATIC_FAILURE,
          payload: {
            msg: res.data,
          },
        });
      }
      return res;
    } catch (error) {
      if (error.response) {
        dispatch({
          type: daywiseConstants.DAY_WISE_STATIC_FAILURE,
          payload: {
            msg: error.response.data,
          },
        });
        return error.response;
      } else {
        dispatch({
          type: daywiseConstants.DAY_WISE_STATIC_FAILURE,
          payload: {
            msg: "Something Went Wrong",
          },
        });
        return "network";
      }
    }
  };
};
