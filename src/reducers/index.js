import authedUser from './authedUser';
import users from './users';
import polls from './polls';
import {combineReducers} from 'redux';
import {loadingBarReducer as loadingBar} from 'react-redux-loading-bar';

export default combineReducers({authedUser, users, polls, loadingBar});