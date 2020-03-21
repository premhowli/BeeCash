// Imports: Dependencies
import { combineReducers } from 'redux';

// Imports: Reducers

import contentReducer from './contentReducer';


// Redux: Root Reducer
const rootReducer = combineReducers({
  contentReducer: contentReducer,
});

// Exports
export default rootReducer;
