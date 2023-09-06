const mssql=require('mssql');
const { createPost, deletePost, viewAllPosts } = require('./postController');
const { likePost, unlikePost } = require('./likeController');

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
  })