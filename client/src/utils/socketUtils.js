import io from 'socket.io-client';

import { connectSuccess, connectError, alert } from '../actions/alerts';

let socket = null;

export default function connectToAlerts (store) {
  if(!socket) {
    socket = io();  
    socket.on('connect', () => {
      store.dispatch(connectSuccess());
    }); 
    
    socket.on('connect_error', () => {
      socket.disconnect();
      store.dispatch(connectError());
      socket = null;  // set to null
    }); 

    socket.on('alert', (payload) => {
      store.dispatch(alert(payload));
    });
  }
}
