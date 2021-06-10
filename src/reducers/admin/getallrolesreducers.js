import {authStatic} from "../../actions/static"

const initialState={
    data:[],
    loading:false,
    error:"",
}

export default (state=initialState,action)=>{
    switch (action.type) {
        case authStatic.GET_ALL_ROLES_REQUEST:
            state={
                ...state,
                loading:true
            }
            break;
        case authStatic.GET_ALL_ROLES_SUCCESS:
            state={
                ...state,
                loading:false,
                data:action.payload.data,
            };
            break;
        case authStatic.GET_ALL_ROLES_FAILURE:
            state={
                ...state,
                loading:false,
                data:[],
                error:action.payload.msg
            }
        default:
            break;
    }
    return state
}