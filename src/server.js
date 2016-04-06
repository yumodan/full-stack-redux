import Server from 'socket.io';

export function startServer(store) {
  const io = new Server().attach(3000);

  store.subscribe( //redux method on redux store- it gets called any time an action is dispached
    () => io.emit('state', store.getState().toJS())
  );

  io.on('connection', (socket) => {
    socket.emit('state', store.getState().toJS());
    socket.on('action', store.dispatch.bind(store));
  });
}