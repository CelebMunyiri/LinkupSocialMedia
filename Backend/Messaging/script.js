// script.js

const messageContainer = document.querySelector('.message-container');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

// Function to display messages in the message container
function displayMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageContainer.appendChild(messageElement);
}

// Function to send a message to the backend
function sendMessage() {
    const message = messageInput.value;
    const senderID = 1; // Replace with the actual sender's ID
    const receiverID = 2; // Replace with the actual receiver's ID

    // Create a message object to send to the server
    const messageData = {
        senderID,
        receiverID,
        messageText: message,
    };

    // Send a POST request to the server
    fetch('/api/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageData),
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response, e.g., show a success message
        console.log(data.message);
        messageInput.value = ''; // Clear the input field after sending
    })
    .catch(error => {
        console.error('Error sending message:', error);
    });
}

// Function to fetch and display messages
function fetchMessages() {
    const userID = 1; // Replace with the actual user's ID
    const otherUserID = 2; // Replace with the ID of the other user

    // Send a GET request to the server to fetch messages
    fetch(`/api/messages/${userID}/${otherUserID}`)
    .then(response => response.json())
    .then(messages => {
        // Display the received messages
        messageContainer.innerHTML = '';
        messages.forEach(message => {
            displayMessage(message.messageText);
        });
    })
    .catch(error => {
        console.error('Error fetching messages:', error);
    });
}

// Add an event listener for the send button
sendButton.addEventListener('click', sendMessage);

// Fetch and display messages when the page loads
fetchMessages();
