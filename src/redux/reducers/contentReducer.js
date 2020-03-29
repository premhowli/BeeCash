import {
    CHANGE_VIEW_TYPE,
    GET_ALL_CONTENT,
} from '../constants';

const initialState = {
  allContent:null,
    viewType:null
};



const contentReducer = (state = initialState, action) => {
  switch (action.type) {
  // Logged In
  case GET_ALL_CONTENT: {
    return {
      ...state,
      allContent: [...state.allContent,...action.payload.allContent]
    }
  }
      case CHANGE_VIEW_TYPE : {
        return {
            ...state,
            viewType : action.payload.viewType
        }
      }
  // Default
  default: {
    return state;
  }
  }
};

// Exports
export default contentReducer;
