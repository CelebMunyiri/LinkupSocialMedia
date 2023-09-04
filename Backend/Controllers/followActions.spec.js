const mssql=require('mssql');
const { follow, Unfollow } = require('./followActions');


const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  describe("testing for followActions",()=>{
    it("Should enable following another user",async()=>{
        const req={
          body:{
            UserID:'1',
            FollowerUserID:'2'
          }
        }
        jest.spyOn(mssql,"connect").mockResolvedValueOnce({
          request:jest.fn().mockReturnThis(),
          input:jest.fn().mockReturnThis(),
          execute:jest.fn().mockResolvedValueOnce({
            rowsAffected:1,
          })
        })
        await follow(req,res)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({message:'User Followed succesfully'})
    }) 
    it("Should not allow following another user if the body is empty",async()=>{
      const req={
        body:{}
      }
      jest.spyOn(mssql,"connect").mockResolvedValueOnce({
        request:jest.fn().mockReturnThis(),
        input:jest.fn().mockReturnThis(),
        execute:jest.fn().mockResolvedValueOnce({
          rowsAffected:0,
        })
      })
      await follow(req,res)

      expect(res.status).toHaveBeenCalledWith(401)
      expect(res.json).toHaveBeenCalledWith({message:'Failed to follow'})
    })
    it("Should allow a user to unfollow another user",async()=>{
      const req={
        body:{
          UserID:'1',
          FollowerUserID:'2'
        }
      }
      jest.spyOn(mssql,"connect").mockResolvedValueOnce({
        request:jest.fn().mockReturnThis(),
        input:jest.fn().mockReturnThis(),
        execute:jest.fn().mockResolvedValueOnce({
          rowsAffected:1,
        })
      })
      await Unfollow(req,res) 

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith({message:'User Unfollowed succesfully'})
    })
    it("Should not allow unfollowing if no body is provided",async()=>{
      const req={
        body:{}
      }
      jest.spyOn(mssql,"connect").mockResolvedValueOnce({
        request:jest.fn().mockReturnThis(),
        input:jest.fn().mockReturnThis(),
        execute:jest.fn().mockResolvedValueOnce({
          rowsAffected:0,
        })
      })
      await Unfollow(req,res)

      expect(res.status).toHaveBeenCalledWith(401) 
      expect(res.json).toHaveBeenCalledWith({message:'Failed to Unfollow'})
    })
  })