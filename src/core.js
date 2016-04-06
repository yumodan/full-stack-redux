import {List, Map} from 'immutable';

function winners(vote) {
  // input: map with key of pair and key of tally
  // output: array with the winning movie
  if(!vote) return [];
  const [a, b] = vote.get('pair');
  const aVotes = vote.getIn(['tally', a], 0);
  const bVotes = vote.getIn(['tally', b], 0);

  if(aVotes < bVotes)       return [b];
  else if (aVotes > bVotes) return [a];
  else                      return [a, b];
}

export function setEntries(state, entries) {
  return state.set('entries', List(entries));
}

export function next(state) {
  const entries = state.get('entries').concat(winners(state.get('vote')));
  //merge the current state Map with another iterable. 
  //in our case the second iterable is a simple js object
  if(entries.size === 1) {
    return state.remove('vote')
                .remove('entries')
                .set('winner', entries.first());
  }else {
    return state.merge({
      vote: Map({pair: entries.take(2)}), //take the first two elements from an iterable
      entries: entries.skip(2) //exclude the first two elements from an iterable
    });    
  }
}

export function vote(voteState, entry) {
  return voteState.updateIn(['tally', entry], 0, tally => tally + 1);
}

export const INITIAL_STATE = Map();