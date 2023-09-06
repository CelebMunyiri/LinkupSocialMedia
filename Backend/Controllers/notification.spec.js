const mssql=require('mssql');
const { sendNotification, getNotification } = require('./notificationsController');



const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  describe("Tests for notifications controller",()=>{
    describe("test fro sending a notification",()=>{
        it("Should Send a notification",async()=>{
            const req={
                body:{
                    UserID:"1",
                    SenderID:"2",
                    NotificationText:"Mahubali liked your message"
                }
            }
            jest.spyOn(mssql,"connect").mockResolvedValueOnce({
                request:jest.fn().mockReturnThis(),
                input:jest.fn().mockReturnThis(),
                execute:jest.fn().mockResolvedValueOnce({
                    rowsAffected:1
                })
            })
            await sendNotification(req,res) 

            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith({message:"Notification Sent succesfully"})
        })
        it("Should not Send a notification on rececibibg an empty body",async()=>{
            const req={
                body:{ }
            }
            jest.spyOn(mssql,"connect").mockResolvedValueOnce({
                request:jest.fn().mockReturnThis(),
                input:jest.fn().mockReturnThis(),
                execute:jest.fn().mockResolvedValueOnce({
                    rowsAffected:0
                })
            })
            await sendNotification(req,res) 

            expect(res.status).toHaveBeenCalledWith(401)
            expect(res.json).toHaveBeenCalledWith({message:"Failed sending Notification"})
        })
    })
    describe("Tests for getting notifications",()=>{
        it(" Should fetch all notifications for a user using his UserID",async()=>{
           
            const req={  
                params:{
                    UserID:"1"
                 }
        }
           const mockResult={
            "result": [
              [
                {
                  "NotificationID": 1,
                  "UserID": 1,
                  "SenderID": 2,
                  "NotificationText": "Munyiri started following you",
                  "IsRead": false,
                  "CreatedAt": "2023-09-06T14:24:12.210Z"
                }
              ]
            ]
          }
          
           
            jest.spyOn(mssql,"connect").mockResolvedValueOnce({
                request:jest.fn().mockReturnThis(), 
                input:jest.fn().mockReturnThis(),
                execute:jest.fn().mockResolvedValueOnce({
                    result:mockResult })
            })
            await getNotification(req,res) 

            expect(res.status).toHaveBeenCalledWith(200)
           
        })

        it(" Should not fetch any notifications for a user provided with no or wrong UserID",async()=>{
           
             const req={
                params:{}
             }
             jest.spyOn(mssql,"connect").mockResolvedValueOnce({
                 request:jest.fn().mockReturnThis(),
                 input:jest.fn().mockReturnThis(),
                 execute:jest.fn().mockResolvedValueOnce({ })
             })
             await getNotification(req,res)  
 
             expect(res.status).toHaveBeenCalledWith(401)
             expect(res.json).toHaveBeenCalledWith({message:"Failed to fetch your notifications"})
         })
    })
  })