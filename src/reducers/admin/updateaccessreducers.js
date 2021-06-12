import {authStatic} from "../../actions/static"

const initialState={
    data:{},
    loading:false,
    error:"",
}

export default (state=initialState,action)=>{
    switch (action.type) {
        case authStatic.EDIT_ACCESS_REQUEST:
            state={
                ...state,
                loading:true
            }
            break;
        case authStatic.EDIT_ACCESS_SUCCESS:
            state={
                ...state,
                loading:false,
                data:action.payload.data,
            };
            break;
        case authStatic.EDIT_ACCESS_FAILURE:
            state={
                ...state,
                loading:false,
                data:{},
                error:action.payload.msg
            };
            break;
        default:
            break;
    }
    return state
}