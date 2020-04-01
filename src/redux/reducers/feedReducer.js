import {
    CHANGE_ALL_VALUES,
    CHANGE_DRAGGING,
    CHANGE_DRAGGING_INDEX, CHANGE_FOR_MOVE, CHANGE_VALUES,
    CHANGE_VIEW_TYPE, FETCH_EVENT_DETAILS,
    GET_ALL_CONTENT, GET_ALL_EVENT,
} from '../constants';

const initialState = {
    allEvent:[

        {
            "id": 2,
            "name": "Metallica Concert",
            "location" : "Palace Grounds",
            isPaid:true,
            price:"2345",
            color: "#e3a256",
            "imageUrl": "https://images.unsplash.com/photo-1558981001-5864b3250a69?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
        },
        {
            "id": 3,
            "name": "Saree Exhibition",
            "location" : "Malleswaram Grounds",
            isPaid:false,
            price:null,
            "imageUrl": "https://images.unsplash.com/photo-1585487000216-500fa602c1ca?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"
        },
        {
            "id": 4,
            "name": "Wine tasting",
            "location" : "Links Brewery",
            isPaid:true,
            price:"1200",
            "imageUrl": "https://images.unsplash.com/photo-1585504256881-6c673bf5c298?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=957&q=80"
        },
        {
            "id": 5,
            "name": "Startups Meet",
            "location" : "Kanteerava Indoor",
            isPaid:true,
            price:"2199",
            "imageUrl": "https://images.unsplash.com/photo-1585550135891-7c2a08e3655c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80"
        },
        {
            "id": 6,
            "name": "Summer Noon Party",
            "location" : "Kumara Park",
            isPaid:true,
            price:"3200",
            "imageUrl": "https://images.unsplash.com/photo-1585511479991-1e45e025db0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"
        },
        {
            "id": 7,
            "name": "Rock and Roll nights",
            "location" : "Sarjapur Road",
            isPaid:true,
            price:"800",
            "imageUrl": "https://images.unsplash.com/photo-1585513428101-556b579cade8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"
        },
        {
            "id": 8,
            "name": "Barbecue Fridays",
            "location" : "Whitefield",
            isPaid:true,
            price:"999",
            "imageUrl": "https://images.unsplash.com/photo-1585528061625-8b7bb0c543de?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"
        },
        {
            "id": 9,
            "name": "Summer workshop",
            "location" : "Indiranagar",
            isPaid:false,
            price:"1299",
            "imageUrl": "https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
        },
        {
            "id": 10,
            "name": "Impressions & Expressions",
            "location" : "MG Road",
            isPaid:false,
            price:"1200",
            "imageUrl": "https://images.unsplash.com/photo-1585419062137-acaf0c8aeb13?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"
        },
        {
            "id": 11,
            "name": "Italian carnival",
            "location" : "Electronic City",
            isPaid:false,
            price:"1200",
            "imageUrl": "https://images.unsplash.com/photo-1585520523655-ccd7931e09e3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
        }


    ],
    viewType:'list',
    eventDetails:null,
};



const feedReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_ALL_EVENT: {
            return {
                ...state,
                allEvent:action.payload.allEvent,
            }
        }
        break;
        case FETCH_EVENT_DETAILS : {
            return {
                ...state,
                eventDetails:state.allEvent.filter(item=>item.id===action.payload.id)
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
export default feedReducer;
