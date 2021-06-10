import {daywiseConstants} from "../../actions/static"

const initialState={
    data:"",
    loading:false,
    error:"",
    message:""
}
export default(state=initialState,action)=>{
    switch (action.type) {
              // USERS List
    case daywiseConstants.DAY_WISE_STATIC_REQUEST:
        state = {
          ...state,
          loading: true,
        };
        break;
      case daywiseConstants.DAY_WISE_STATIC_SUCCESS:
        state = {
          ...state,
          loading: false,
          data: action.payload.data,
          message: action.payload.msg,
        };
        break;
      case daywiseConstants.DAY_WISE_STATIC_FAILURE:
        state = {
          ...state,
          loading: false,
          data:[],
          error: action.payload.error,
          // message:action.payload.msg
        };
        break;
        
        default:
            break;
    }
    return state
}