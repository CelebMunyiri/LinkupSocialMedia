const mssql=require('mssql');
const { createPost, deletePost } = require('./postController');

const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  describe("Tests for post Controllers",()=>{
    describe("Test for creating post",()=>{
    it("Should create a post and return success message",async()=>{
const req={
    body:{
        UserID:"1",
        PostContent:"I like swimming",
        VideoUrl:"https://video.mp4",
        ImageUrl:"https://image.jpg"
    }
}
jest.spyOn(mssql,"connect").mockResolvedValueOnce({
    request:jest.fn().mockReturnThis(),
    input:jest.fn().mockReturnThis(),
    execute:jest.fn().mockResolvedValueOnce({
        rowsAffected:1
    })
})
await createPost(req,res)

expect(res.status).toHaveBeenCalledWith(200)
expect(res.json).toHaveBeenCalledWith({message:"Post Created Successfully"}) 
    })
    it("Should not create a post if provided with empty body",async()=>{
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
        await createPost(req,res)
        
        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.json).toHaveBeenCalledWith({message:"Failed to create post"})
    })
})
    describe("Test for deleting user post",()=>{
it("Should delete a post when provide with the post ID",async()=>{
    const req={
        params:{
            PostID:1
         }
    }
    jest.spyOn(mssql,"connect").mockResolvedValueOnce({
        request:jest.fn().mockReturnThis(),
        input:jest.fn().mockReturnThis(),
        execute:jest.fn().mockResolvedValueOnce({
            rowsAffected:1
        })
    })
    await deletePost(req,res)
    
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({message:"Post Deleted successfully"})
})
it("Should not delete a post when not provide with the Post ID",async()=>{
    const req={
        params:{ }
    }
    jest.spyOn(mssql,"connect").mockResolvedValueOnce({
        request:jest.fn().mockReturnThis(),
        input:jest.fn().mockReturnThis(),
        execute:jest.fn().mockResolvedValueOnce({
            rowsAffected:0
        })
    })
    await deletePost(req,res)
    
    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({message:"Failed deleting Post"})
})
    })
})