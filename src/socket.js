let socket = null;

export const open = async (url, options) => {
  // Dynamically import socket.io
  const io = await import('socket.io-client');

  return new Promise(((resolve, reject) => {
    socket = io.connect(url, options);

    socket.once('connect', () => {
      resolve(socket);
    });

    // TODO: do I need all these events?
    socket.once('connect_error', () => {
      reject(new Error('connect_error'));
    });

    socket.once('connect_timeout', () => {
      reject(new Error('connect_timeout'));
    });
  }));
};

export const close = () => {
  socket.close();
  socket = null;
};

export const emit = ({ eventName, data }) => {
  socket.emit(eventName, data);
};

export const on = ({ eventName, handler }) => {
  socket.on(eventName, handler);
};

export const waitForEvent = (eventName) => new Promise((resolve, reject) => {
  socket.once(eventName, (resolve));
  socket.once('disconnect', reject);
});

export const isConnected = () => socket?.connected;

export const getId = () => socket?.id;
