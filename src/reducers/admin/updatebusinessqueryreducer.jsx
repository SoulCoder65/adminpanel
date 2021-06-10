import {updateBusinessQueriesStatic} from "../../actions/static"

const initialState={
    data:{},
    loading:false,
    error:"",
}

export default (state=initialState,action)=>{
    switch (action.type) {
        case updateBusinessQueriesStatic.UPDATE_BUSINESS_QUERIES_STATIC_REQUEST:
            state={
                ...state,
                loading:true
            }
            break;
        case updateBusinessQueriesStatic.UPDATE_BUSINESS_QUERIES_STATIC_SUCCESS:
            state={
                ...state,
                loading:false,
                data:action.payload.data,
            };
            break;
        case updateBusinessQueriesStatic.UPDATE_BUSINESS_QUERIES_STATIC_FAILURE:
            state={
                ...state,
                loading:false,
                data:{},
                error:action.payload.data
            }
        default:
            break;
    }
    return state
}