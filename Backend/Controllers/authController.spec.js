const mssql=require('mssql')

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { loginUser, registerUser, updateUserBio } from "./authControllers";

const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  describe(" Tests For Users Controller", () => {
    describe("Registering a User", () => {
      it("should Register a User", async () => {
        jest.spyOn(bcrypt, "hash").mockResolvedValueOnce("yutruruyy");
        const mockUser = {
          Username: "David Munyiri",
          Email: "davidmunyiri2019@outlook.com",
          PasswordHash: "Mahu12#34"
        };
        const req = {
          body: mockUser,
        };
  
        jest.spyOn(mssql, "connect").mockResolvedValueOnce({
          request: jest.fn().mockReturnThis(),
          input: jest.fn().mockReturnThis(),
          execute: jest.fn().mockResolvedValueOnce({
            rowsAffected: [1],
          }),
        });
        await registerUser(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
          message: "User registered succesfully",
        });
      });
  
      it("should Not Register a User", async () => {
        jest.spyOn(bcrypt, "hash").mockResolvedValueOnce("yutruruyy");
        const mockUser = {};
        const req = {
          body: mockUser,
        };
  
        jest.spyOn(mssql, "connect").mockResolvedValueOnce({
          request: jest.fn().mockReturnThis(),
          input: jest.fn().mockReturnThis(),
          execute: jest.fn().mockResolvedValueOnce({
            rowsAffected: 0,
          }),
        });
        await registerUser(req, res);
  
        expect(res.json).toHaveBeenCalledWith({
          message: "Failed Registering user",
        });
        expect(res.status).toHaveBeenCalledWith(401);
      });
    }); 
  
    
    describe("Test User Login", () => {
   
      it("Should Enable a user to Login and return a token", async () => {
        const user = {
          UserID: "787rnyhcg3gv8bg34cr",
          Username: "Mahubali",
          userEmail: "mahubali@gmail.com",
          PasswordHash: "ouiweuiriuew907ajbf"
        };
        const req = {
          body: {
            Email: user.Email,
            PasswordHash: "12345678",
          },
        };
  
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
  
        jest.spyOn(mssql, "connect").mockResolvedValueOnce({
          request: jest.fn().mockReturnThis(),
          input: jest.fn().mockReturnThis(),
          execute: jest.fn().mockResolvedValueOnce({
            rowsAffected: 1,
            recordset: [user],
          }),
        });
  
        jest.spyOn(bcrypt, "compare").mockResolvedValueOnce(true);
        jest.spyOn(jwt, "sign").mockReturnValueOnce("mockedToken");
  
        await loginUser(req, res);
  
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({
          message: "Logged in Succesful",
          token: "mockedToken",UserProfile:"hhhhh",UserID:"6",UserBio:"jjhh",UserBackgroundImage:"jhvgvyyy"});
      }); 
    }); 

    describe("Test for user update profile after registering and first login",()=>{
      it("Should Enable user to update profile",async()=>{
        const req={
          body:{
            UserBackgroundImage:'https://imageBackground',
            UserProfile:'https://image2',
            UserBio:"Iam a programmer"
          },
          params:{
            UserID:1
          }
        }
        
        jest.spyOn(mssql,"connect").mockResolvedValueOnce({
          request:jest.fn().mockReturnThis(),
          input:jest.fn().mockReturnThis(),
          execute:jest.fn().mockResolvedValueOnce({
            rowsAffected:1
          })
        })
        await updateUserBio(req,res)

        expect(res.status).toHaveBeenCalledWith(200)
        //expect(res.json).toHaveBeenCalledWith({message:'Profile Updated Successfully',UserProfile,UserBackgroundImage,UserBio})
      })
      it("Should not update User Bio",async()=>{
        const req={
          body:{
            UserBackgroundImage:'https://imageBackground',
            UserProfile:'https://image2',
            UserBio:"Iam a programmer"
          },
          params:{}
        }
        
        jest.spyOn(mssql,"connect").mockResolvedValueOnce({
          request:jest.fn().mockReturnThis(),
          input:jest.fn().mockReturnThis(),
          execute:jest.fn().mockResolvedValueOnce({
            rowsAffected:0
          })
        })
        await updateUserBio(req,res)

        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.json).toHaveBeenCalledWith({message:'Error updating profile'})
      })
    })
  });