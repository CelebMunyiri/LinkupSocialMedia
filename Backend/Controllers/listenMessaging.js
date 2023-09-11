// Import the Socket.io client library
import io from 'socket.io-client';

// Create a Socket.io client instance and connect to the server
const socket = io('http://localhost:4600'); // Replace with your server's URL

// Emit the 'joinRoom' event to join a specific chat room (replace 'roomID' with the actual room identifier)
socket.emit('joinRoom', 'room:2-1');

// Listen for the 'isTyping' event from the server
socket.on('isTyping', (senderID) => {
    console.log(`User with ID ${senderID} is typing...`);
    // You can update the UI to display a typing indicator or handle it as needed.
});

// Use httpClient to send messages and interact with your server's endpoints
// ...

// When you want to notify that the user is typing, emit a 'typing' event to the server
function notifyTyping() {
    socket.emit('typing', { senderID: 2, receiverID: 1 });
    // Replace 'myUserID' and 'otherUserID' with the actual user IDs
}

// Call the notifyTyping function when the user starts typing in your UI
// ...
notifyTyping()