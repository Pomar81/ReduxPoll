import {RECEIVE_USERS} from '../actions/users';
import {ADD_POLL} from '../actions/polls';
import {ADD_ANSWER} from '../actions/answers';


export default (state = {}, action) => {
  switch (action.type) {
  
  case RECEIVE_USERS:
    return {
      ...state,
      ...action.users,
    };
  
  case ADD_POLL: {
    const poll = action.poll;
    const {author, id} = poll;

    return {
      ...state,
      [author]: {
        ...state[author],
        polls: [...state[author].polls, id],
      }
    };
  }
  case ADD_ANSWER: {
    const {id, authedUser} = action;
    const user = state[authedUser];
    return {
      ...state,
      [authedUser]: {
        ...state[authedUser],
        answers: [...user.answers, id],
      }
    };
  }

  default: 
    return state;
  } 
};