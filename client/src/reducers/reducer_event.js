import * as types from '../actions/actionTypes';

function event(state={}, action) {
  switch (action.type){

    case types.FIND_EVENT:
      return action.payload || state;
    case types.START_VOTING:
      return {...state, isVoting: true};
    case types.END_VOTING:
      return {...state, voteCompleted: true, choice: [...state, action.payload]};
    default:
      return state;
  }
}

export default event;