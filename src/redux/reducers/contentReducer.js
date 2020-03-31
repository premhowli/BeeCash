import {
    ADD_ITEM_TO_TRACKER,
    CHANGE_ALL_VALUES,
    CHANGE_DRAGGING,
    CHANGE_DRAGGING_INDEX, CHANGE_FOR_MOVE, CHANGE_VALUES,
    CHANGE_VIEW_TYPE, DELETE_CONTENT_FROM_TRACKER, DO_LOGIN,
    GET_ALL_CONTENT,
} from '../constants';

const initialState = {
  content:[

  ],
    viewType:null,
    dragging: false,
    draggingIdx: -1,
    leh:true,
    contentDataStore:null,
};



const contentReducer = (state = initialState, action) => {
  switch (action.type) {
  // Logged In
  case GET_ALL_CONTENT: {
    return {
      ...state,
      content: action.payload.content,
    }
  }
  break;
      case CHANGE_VIEW_TYPE : {
        return {
            ...state,
            viewType : action.payload.viewType
        }
      }
      break;
      case CHANGE_DRAGGING_INDEX : {
          return{
              ...state,
              draggingIdx : action.payload.draggingIdx,
          }

      }
      break;
      case CHANGE_DRAGGING : {
          return{
              ...state,
              dragging : action.payload.dragging,
          }

      }
          break;
      case CHANGE_VALUES : {
          return{
              ...state,
              dragging : action.payload.dragging,
              draggingIdx : action.payload.draggingIdx,
          }
      }
      break;
      case CHANGE_ALL_VALUES : {
          return{
              ...state,
              dragging : action.payload.dragging,
              draggingIdx : action.payload.draggingIdx,
              content : action.payload.content
          }

      }
      break;
      case CHANGE_FOR_MOVE : {
          return{
              ...state,
              draggingIdx: action.payload.draggingIdx,
              content: action.payload.content
          }
      }
      break;
      case "abc" : {
          console.log("<<<< vbn = "+JSON.stringify(state));
          return {
              ...state,
              content:action.payload.content,
              dragging:action.payload.dragging,
              draggingIdx:action.payload.draggingIdx

          }
      }
      break;
      case DELETE_CONTENT_FROM_TRACKER : {
          return{
              ...state,
              content:state.content.filter(item=>item.id!=action.payload.id)
          }
      }
      break;
      case ADD_ITEM_TO_TRACKER :{
          return{
              ...state,
              content:[
                  ...state.content,action.payload.item
              ]
          }
      }
      break;
      case DO_LOGIN : {

          return {
              ...state,
              currentLoggedInUser:action.payload.name
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
