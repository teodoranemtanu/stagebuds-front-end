import io from 'socket.io-client';

export const nsConnection = (endpoint) => {
    const nsSocket = io(`http://localhost:5000${endpoint}`);
    return nsSocket;
};
