import { authStatic } from "./static";
import axios from "../helpers/axios";

export const signup=(user)=>{
  return async (dispatch)=>{
    dispatch({type:authStatic.SIGNUP_REQUEST});
    try {
      const res=await axios.post("/adminpanel/adminsignup",{
        ...user
      });
      if(res.status===200)
      {
        dispatch({
          type:authStatic.SIGNUP_SUCCESS,
          payload:{
            msg:res.data.message,
          }
        });
      }
      return res;
    } catch (error) {
      if(error.response)
      {
        dispatch({
          type:authStatic.SIGNUP_FAILURE,
          payload:{
            msg:error.response.msg
          }
        });
        return error.response;
   
      }
       dispatch({
        type: authStatic.SIGNUP_FAILURE,
        payload: {
          msg: "Something Went Wrong",
        },
      });
      return "network"
    
    }
  }
}


export const login = (user) => {
  return async (dispatch) => {
    dispatch({ type: authStatic.LOGIN_REQUEST });
    try {
      const res = await axios.post("/adminpanel/adminsignin", {
        ...user,
      });

      //checking status
      if (res.status === 200) {
        const { token, admin } = res.data;
        const user=admin;
        localStorage.setItem("token", token);
        localStorage.setItem("token", JSON.stringify(user));
        dispatch({
          type: authStatic.LOGIN_SUCCESS,
          payload: {
            token,
            user,
          },
        });
      } else {
        if (res.status === 400 || res.status === 403) {
          dispatch({
            type: authStatic.LOGIN_FAILURE,
            payload: {
              error: res.data,
            },
          });
        }
      }
      return res;
    } catch (error) {
      if (error.response) {
        dispatch({
          type: authStatic.LOGIN_FAILURE,
          payload: {
            error: "Something Went Wrong",
          },
        });
        return error.response;
      }
      dispatch({
        type: authStatic.LOGIN_FAILURE,
        payload: {
          error: "Something Went Wrong",
        },
      });
      return "network";
    }

  };
};

//prevent user from accessing login page if user already signin

export const isUserLogin = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch({
        type: authStatic.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      dispatch({
        type: authStatic.LOGIN_FAILURE,
        payload: { error: "Failed to procced" },
      });
    }
  };
};

//for logout
export const logout = () => {
  return async (dispatch) => {
    dispatch({
      type: authStatic.LOGOUT_REQUEST,
    });
    //calling signout api
    const res = await axios.post("/adminpanel/adminsignout");
    if (res.status === 201 || res.status === 200) {
      localStorage.clear();
      dispatch({
        type: authStatic.LOGOUT_SUCCESS,
      });
    } else {
      dispatch({
        type: authStatic.LOGOUT_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

// <-------------verify email----------------->
export const verifyEmail = (email) => {
  return async (dispatch) => {
    dispatch({
      type: authStatic.EMAIL_VERIFICATION_REQUEST,
    });
    try {
      const res = await axios.post("/adminpanel/verifyemail", {
        ...email,
      });

      if (res.status === 200) {
        dispatch({
          type: authStatic.EMAIL_VERIFICATION_SUCCESS,
          payload: {
            email,
            msg: res.data.msg,
          },
        });
      } else {
        if (res.status === 400 || res.status === 403) {
          dispatch({
            type: authStatic.EMAIL_VERIFICATION_FAILURE,
            payload: {
              msg: res.data.msg,
            },
          });
        }
      }
      return res;
    } catch (e) {
      if (e.response) {
        dispatch({
          type: authStatic.EMAIL_VERIFICATION_FAILURE,
          payload: {
            msg: "Something Went Wrong",
          },
        });
        return e.response;
      }
      dispatch({
        type: authStatic.EMAIL_VERIFICATION_FAILURE,
        payload: {
          msg: "Something Went Wrong",
        },
      });
      return "network";
    }
  
  };
};

// <-------------verify email End----------------->

// <-------------Change Password----------------->
export const changePassword = (data) => {
  return async (dispatch) => {
    dispatch({
      type: authStatic.CHANGE_PASSWORD_REQUEST,
    });
    try {
      const res = await axios.post("/adminpanel/updatepassword", {
        ...data,
      });

      if (res.status === 200) {
        dispatch({
          type: authStatic.CHANGE_PASSWORD_SUCCESS,
          payload: {
            data,
            msg: res.data.msg,
          },
        });
      } else {
        if (res.status === 400 || res.status === 403) {
          dispatch({
            type: authStatic.CHANGE_PASSWORD_FAILURE,
            payload: {
              msg: res.data.msg,
            },
          });
        }
      }
      return res
    } catch (e) {
      if (e.response) {
        dispatch({
          type: authStatic.CHANGE_PASSWORD_FAILURE,
          payload: {
            msg: "Something Went Wrong",
          },
        });
        return e.response;
      }
    
    dispatch({
      type: authStatic.CHANGE_PASSWORD_FAILURE,
      payload: {
        msg: "Something Went Wrong",
      },
    });
    return "network"
  }
    
  };
};

// <-------------Change PassworEnd----------------->

// <--------------------GET ALL SUBADMINS--------------->
export const getAllSubAdmins=()=>{
  return async (dispatch)=>{
    dispatch({
      type:authStatic.GET_ALL_ADMINS_REQUEST,
    });
    try {
      const res=await axios.get("/adminpanel/getalladmins");
      if(res.status===200)
      {
        dispatch({
          type:authStatic.GET_ALL_ADMINS_SUCCESS,
          payload:{
            data:res.data,
          }
        })
      }
      else{
        dispatch({
          type:authStatic.GET_ALL_ADMINS_FAILURE,
          payload:{
            msg:res.data.msg,
          }
        })
      }
      return res;
    } catch (error) {
      if(error.response)
      {
        dispatch(
          {
            type:authStatic.GET_ALL_ADMINS_FAILURE,
            payload:{
              msg:error.response,
            }
          }
        );
        return error.response;
      }
      dispatch(
        {
          type:authStatic.GET_ALL_ADMINS_FAILURE,
          payload:{
            msg:"Something Went Wrong",
          }
        }
      );
      return "network";

    }
  }
}

// <--------------------GET ALL SUBADMINS END--------------->

// <-------------------Edit SubAdmins----------------------->
// <--------------------GET ALL SUBADMINS--------------->
export const editSubAdmins=(data)=>{
  return async (dispatch)=>{
    dispatch({
      type:authStatic.EDIT_ADMIN_REQUEST,
    });
    try {
      const res=await axios.post("/adminpanel/updateadminprofile",{
        ...data
      });
      if(res.status===200)
      {
        dispatch({
          type:authStatic.EDIT_ADMIN_SUCCESS,
          payload:{
            data:res.data,
          }
        })
      }
      else{
        dispatch({
          type:authStatic.EDIT_ADMIN_FAILURE,
          payload:{
            msg:res.data.msg,
          }
        })
      }
      return res;
    } catch (error) {
      if(error.response)
      {
        dispatch(
          {
            type:authStatic.GET_ALL_ADMINS_FAILURE,
            payload:{
              msg:error.response,
            }
          }
        );
        return error.response;
      }
      dispatch(
        {
          type:authStatic.GET_ALL_ADMINS_FAILURE,
          payload:{
            msg:"Something Went Wrong",
          }
        }
      );
      return "network";

    }
  }
}

// <-------------------Edit SubAdmins END----------------------->

// <------------------Get All roles-------------------------->
export const getAllRoles=()=>{

  return async (dispatch)=>{
    dispatch({
      type:authStatic.GET_ALL_ROLES_REQUEST,
    });
    try {
      const res=await axios.get("/adminpanel/getallroles");
      if(res.status===200)
      {
        dispatch({
          type:authStatic.GET_ALL_ROLES_SUCCESS,
          payload:{
            data:res.data,
          }
        })
      }
      else{
        dispatch({
          type:authStatic.GET_ALL_ROLES_FAILURE,
          payload:{
            msg:res.data.msg,
          }
        })
      }
      return res;
    } catch (error) {
      if(error.response)
      {
        dispatch(
          {
            type:authStatic.GET_ALL_ROLES_FAILURE,
            payload:{
              msg:error.response,
            }
          }
        );
        return error.response;
      }
      dispatch(
        {
          type:authStatic.GET_ALL_ROLES_FAILURE,
          payload:{
            msg:"Something Went Wrong",
          }
        }
      );
      return "network";

    }
  }
}


// <------------------Get All roles END-------------------------->

// <------------------Create New Role---------------------------->

export const createNewRole=(role_name)=>{
  return async (dispatch)=>{
    dispatch({
      type:authStatic.CREATE_NEW_ROLE_REQUEST,
    });
    try {
      const res=await axios.post("/adminpanel/createnewrole",{
        role_name:role_name
      });
      if(res.status===200)
      {
        dispatch({
          type:authStatic.CREATE_NEW_ROLE_SUCCESS,
          payload:{
            data:res.data,
          }
        })
      }
      else{
        dispatch({
          type:authStatic.CREATE_NEW_ROLE_FAILURE,
          payload:{
            msg:res.data.msg,
          }
        })
      }
      return res;
    } catch (error) {
      if(error.response)
      {
        dispatch(
          {
            type:authStatic.CREATE_NEW_ROLE_FAILURE,
            payload:{
              msg:error.response,
            }
          }
        );
        return error.response;
      }
      dispatch(
        {
          type:authStatic.CREATE_NEW_ROLE_FAILURE,
          payload:{
            msg:"Something Went Wrong",
          }
        }
      );
      return "network";

    }
  }
}



// <------------------Create New Role END---------------------------->

// <------------------Edit admins access--------------------------->
export const editaccess=(_id,access)=>{
  return async (dispatch)=>{
    dispatch({
      type:authStatic.EDIT_ACCESS_REQUEST,
    });
    try {
      const res=await axios.post("/adminpanel/updateaccessfields",{
        _id:_id,
        access:access
      });
      if(res.status===200)
      {
        dispatch({
          type:authStatic.EDIT_ACCESS_SUCCESS,
          payload:{
            data:res.data,
          }
        })
      }
      else{
        dispatch({
          type:authStatic.EDIT_ACCESS_FAILURE,
          payload:{
            msg:res.data.msg,
          }
        })
      }
      return res;
    } catch (error) {
      if(error.response)
      {
        dispatch(
          {
            type:authStatic.EDIT_ACCESS_FAILURE,
            payload:{
              msg:error.response,
            }
          }
        );
        return error.response;
      }
      dispatch(
        {
          type:authStatic.EDIT_ACCESS_FAILURE,
          payload:{
            msg:"Something Went Wrong",
          }
        }
      );
      return "network";

    }
  }
}
// <------------------Edit admins access END--------------------------->


// <------------------access Specific role --------------------------->
export const accessspecificrole=(_id,role_name)=>{
  return async (dispatch)=>{
    dispatch({
      type:authStatic.GET_SPECIFIC_ROLE_REQUEST,
    });
    try {
      const res=await axios.post("/adminpanel/getspecificrole",{
        _id:_id!==undefined?_id:"",
        role_name:role_name!==undefined?role_name:""
      
      });
      if(res.status===200)
      {
        dispatch({
          type:authStatic.GET_SPECIFIC_ROLE_SUCCESS,
          payload:{
            data:res.data,
          }
        })
      }
      else{
        dispatch({
          type:authStatic.GET_SPECIFIC_ROLE_FAILURE,
          payload:{
            msg:res.data.msg,
          }
        })
      }
      return res;
    } catch (error) {
      if(error.response)
      {
        dispatch(
          {
            type:authStatic.GET_SPECIFIC_ROLE_FAILURE,
            payload:{
              msg:error.response,
            }
          }
        );
        return error.response;
      }
      dispatch(
        {
          type:authStatic.GET_SPECIFIC_ROLE_FAILURE,
          payload:{
            msg:"Something Went Wrong",
          }
        }
      );
      return "network";

    }
  }
}
// <------------------ access Specific role END--------------------------->