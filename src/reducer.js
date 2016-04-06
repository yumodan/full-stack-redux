import {setEntries, next, vote, INITIAL_STATE} from './core';

const SET_ENTRIES = 'SET_ENTRIES';
const VOTE = 'VOTE';
const NEXT = 'NEXT';

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type){
  case VOTE:
    return state.update('vote', voteState => vote(voteState, action.entry)); //use the immutable update function here
  case NEXT:
    return next(state);
  case SET_ENTRIES:
    return setEntries(state, action.entries); 
  }
  return state;
}