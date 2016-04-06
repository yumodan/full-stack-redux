import makeStore from './src/store';
import {startServer} from './src/server'

export const store = makeStore();
startServer(store);

store.dispatch({  //set initial entries to dummy data in entries.json
  type:'SET_ENTRIES',
  entries: require('./entries.json')
});
store.dispatch({type: 'NEXT'});