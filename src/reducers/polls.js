import {
  RECEIVE_POLLS,
  ADD_POLL,                    
} from '../actions/polls';

import {
  ADD_ANSWER,
} from '../actions/answers';


export default (state = {}, action) => {
  switch (action.type) {
  case RECEIVE_POLLS:
    return {
      ...state,
      ...action.polls,
    };
  case ADD_POLL:
    return {
      ...state,
      [action.poll.id]: action.poll,
    };
  case ADD_ANSWER: {
    const {answer, id, authedUser} = action;
    const  poll = state[id];
    return {
      ...state,
      [id]: {
        ...poll,
        [answer + 'Votes']: [...poll[answer + 'Votes'], authedUser],
      } 
    };
  }
  default: 
    return state;
  } 
};