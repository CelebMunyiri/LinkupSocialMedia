const mssql=require('mssql');



const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  describe("Test for Messagging operations, sending and receiving of messages",()=>{
    it("Should send a message and store it in the database",()=>{
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
    })
  })