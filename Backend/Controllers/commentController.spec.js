const mssql=require('mssql');
const { createComment, deleteComment, displayAllComments, updateComment } = require('./commentController');


const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  describe("Tests for Comments Controllers",()=>{
    describe("Test for creating Comments on post",()=>{
    it("Should create a Comment and return success message",async()=>{
const req={
    body:{
        UserID:"1",
        PostID:"1",
        CommentText:"I like eating Ugali" 
    }
}
jest.spyOn(mssql,"connect").mockResolvedValueOnce({
    request:jest.fn().mockReturnThis(),
    input:jest.fn().mockReturnThis(),
    execute:jest.fn().mockResolvedValueOnce({
        rowsAffected:1
    })
})
await createComment(req,res)

expect(res.status).toHaveBeenCalledWith(200)
expect(res.json).toHaveBeenCalledWith({message:"Comment Added Successfully"}) 
    })
    it("Should not create a Comment if provided with empty body",async()=>{
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
        await createComment(req,res)
        
        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.json).toHaveBeenCalledWith({message:"Failed Adding Comment"}) 
    })
})
    describe("Test for deleting a Comment on user post",()=>{
it("Should delete a Comment when provide with the comment ID",async()=>{
    const req={
        params:{
            CommentID:1
         }
    }
    jest.spyOn(mssql,"connect").mockResolvedValueOnce({
        request:jest.fn().mockReturnThis(),
        input:jest.fn().mockReturnThis(),
        execute:jest.fn().mockResolvedValueOnce({
            rowsAffected:1
        })
    })
    await deleteComment(req,res)
    
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({message:"Comment deleted succesfully"})
})
it("Should not delete a comment when not provided with the CommentID",async()=>{
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
    await deleteComment(req,res)
    
    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({message:"Error deleting Comment"})
})
    })
    describe("Test for displaying all commnts related to a post",()=>{
        it("Should display all Comments in the database related to a post",async()=>{
            const mockResult={
                "results": [
                  [
                    {
                      "CommentID": 4,
                      "UserID": 2,
                      "PostID": 2,
                      "CommentText": "Poor Club thta is a club that need support",
                      "CreatedAt": "2023-09-05T00:00:00.000Z"
                    }
                  ]
                ]
              }
              
              const req={
                body:{}
              }
              jest.spyOn(mssql,"connect").mockResolvedValueOnce({
                execute:jest.fn().mockResolvedValueOnce({ 
                    result:mockResult })
              })
              await displayAllComments(req,res)
              expect(res.status).toHaveBeenCalledWith(200) 
        })
        it("Should not display any Comment",async()=>{
            const req={
                body:{}
            }
            jest.spyOn(mssql,"connect").mockResolvedValueOnce({
                request:jest.fn().mockReturnThis(),
                execute:jest.fn().mockResolvedValueOnce({
                    result:''
                })
            })
            await displayAllComments(req,res)  
            expect(res.status).toHaveBeenCalledWith(401)
            expect(res.json).toHaveBeenCalledWith({message:"Failed to load comments"})
        })
    })
    describe("Tests fro updating a Comment",()=>{
        it("Should update the text of a comment when using its CommentID and the comment body", async()=>{
            const req={
                body:{
                    CommentText:"Man is is as Useless as the name suggests"
                },
params:{
    CommentID:2
}
            }
            jest.spyOn(mssql,"connect").mockResolvedValueOnce({
                request:jest.fn().mockReturnThis(),
                input:jest.fn().mockReturnThis(),
                execute:jest.fn().mockResolvedValueOnce({
                    rowsAffected:1
                })
            })
            await updateComment(req,res)
            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith({message:"Comment updated succesfully"})
        })
        it("Should Not update the text of a comment when not provided with CommentID", async()=>{
            const req={
                body:{},params:{ }}
            jest.spyOn(mssql,"connect").mockResolvedValueOnce({
                request:jest.fn().mockReturnThis(),
                input:jest.fn().mockReturnThis(),
                execute:jest.fn().mockResolvedValueOnce({ 
                    rowsAffected:0
                })
            })
            await updateComment(req,res)
            expect(res.status).toHaveBeenCalledWith(401)
            expect(res.json).toHaveBeenCalledWith({message:"Failed Updating Comment"})
        })
    })
})