import {
  GET_ALL_CONTENT
} from '../constants';

const initialState = {
  allContent:null
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
  // Default
  default: {
    return state;
  }
  }
};

// Exports
export default contentReducer;
