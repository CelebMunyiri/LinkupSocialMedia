
const express = require('express');
const http = require('http');
const socketIO = require('socket.io')
const mssql = require('mssql');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);



// Middleware
app.use(bodyParser.json());


const { sqlConfig } = require('../Config/config')


// API endpoint to send a message
const sendMessage= async(req, res) => {
    try {
        const { SenderID, ReceiverID, MessageContent } = req.body;
        const pool = await mssql.connect(sqlConfig)
        await pool.request()
            .input('SenderID', mssql.Int, SenderID)
            .input('ReceiverID', mssql.Int, ReceiverID)
            .input('MessageContent', mssql.NVarChar, MessageContent)
            .execute('SendMessage');
    

        
       return res.status(200).json({ message: 'Message sent successfully' });
    } catch (error) {
        
       return res.status(500).json({ error: 'An error occurred while sending the message' });
    }
}

// Socket.io real-time communication
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('joinRoom', (room) => {
        socket.join(room);
    });

    //sending a message

    socket.on('chatMessage',async(message,senderID,ReceiverID)=>{
        socket.emit(message);

        const pool = await mssql.connect(sqlConfig)
        await pool.request()
            .input('SenderID', mssql.Int, senderID)
            .input('ReceiverID', mssql.Int, ReceiverID)
            .input('MessageContent', mssql.NVarChar, MessageContent)
            .execute('SendMessage');
    })

    socket.on('typing', ({ senderID, receiverID }) => {
        io.to(`room:${senderID}-${receiverID}`).emit('isTyping', senderID);
    });

    
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

const receiveMessage=async (req, res) => {
    try {
        const { user1ID, user2ID } = req.params;
        const pool = await mssql.connect(sqlConfig);
        const result = await pool.request()
            .input('User1ID', mssql.Int, user1ID)
            .input('User2ID', mssql.Int, user2ID)
            .execute('GetMessagesBetweenUsers');
        mssql.close();
        const messages = result.recordset;
        res.status(200).json(messages);
    } catch (error) {
    
       return res.status(500).json({ error:'An error occurred while retrieving messages'});
    }
}

module.exports={
    sendMessage,receiveMessage
}