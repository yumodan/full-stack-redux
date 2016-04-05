import {List, Map} from 'immutable';

export function setEntries(state, entries) {
  return state.set('entries', List(entries));
}

export function next(state) {
  const entries = state.get('entries');
  //merge the current state Map with another iterable. 
  //in our case the second iterable is a simple js object
  return state.merge({
    vote: Map({pair: entries.take(2)}), //take the first two elements from an iterable
    entries: entries.skip(2) //exclude the first two elements from an iterable
  });
}

export function vote(state, entry) {
  return state.updateIn(['vote', 'tally', entry], 0, tally => tally + 1);
}