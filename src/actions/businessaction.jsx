import {
  businessStatic,
  businessListStatic,
  deleteBusinessStatic,
  blockUnblockBusinessStatic,
  getAllCategoryStatic,
  deleteCategoryStatic,
  updateCategoryStatic,
  createCategoryStatic,
  categoryStatsStatic,
} from "./static";
import axios from "../helpers/axios";

export const getBusinessData = (check) => {
  var res;
  return async (dispatch) => {
   
    dispatch({ type: businessStatic.BUSINESS_FETCH_MONTH_DATA_REQUEST });
    try {
      if(check==="year")
      {
         res = await axios.get("/adminpanel/getbusinessstatsmonthwise");
          
      }
      else if(check==="month")
      {
         res = await axios.get("/adminpanel/getbusinessstatscurrentmonth");
      }
      else if(check==="sevendays")
      {
        res = await axios.get("/adminpanel/getbusinessstatsdaywise");
      }
      else if(check==="lst24hrs")
      {
       res = await axios.get("/adminpanel/getbusinessstatslst24hrs");
      }
      if (res.status === 200) {
        const data = res.data;
        dispatch({
          type: businessStatic.BUSINESS_FETCH_MONTH_DATA_SUCCESS,
          payload: {
            data,
            msg: res.data.msg,
          },
        });
      } else {
        dispatch({
          type: businessStatic.BUSINESS_FETCH_MONTH_DATA_FAILURE,
          payload: {
            error: res.data.error,
          },
        });
      }
    } catch (e) {
      if (e.response) {
        dispatch({
          type: businessStatic.BUSINESS_FETCH_MONTH_DATA_FAILURE,
          payload: {
            error: e.response.data.message,
          },
        });
      }
      dispatch({
        type: businessStatic.BUSINESS_FETCH_MONTH_DATA_FAILURE,
        payload: {
          error: "Something Went Wrong!!",
        },
      });
    }
  };
};

export const getBusinessListData = () => {
  return async (dispatch) => {
    dispatch({ type: businessListStatic.BUSINESS_DATA_REQUEST });
    try {
      const res = await axios.get("/adminpanel/getbusinesslist");
      if (res.status === 200) {
        const data = res.data;
        dispatch({
          type: businessListStatic.BUSINESS_DATA_SUCCESS,
          payload: {
            data,
            msg: res.data.msg,
          },
        });
      } else {
        dispatch({
          type: businessListStatic.BUSINESS_DATA_FAILURE,
          payload: {
            error: res.data.error,
          },
        });
      }
    } catch (e) {
      if(e.response)
      {
        dispatch({
          type: businessListStatic.BUSINESS_DATA_FAILURE,
          payload: {
            error: e.response.data.message,
          },
        });
      }
      else{
        dispatch({
          type: businessListStatic.BUSINESS_DATA_FAILURE,
          payload: {
            error:"Something Went Wrong",
          },
        });
      }
    }
  };
};

// delete business

export const removeBusinessAccount = (_id,isInactive) => {
  return async (dispatch) => {
    dispatch({ type: deleteBusinessStatic.DELETE_BUSINESS_USERS_REQUEST });
    try {
      const res = await axios.post("/adminpanel/activeinactivebusiness", {
        _id: _id,
        isInactive:isInactive
        
      });
      if (res.status === 200) {
        dispatch({
          type: deleteBusinessStatic.DELETE_BUSINESS_USERS_SUCCESS,
          payload: {
            msg: res.data,
          },
        });
      } else {
        dispatch({
          type: deleteBusinessStatic.DELETE_BUSINESS_USERS_FAILURE,
          payload: {
            msg: res.data,
          },
        });
      }
      return res;
    } catch (error) {
      dispatch({
        type: deleteBusinessStatic.DELETE_BUSINESS_USERS_FAILURE,
        payload: {
          msg: error.response.data,
        },
      });
    }
    dispatch({
      type: deleteBusinessStatic.DELETE_BUSINESS_USERS_REQUEST,
      payload: {
        ..._id,
      },
    });
  };
};

// block unblock businessaccount

export const blockUnblock = (_id, isBlock) => {
  return async (dispatch) => {
    dispatch({
      type: blockUnblockBusinessStatic.BLOCK_UNBLOCK_BUSINESS_USERS_REQUEST,
    });
    try {
      const res = await axios.post("/adminpanel/blockunblockbusiness", {
        _id,
        isBlock,
      });
      if (res.status === 200) {
        dispatch({
          type: blockUnblockBusinessStatic.BLOCK_UNBLOCK_BUSINESS_USERS_SUCCESS,
          payload: {
            msg: res.data,
          },
        });
      } else {
        dispatch({
          type: blockUnblockBusinessStatic.BLOCK_UNBLOCK_BUSINESS_USERS_FAILURE,
          payload: {
            msg: res.data,
          },
        });
      }
      return res;
    } catch (error) {
      if(error.response)
      {
        dispatch({
          type: blockUnblockBusinessStatic.BLOCK_UNBLOCK_BUSINESS_USERS_FAILURE,
          payload: {
            msg: error.response.data,
          },
        });
      }
      else{
        dispatch({
          type: blockUnblockBusinessStatic.BLOCK_UNBLOCK_BUSINESS_USERS_FAILURE,
          payload: {
            msg: "Something Went Wrong",
          },
        });
      }
    }
    //  dispatch({
    //    type:blockUnblockBusinessStatic.DELETE_BUSINESS_USERS_FAILURE,
    //    payload:{
    //     _id,
    //     isBlock
    //    }
    //  })
  };
};

// <-----------------------Category-------------------------------->
//<-------------------Get All Category------------------------->

export const getAllCategories = () => {
  return async (dispatch) => {
    dispatch({ type: getAllCategoryStatic.GET_ALL_CATEGORIES_STATIC_REQUEST });
    try {
      const res = await axios.get("/adminpanel/getbusinesscategory");
      if (res.status === 200) {
        dispatch({
          type: getAllCategoryStatic.GET_ALL_CATEGORIES_STATIC_SUCCESS,
          payload: {
            data: res.data,
          },
        });
      } else {
        dispatch({
          type: getAllCategoryStatic.GET_ALL_CATEGORIES_STATIC_FAILURE,
          payload: {
            data: res.data,
          },
        });
      }
      return res;
    } catch (error) {
      if(error.response)
      {
        dispatch({
          type: getAllCategoryStatic.GET_ALL_CATEGORIES_STATIC_FAILURE,
          payload: {
            data: error.response.data,
          },
        });
      }
      else{
        dispatch({
          type: getAllCategoryStatic.GET_ALL_CATEGORIES_STATIC_FAILURE,
          payload: {
            data: "Something Went Wrong",
          },
        });
      }
    }
    dispatch({
      type: getAllCategoryStatic.GET_ALL_CATEGORIES_STATIC_REQUEST,
    });
  };
};

//<-------------------Get All Category END------------------------->

//<-------------------Delete Category ------------------------->

export const deletecategory = (_id,isActive) => {
  return async (dispatch) => {
    dispatch({ type: deleteCategoryStatic.DELETE_CATEGORY_STATIC_REQUEST });
    try {
      const res = await axios.post("/adminpanel/activeinactivebusinesscategory", {
        _id,
        isActive
      });
      if (res.status === 200) {
        dispatch({
          type: deleteCategoryStatic.DELETE_CATEGORY_STATIC_SUCCESS,
          payload: {
            data: res.data,
          },
        });
      } else {
        dispatch({
          type: deleteCategoryStatic.DELETE_CATEGORY_STATIC_FAILURE,
          payload: {
            msg: res.data,
          },
        });
      }
      return res;
    } catch (error) {
     if(error.response)
     {
      dispatch({
        type: deleteCategoryStatic.DELETE_CATEGORY_STATIC_FAILURE,
        payload: {
          msg: error.response.data,
        },
      });
     }
     else{
      dispatch({
        type: deleteCategoryStatic.DELETE_CATEGORY_STATIC_FAILURE,
        payload: {
          msg: "Something Went Wrong",
        },
      });
     }
    }
    dispatch({
      type: deleteCategoryStatic.DELETE_CATEGORY_STATIC_REQUEST,
    });
  };
};

//<-------------------Delete Category END------------------------->

//<-------------------UPdate Category ------------------------->

export const updatecategory = (_id, categoryname) => {
  return async (dispatch) => {
    dispatch({ type: updateCategoryStatic.UPDATE_CATEGORY_STATIC_REQUEST });
    try {
      const res = await axios.post("/adminpanel/updatebusinesscategory", {
        _id,
        categoryname,
      });
      if (res.status === 200) {
        dispatch({
          type: updateCategoryStatic.UPDATE_CATEGORY_STATIC_SUCCESS,
          payload: {
            data: res.data,
          },
        });
      } else {
        dispatch({
          type: updateCategoryStatic.UPDATE_CATEGORY_STATIC_FAILURE,
          payload: {
            msg: res,
          },
        });
      }
      return res;
    } catch (error) {
     if(error.response)
     {
      dispatch({
        type: updateCategoryStatic.UPDATE_CATEGORY_STATIC_FAILURE,
        payload: {
          msg: error.response,
        },
      });
     }
     else{
      dispatch({
        type: updateCategoryStatic.UPDATE_CATEGORY_STATIC_FAILURE,
        payload: {
          msg: "Something Went Wrong",
        },
      });
     }
    }
    dispatch({
      type: updateCategoryStatic.UPDATE_CATEGORY_STATIC_REQUEST,
    });
  };
};

//<-------------------UPdate Category END------------------------->
//<-------------------Create Category ------------------------>
export const createcategory = (category_name) => {
  return async (dispatch) => {
    dispatch({ type: createCategoryStatic.CREATE_CATEGORY_STATIC_REQUEST });
    try {
      const res = await axios.post("/adminpanel/createbusinesscategory", {
        category_name,
      });
      if (res.status === 200) {
        dispatch({
          type: createCategoryStatic.CREATE_CATEGORY_STATIC_SUCCESS,
          payload: {
            data: res.data,
          },
        });
      } else {
        dispatch({
          type: createCategoryStatic.CREATE_CATEGORY_STATIC_FAILURE,
          payload: {
            msg: res.data.msg,
          },
        });
      }
      return res;
    } catch (error) {
      if(error.response)
      {
        dispatch({
          type: createCategoryStatic.CREATE_CATEGORY_STATIC_FAILURE,
          payload: {
            msg: error.response.data.msg,
          },
        });
        return error.response;
    
      }
      else{
        dispatch({
          type: createCategoryStatic.CREATE_CATEGORY_STATIC_FAILURE,
          payload: {
            msg: "Something Went Wrong",
          },
        });
        return "network";
    
      }

      }
    };
};

//<-------------------Create Category END------------------------->

//<-------------------Create Category ------------------------>
export const getcategoryStats = () => {
  return async (dispatch) => {
    dispatch({ type: categoryStatsStatic.CATEGORY_STATS_STATIC_REQUEST });
    try {
      const res = await axios.get("/adminpanel/getbusinesscategoriesstats");
      if (res.status === 200) {
        dispatch({
          type: categoryStatsStatic.CATEGORY_STATS_STATIC_SUCCESS,
          payload: {
            data: res.data,
          },
        });
      } else {
        dispatch({
          type: categoryStatsStatic.CATEGORY_STATS_STATIC_FAILURE,
          payload: {
            msg: res.data.msg,
          },
        });
      }
      return res;
    } catch (error) {
      if(error.response)
      {
        dispatch({
          type: categoryStatsStatic.CATEGORY_STATS_STATIC_FAILURE,
          payload: {
            msg: error.response.data.msg,
          },
        });
  
        return error.response;
      }
      else{
        dispatch({
          type: categoryStatsStatic.CATEGORY_STATS_STATIC_FAILURE,
          payload: {
            msg: "Something Went Wrong",
          },
        });
  
        return "network";
      }
    }
    // dispatch({
    //   type: categoryStatsStatic.CATEGORY_STATS_STATIC_REQUEST,
    // });
  };
};

// <-----------------------Category END-------------------------------->
