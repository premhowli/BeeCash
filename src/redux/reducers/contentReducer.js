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
    contentDataStore:{},
    currentLoggedInUser: null,
};



const contentReducer = (state = initialState, action) => {
  switch (action.type) {
  // Logged In
  case GET_ALL_CONTENT: {
    return {
      ...state,
        contentDataStore:{
            ...state.contentDataStore,[state.currentLoggedInUser]:action.payload.content
        },
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
              contentDataStore:{
                  ...state.contentDataStore,[state.currentLoggedInUser]:action.payload.content
              },
              content : action.payload.content
          }

      }
      break;
      case CHANGE_FOR_MOVE : {
          return{
              ...state,
              draggingIdx: action.payload.draggingIdx,
              contentDataStore:{
                  ...state.contentDataStore,[state.currentLoggedInUser]:action.payload.content
              },
              content: action.payload.content
          }
      }
      break;
      case "abc" : {
          console.log("<<<< vbn = "+JSON.stringify(state));
          return {
              ...state,
              contentDataStore:{
                  ...state.contentDataStore,[state.currentLoggedInUser]:action.payload.content
              },
              content:action.payload.content,
              dragging:action.payload.dragging,
              draggingIdx:action.payload.draggingIdx

          }
      }
      break;
      case DELETE_CONTENT_FROM_TRACKER : {
          return{
              ...state,
              contentDataStore:{
                  ...state.contentDataStore,[state.currentLoggedInUser]:state.contentDataStore[state.currentLoggedInUser].filter(item=>item.id!=action.payload.id)
              },
              content:state.content.filter(item=>item.id!=action.payload.id)
          }
      }
      break;
      case ADD_ITEM_TO_TRACKER :{
          let item = action.payload.item;
          if(state.contentDataStore[state.currentLoggedInUser]

              && state.contentDataStore[state.currentLoggedInUser].filter(data=>{
              return(data.id===item.id)
          }).length === 0){
             return{
                 ...state,
                 contentDataStore:{
                     ...state.contentDataStore,
                     [state.currentLoggedInUser]:[
                         ...state.contentDataStore[state.currentLoggedInUser],
                         item
                     ]
                 }
             }
          }
          else{
              return state;
          }
          // else{
          //
          // }
          // return{
          //     ...state,
          //
          //     content:[
          //         ...state.content,action.payload.item
          //     ]
          // }
      }
      break;
      case DO_LOGIN : {
          let key  = action.payload.name;
          if(! (state.contentDataStore && state.contentDataStore.hasOwnProperty(action.payload.name))){
              return{
                  ...state,
                  currentLoggedInUser:action.payload.name,
                  contentDataStore:{
                      ...state.contentDataStore,[action.payload.name]:[]

                  }
              }
          }
          else{
              return {
                  ...state,
                  currentLoggedInUser:action.payload.name,

              }
          }

      }
      break;

  // Default
  default: {
    return state;
  }
  }
};

// Exports
export default contentReducer;
