import app from '../server.js'
import userModel from '../model/user.model.js'
import request from 'supertest'
import { expect } from 'chai'

describe("Testing API endpoints",function(){
  const originalFind = userModel.find
  const originalSave = userModel.prototype.save

  afterEach(function(){
    userModel.find = originalFind
    userModel.prototype.save = originalSave
  })

  describe("GET request",function(){
    it("Should return a list of users",async function(){
      userModel.find = async function(){
        return [{username: "user1"}]
      }

      const res = await request(app).get("/")
      expect(res.status).to.equal(200)
      expect(res.body).to.deep.equal([{username:"user1"}])
    })
  })

  describe("POST request",function(){
    it("Should save a user and return success message",async function(){
      userModel.prototype.save = async function(){}
      const res = await request(app).post("/add")
      expect(res.status).to.equal(200)
      expect(res.body).to.deep.equal({message:"Data has been added."})
    })
  })
})