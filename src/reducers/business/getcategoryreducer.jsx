import {getAllCategoryStatic} from "../../actions/static"

const initialState={
    data:[],
    loading:false,
    error:"",
}

export default (state=initialState,action)=>{
    switch (action.type) {
        case getAllCategoryStatic.GET_ALL_CATEGORIES_STATIC_REQUEST:
            state={
                ...state,
                loading:true
            }
            break;
        case getAllCategoryStatic.GET_ALL_CATEGORIES_STATIC_SUCCESS:
            state={
                ...state,
                loading:false,
                data:action.payload.data,
            };
            break;
        case getAllCategoryStatic.GET_ALL_CATEGORIES_STATIC_FAILURE:
            state={
                ...state,
                loading:false,
                error:action.payload.data
            };
            break;
        default:
            break;
    }
    return state
}