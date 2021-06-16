import {authStatic} from "../../actions/static"

const initialState={
    data:{},
    loading:false,
    error:"",
}

export default (state=initialState,action)=>{
    switch (action.type) {
        case authStatic.UPDATE_ROLE_REQUEST:
            state={
                ...state,
                loading:true
            }
            break;
        case authStatic.UPDATE_ROLE_SUCCESS:
            state={
                ...state,
                loading:false,
                data:action.payload.data,
            };
            break;
        case authStatic.UPDATE_ROLE_FAILURE:
            state={
                ...state,
                loading:false,
                data:{},
                error:action.payload.error
            };
            break;
        default:
            break;
    }
    return state
}