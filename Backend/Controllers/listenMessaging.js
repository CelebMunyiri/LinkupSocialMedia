const io = require('socket.io')(4600)

const users = {}
const typingUsers = {}; 
app.use(bodyParser.json());


// WebSocket for messaging
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('joinRoom', (room) => {
    socket.join(room);
  });

  socket.on('typing', ({ senderID, receiverID }) => {
    io.to(`room:${senderID}-${receiverID}`).emit('isTyping', senderID);
  });

  // Handle messaging events
  socket.on('send-chat-message', ({ senderID, receiverID, message }) => {
    // Save the message to the database and broadcast to the room
  });

  // Disconnect event
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});


