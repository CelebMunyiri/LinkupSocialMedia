const io = require('socket.io')(3000)

const users = {}
const typingUsers = {}; 

io.on('connection', socket => {
  socket.on('new-user', name => {
    users[socket.id] = name
    socket.broadcast.emit('user-connected', name)
  })
  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
  })
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
   // Handle typing event
   socket.on('typing', () => {
    typingUsers[socket.id] = users[socket.id];
    socket.broadcast.emit('user-typing', users[socket.id]);
  });

  // Handle stop typing event
  socket.on('stop-typing', () => {
    delete typingUsers[socket.id];
    socket.broadcast.emit('user-stop-typing', users[socket.id]);
  });

  socket.on('disconnect', () => {
    const disconnectedUser = users[socket.id];
    socket.broadcast.emit('user-disconnected', disconnectedUser);
    delete users[socket.id];
    delete typingUsers[socket.id];
  });
  


 
})


