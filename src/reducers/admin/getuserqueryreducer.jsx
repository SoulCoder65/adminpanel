import {usersQueriesStatic} from "../../actions/static"

const initialState={
    data:[],
    loading:false,
    error:"",
}

export default (state=initialState,action)=>{
    switch (action.type) {
        case usersQueriesStatic.USER_QUERIES_STATIC_REQUEST:
            state={
                ...state,
                loading:true
            }
            break;
        case usersQueriesStatic.USER_QUERIES_STATIC_SUCCESS:
            state={
                ...state,
                loading:false,
                data:action.payload.data,
            };
            break;
        case usersQueriesStatic.USER_QUERIES_STATIC_FAILURE:
            state={
                ...state,
                loading:false,
                data:[],
                error:action.payload.data
            };
            break;
        default:
            break;
    }
    return state
}