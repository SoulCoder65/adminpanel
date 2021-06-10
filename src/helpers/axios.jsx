import axios from "axios";
import {api} from "../configURL";
import store from "../store"
import {authStatic} from "../actions/static"
//getting token of logged in user
const token=window.localStorage.getItem('token');
const axiosObject=axios.create({
    baseURL:api,
    headers:{
        'Authorization':token ? `Bearer ${token}`:''
    }
});

axiosObject.interceptors.request.use((req)=>{
    const {auth}=store.getState();
    if(auth.token)
    {
        req.headers.Authorization=`Bearer ${auth.token}`;
    }
    return req;
})

axiosObject.interceptors.response.use((res)=>{
    return res;
},(error)=>{
    const status=error.response ?error.response.status:500;
    if(status &&status==500)
    {
        localStorage.clear();
        store.dispatch({
            type:authStatic.LOGOUT_SUCCESS
        });
    }
    return Promise.reject(error);
})
export default axiosObject