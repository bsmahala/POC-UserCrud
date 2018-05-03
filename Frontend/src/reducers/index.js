import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { loginData } from './loginReducer';
import { users } from './userReducer';
// combine all reducer
const rootReducer = combineReducers({
    form: formReducer,
    loginData,
    users
  });

export default rootReducer;