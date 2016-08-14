import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import participantsReducer from './dummy_reducer_participants';
import nomineesReducer from './dummy_reducer_nominees';
import suggestionsReducer from './dummy_reducer_suggestions';
import activeUserReducer from './dummy_reducer_activeUser';
import chatReducer from './reducer_chat';
import userEventsReducer from './reducer_userEvents';
import authReducer from './reducer_auth';
import voteStatus from './reducer_eventVoteStatus';
import userInfo from './reducer_userInfo';

// Combine results from indiviual reducers into a single rooteReducer to be used in the store
const rootReducer = combineReducers({
  activeUser: activeUserReducer,
  participants: participantsReducer,
  nominees: nomineesReducer,
  suggestions: suggestionsReducer,
  routing: routerReducer,
  chat: chatReducer,
  userEvents: userEventsReducer,
  voteStatus: voteStatus,
  auth: authReducer,
  userInfo: userInfo
});

export default rootReducer;
