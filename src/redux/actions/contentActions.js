import httpHandler from './../httpHandler';
import {
    API_DUMMY, CHANGE_VIEW_TYPE,
    GET_ALL_CONTENT,
} from '../constants';

const customData = require('../../content');



export const getAllContent = (page,dispatch) => {
  httpHandler.get(API_DUMMY)
    .then((response) => {
        console.log("DP response = "+JSON.stringify(response.data));
      dispatch({
        type: GET_ALL_CONTENT,
        payload: {
          "allContent": response.data.slice((page-1)*50,((page-1)*50)+50)
        }
      })
    })
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



