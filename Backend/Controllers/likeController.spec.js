const mssql=require('mssql');

const { likePost, unlikePost, viewLikesofOne, toggleLike } = require('./likeController');

const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  describe("Tests for liking posts Controllers",()=>{
    describe("Test for liking a post",()=>{
    it("Should create add a like and return success message",async()=>{
const req={
    body:{
        UserID:"1",
        PostID:"1"
    }
}
jest.spyOn(mssql,"connect").mockResolvedValueOnce({
    request:jest.fn().mockReturnThis(),
    input:jest.fn().mockReturnThis(),
    execute:jest.fn().mockResolvedValueOnce({
        rowsAffected:1
    })
})
await likePost(req,res)

expect(res.status).toHaveBeenCalledWith(200)
expect(res.json).toHaveBeenCalledWith({message:"Post liked as success"}) 
    })
    it("Should not like a post if provided with empty body",async()=>{
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
        await likePost(req,res)
        
        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.json).toHaveBeenCalledWith({message:"Failed to like the post"})
    })
})
describe("Tests for unliking a post",()=>{
    it("Should unlike a post and return a success message",async()=>{
        const req={
            params:{
                LikeID:1
            }
        }
        jest.spyOn(mssql,"connect").mockResolvedValueOnce({
            request:jest.fn().mockReturnThis(),
            input:jest.fn().mockReturnThis(),
            execute:jest.fn().mockResolvedValueOnce({
                rowsAffected:1
            })
        })
        await unlikePost(req,res)
        
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({message:"Post unliked successfully"})
    })
    it("Should not unlike a post when not given an LikeID",async()=>{
        const req={
            params:{
                LikeID:''
            }
        }
        jest.spyOn(mssql,"connect").mockResolvedValueOnce({
            request:jest.fn().mockReturnThis(),
            input:jest.fn().mockReturnThis(),
            execute:jest.fn().mockResolvedValueOnce({
                rowsAffected:0
            })
        })
        await unlikePost(req,res)
        
        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.json).toHaveBeenCalledWith({message:"Failed to unlike post"})
    })
})
describe("Test for viewing posts a user has liked",()=>{
    it("Should show posts a user has liked",async()=>{
        const mockResult={
            "result": [
              [
                {
                  "VideoUrl": null,
                  "PostContent": "Supporting Arsenal is a not do thing",
                  "ImageUrl": null,
                  "UserID": 1
                }
              ]
            ]
          }
          const req={
            params:{
                UserID:1
            }
          }

          jest.spyOn(mssql,"connect").mockResolvedValueOnce({
            request:jest.fn().mockReturnThis(),
            input:jest.fn().mockReturnThis(),
            execute:jest.fn().mockResolvedValueOnce({
                result:mockResult
            })
          })
          
          await viewLikesofOne(req,res)

          expect(res.status).toHaveBeenCalledWith(200)
    })
    it("Should not show posts a user has liked when not given a UserID",async()=>{
        
          const req={
            params:{
 }
          }

          jest.spyOn(mssql,"connect").mockResolvedValueOnce({
            request:jest.fn().mockReturnThis(),
            input:jest.fn().mockReturnThis(),
            execute:jest.fn().mockResolvedValueOnce({ })
          })
          
          await viewLikesofOne(req,res)

          expect(res.status).toHaveBeenCalledWith(401)
          expect(res.json).toHaveBeenCalledWith({message:"failed to fetch the likes of this user"})
    })
})
describe("Tests for toggling liking and unlikiing a post using same route",()=>{
    it("Should check if a user has liked the post and unlike the post ,am using true for this case",async()=>{
        const req={
            body:{
                UserID:"1",
                PostID:"2"
            }
        }
        
        jest.spyOn(mssql,"connect").mockResolvedValueOnce({
            request:jest.fn().mockReturnThis,
            input:jest.fn().mockReturnThis(),
            execute:jest.fn().mockResolvedValueOnce({
                isLiked:true
            }),
            execute:jest.fn().mockResolvedValueOnce({
                rowsAffected:1
            })
        })
        await toggleLike(req,res)
        expect(res.status).toHaveBeenCalledWith(200) 
        expect(res.json).toHaveBeenCalledWith({message:"Post unliked successfully"})

       
    })
    it("should like the post and return success status code 200 and message",async()=>{
        const req={
            body:{
                UserID:"1",
                PostID:"2"
            }
        }
        
        jest.spyOn(mssql,"connect").mockResolvedValueOnce({
            request:jest.fn().mockReturnThis(),
            input:jest.fn().mockReturnThis(),
            execute:jest.fn().mockResolvedValueOnce({
                isLiked:false
            }),
            execute:jest.fn().mockResolvedValueOnce({ rowsAffected: [1] })
        })
        await toggleLike(req,res) 
        expect(res.status).toHaveBeenCalledWith(200)  
        expect(res.json).toHaveBeenCalledWith({message:"Post liked successfully"})
    })
})

  }) 