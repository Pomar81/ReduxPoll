import {getInitialData} from '../utils/api';
import {receiveUsers} from '../actions/users';
import {receivePolls} from '../actions/polls';
import {setAuthedUser} from '../actions/authedUser';
import {showLoading, hideLoading} from 'react-redux-loading-bar';

const AUTHED_ID = 'tylermcginnis';

export const handleInitialData = () => (dispatch) => {
  dispatch(showLoading());
  return getInitialData()
    .then(({users, polls}) =>{
      dispatch(receiveUsers(users));
      dispatch(receivePolls(polls));
      dispatch(setAuthedUser(AUTHED_ID));
      dispatch(hideLoading());
    }); 
}; 