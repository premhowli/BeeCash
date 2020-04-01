import httpHandler from './../httpHandler';
import {
    ADD_ITEM_TO_TRACKER,
    API_DUMMY,
    CHANGE_ALL_CONTENT,
    CHANGE_ALL_VALUES,
    CHANGE_DRAGGING,
    CHANGE_DRAGGING_INDEX, CHANGE_FOR_MOVE,
    CHANGE_VALUES,
    CHANGE_VIEW_TYPE, DELETE_CONTENT_FROM_TRACKER, DO_LOGIN,
    GET_ALL_CONTENT,
} from '../constants';

const customData = require('../../content');


//
// export const getAllContent = (page,dispatch) => {
//   httpHandler.get(API_DUMMY)
//     .then((response) => {
//         console.log("DP response = "+JSON.stringify(response.data));
//       dispatch({
//         type: GET_ALL_CONTENT,
//         payload: {
//           "allContent": response.data.slice((page-1)*50,((page-1)*50)+50)
//         }
//       })
//     })
// };

export const changeAllContent = (arr,dispatch) => {
    dispatch(
        {
            type : CHANGE_ALL_CONTENT,
            payload : {
                "content" : arr,
            }

        }
    )
};

export const getAllContent = (page,dispatch) => {
    dispatch({
        type: GET_ALL_CONTENT,
        payload: {
            "allContent": [

                {"id":2,"name":"chal",color:"#e3a256","imageUrl":"https://images.unsplash.com/photo-1558981001-5864b3250a69?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"},
                {"id":3,"name":"zxde",color:"#a3c216","imageUrl":"https://images.unsplash.com/photo-1585487000216-500fa602c1ca?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"},
                {"id":4,"name":"tal",color:"#b31256","imageUrl":"https://images.unsplash.com/photo-1585504256881-6c673bf5c298?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=957&q=80"},
                {"id":5,"name":"bvbfhal",color:"#c302f6","imageUrl":"https://images.unsplash.com/photo-1585550135891-7c2a08e3655c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80"},
                {"id":6,"name":"lao",color:"#03a256","imageUrl":"https://images.unsplash.com/photo-1585511479991-1e45e025db0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"},
                {"id":7,"name":"fyht",color:"#b3b2b6","imageUrl":"https://images.unsplash.com/photo-1585513428101-556b579cade8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"},
                {"id":8,"name":"ke re",color:"#afa256","imageUrl":"https://images.unsplash.com/photo-1585528061625-8b7bb0c543de?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"},
                {"id":9,"name":"vgyu",color:"#a3b25f","imageUrl":"https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"},
                {"id":10,"name":"bhai",color:"#e0e216","imageUrl":"https://images.unsplash.com/photo-1585419062137-acaf0c8aeb13?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"},
                {"id":11,"name":"nvbg",color:"#f3a0ff","imageUrl":"https://images.unsplash.com/photo-1585520523655-ccd7931e09e3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"}



            ],
            dragging:false
        }
    })
};


export const getCon = (dispatch) =>{
    dispatch(
        {
            type:'abc',
            payload: {

                content: [

                ],
                dragging: false,
                draggingIdx: -1,
            }
        }
    )
};

export const changeViewType = (type,dispatch) => {
    dispatch(
        {
            type : CHANGE_VIEW_TYPE,
            payload : {
                "viewType" : type
            }
        }
    )
}

export const changeDraggingIdx = (type,dispatch) => {
    dispatch(
        {
            type : CHANGE_DRAGGING_INDEX,
            payload : {
                "draggingIdx" : type
            }
        }
    )
}

export const changeDragging = (type,dispatch) => {
    dispatch(
        {
            type : CHANGE_DRAGGING,
            payload : {
                "dragging" : type
            }
        }
    )
}

export const changeValues = (val1,val2,dispatch) => {
    dispatch(
        {
            type : CHANGE_VALUES,
            payload : {
                "dragging" : val1,
                "draggingIdx" : val2,
            }
        }
    )
}

export const changeAllValues = (dragging,draggingIdx,content,dispatch) => {
    dispatch(
        {
            type : CHANGE_ALL_VALUES,
            payload : {
                "dragging" : dragging,
                "draggingIdx" : draggingIdx,
                "content" : content
            }
        }
    )
}


export const changeForMove = (draggingIdx,content,dispatch) => {
    dispatch(
        {
            type : CHANGE_FOR_MOVE,
            payload : {
                "draggingIdx" : draggingIdx,
                "content" : content
            }
        }
    )
}

export const deleteItemFromTracker = (id,dispatch) => {
    dispatch(
        {
            type : DELETE_CONTENT_FROM_TRACKER,
            payload : {
                "id" : id
            }
        }
    )
}

export const addItemToTracker = (item,dispatch) => {
    dispatch(
        {
            type : ADD_ITEM_TO_TRACKER,
            payload : {
                "item" : item
            }
        }
    )
}

export const doLogin = (name,dispatch) => {
    dispatch(
        {
            type : DO_LOGIN,
            payload:{
                "name" : name
            }
        }
    )
}



