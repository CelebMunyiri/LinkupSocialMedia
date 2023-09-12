const mssql =require('mssql');
const { createSubComment, updateSubComment, deleteSubComment, viewAllSubComments } = require('./SubCommentController');

const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  describe("Tests for subComments Controllers",()=>{
    describe("Tests fro creating a Subcomment",()=>{

    
    it("Should add a SubComment to a comment succcessfully",async()=>{
      const req={
        body:{
          CommentID:1,
          UserID:2,
          SubCommentContent:"Who let the dogs out"
        }
      }
       
      jest.spyOn(mssql,"connect").mockResolvedValueOnce({
        request:jest.fn().mockReturnThis(),
        input:jest.fn().mockReturnThis(),
        execute:jest.fn().mockResolvedValueOnce({
          rowsAffected:1
        })
      })
      await createSubComment(req,res)

      expect(res.status).toHaveBeenCalledWith(200) 
      expect(res.json).toHaveBeenCalledWith({message:"SubComment created Sucessfully"})
    })
    it("Should not create a subComment when an empty body is passed",async()=>{
      const req={
        body:{}
      }
      jest.spyOn(mssql,"connect").mockResolvedValueOnce({
        request:jest.fn().mockReturnThis(),
        input:jest.fn().mockReturnThis(),
        execute:jest.fn().mockResolvedValueOnce({
          rowsAffected:0
        })
      })
      await createSubComment(req,res)
      expect(res.status).toHaveBeenCalledWith(402)
      expect(res.json).toHaveBeenCalledWith({message:"Failed to Add SubComment"}) 
    })
  })
  describe("Tests for updating a SubComment",()=>{
    it("Should update a subcomment",async()=>{
      const req={
        params:{SubCommentID:1},
        body:{
          SubCommentContent:"Lets do it again"
        }
      }
      jest.spyOn(mssql,"connect").mockResolvedValueOnce({
        request:jest.fn().mockReturnThis(),
        input:jest.fn().mockReturnThis(),
        execute:jest.fn().mockResolvedValueOnce({
          rowsAffected:1
        }) 
      })
      await updateSubComment(req,res)

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith({message:"SubComment updated Successfully"})
    })
    it("Should not update a SubComment when no body or params is passed",async()=>{
      const req={
        body:{},
        params:{}
      }

      jest.spyOn(mssql,"connect").mockResolvedValueOnce({
        request:jest.fn().mockReturnThis(),
        input:jest.fn().mockReturnThis(),
        execute:jest.fn().mockResolvedValueOnce({
          rowsAffected:0
        })
      })
      
      await updateSubComment(req,res)
 
      expect(res.status).toHaveBeenCalledWith(401)
      expect(res.json).toHaveBeenCalledWith({message:"Failed Updating SubComment"})
    })

  })
  describe("tests for deleting a subcomment",()=>{
    it("Should Delete a SubComment using its ID",async()=>{
      const req={
        params:{
          SubCommentID:1
        }
      }
      jest.spyOn(mssql,"connect").mockResolvedValueOnce({
        request:jest.fn().mockReturnThis(),
        input:jest.fn().mockReturnThis(),
        execute:jest.fn().mockResolvedValueOnce({
          rowsAffected:1
        })
      })
      await deleteSubComment(req,res)
    
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith({message:"SubCommentDeleted Successful"})
    })
    it("Should not delete a SubComment on passing empty params",async()=>{
const req={
  params:{}
}
jest.spyOn(mssql,"connect").mockResolvedValueOnce({
  request:jest.fn().mockReturnThis(),
  input:jest.fn().mockReturnThis(),
  execute:jest.fn().mockResolvedValueOnce({
    rowsAffected:0
  })
})

await deleteSubComment(req,res)
expect(res.status).toHaveBeenCalledWith(401)
expect(res.json).toHaveBeenCalledWith({message:"Failed Deleting SubComment"})
    })
    })

    describe("Tests for viewing all SubComments of a comment",()=>{
      it("should display all the SubComments of a specific comments",async()=>{
        const mockResult={
          "result": [
            [
              {
                "SubCommentID": 2,
                "CommentID": 1008,
                "SubCommentContent": "Nipo single",
                "SubCommentUserID": 1002,
                "SubCommentUsername": "Abdul Raheem",
                "SubCommentEmail": "davidmunyiri2019@outlook.com",
                "SubCommentProfileImage": null
              },
              {
                "SubCommentID": 4,
                "CommentID": 1008,
                "SubCommentContent": "Nipo single",
                "SubCommentUserID": 1002,
                "SubCommentUsername": "Abdul Raheem",
                "SubCommentEmail": "davidmunyiri2019@outlook.com",
                "SubCommentProfileImage": null
              }
            ]
          ]
        }
        
        const req={
          params:{
            CommentID:1
          }
        }
        jest.spyOn(mssql,"connect").mockResolvedValueOnce({
          request:jest.fn().mockReturnThis(),
          input:jest.fn().mockReturnThis(),
          execute:jest.fn().mockResolvedValueOnce({
            result:mockResult
          })
        })
        await viewAllSubComments(req,res)
        expect(res.status).toHaveBeenCalledWith(200)
       
      })
it("Should not display any Subcomments when not provided with the params",async()=>{
  const req={
    params:{}
  }
  jest.spyOn(mssql,"connect").mockResolvedValueOnce({
    request:jest.fn().mockReturnThis(),
    input:jest.fn().mockReturnThis(),
    execute:jest.fn().mockResolvedValueOnce({})
  })
  await viewAllSubComments(req,res)
  expect(res.status).toHaveBeenCalledWith(401)
  expect(res.json).toHaveBeenCalledWith({message:"Failed Deleting SubComment"})
})
it("Should Throw an error with status code 402 when there is an error during request execution",async()=>{
 const req={}
  const mockPool = {

    request: jest.fn(()=>{
        throw new Error('Error connecting to the database')
    })
}

jest.spyOn(mssql, 'connect').mockResolvedValueOnce(mockPool)
await viewAllSubComments(req, res)

expect(res.status).toHaveBeenCalledWith(402)


})
    })
  })