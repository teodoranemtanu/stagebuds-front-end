import io from 'socket.io-client';

const nsSocket = io(`http://localhost:5000/notifications`);
export default nsSocket;