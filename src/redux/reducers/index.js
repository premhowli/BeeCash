// Imports: Dependencies
import { combineReducers } from 'redux';

// Imports: Reducers

import contentReducer from './contentReducer';
import feedReducer from './feedReducer';


// Redux: Root Reducer
const rootReducer = combineReducers({
  contentReducer: contentReducer,
    feedReducer : feedReducer,

});

// Exports
export default rootReducer;
