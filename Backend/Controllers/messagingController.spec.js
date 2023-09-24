const mssql=require('mssql');
const { sendMessage, receiveMessage } = require('./messagingController');



const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  describe("Test for Messagging operations, sending and receiving of messages",()=>{
    it("Should send a message and store it in the database",async()=>{
        const req={
            body:{
                SenderID:"1",
                ReceiverID:"2",
                MessageContent:"I will come over tommorrow"
            }
        }

        jest.spyOn(mssql,"connect").mockResolvedValueOnce({
            request:jest.fn().mockReturnThis(),
            input:jest.fn().mockReturnThis(),
            execute:jest.fn().mockResolvedValueOnce({
                rowsAffected:1
            })
        })
        await sendMessage(req,res)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({ message: 'Message sent successfully' })
    })
    //test for getting messages between users
    it("should return messages between users",async()=>{
        const mockMessages=[
            {
              "MessageID": 5,
              "SenderID": 1,
              "ReceiverID": 2,
              "MessageContent": "Hello sir",
              "CreatedAt": "2023-09-10T00:00:00.000Z"
            },
            {
              "MessageID": 6,
              "SenderID": 1,
              "ReceiverID": 2,
              "MessageContent": "Hello sir",
              "CreatedAt": "2023-09-10T00:00:00.000Z"
            },
            {
              "MessageID": 7,
              "SenderID": 1,
              "ReceiverID": 2,
              "MessageContent": "Yes sir, what are you saying",
              "CreatedAt": "2023-09-10T00:00:00.000Z"
            },
            {
              "MessageID": 1005,
              "SenderID": 1,
              "ReceiverID": 2,
              "MessageContent": "will you code today",
              "CreatedAt": "2023-09-11T00:00:00.000Z"
            },
            {
              "MessageID": 1006,
              "SenderID": 2,
              "ReceiverID": 1,
              "MessageContent": "Hello Bro",
              "CreatedAt": "2023-09-11T00:00:00.000Z"
            },
            {
              "MessageID": 2005,
              "SenderID": 2,
              "ReceiverID": 1,
              "MessageContent": "wagwan",
              "CreatedAt": "2023-09-12T00:00:00.000Z"
            }
          ]
          
        const req={
            body:{
                User1ID:"2",
                User2ID:"1"
            }
        }
        jest.spyOn(mssql,"connect").mockResolvedValueOnce({
            request:jest.fn().mockReturnThis(),
            input:jest.fn().mockReturnThis(),
            execute:jest.fn().mockResolvedValueOnce({
                result:mockMessages
            })
            
        })

        await receiveMessage(req,res)
expect(res.status).toHaveBeenCalledWith(200)

    })
  })