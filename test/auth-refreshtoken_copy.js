const { expect } = require("chai");
const request = require("supertest");
const baseURL = 'https://kasir-api.belajarqa.com'
const kumpulData = require('../data/authData.js')
const testData1 = kumpulData.CREATE_LOGIN_DATA_1
//const {Wreck} = require("wreck")

it('TC01 Success Refresh Token', async()=>{
    
    const get_token = request(baseURL)
    .post('/authentications')
    .send(testData1)
    const accessToken = (await get_token).body.data.accessToken
    const refreshToken = (await get_token).body.data.refreshToken

    // console.log(typeof accessToken)

    const response = request(baseURL)//baseurl
    .put('/authentications')//endpoint
    .send(refreshToken)
    .type('json')
    .set({'Content-Type':'application/json'})
    .set({'Authorization': accessToken})
        console.log((await response).body)
        expect((await response).status).to.equal(200)
        expect((await response).body.status).to.equal("success") 
        expect((await response).body.message).to.equal("Access Token berhasil diperbarui") 
})

it('TC02 Fail Refresh Token', async()=>{
    
  const get_token = request(baseURL)
  .post('/authentications')
  .send(testData1)
  const accessToken = (await get_token).body.data.accessToken
  const refreshToken = (await get_token).body.data.refreshToken

  // console.log(typeof accessToken)

  const response = request(baseURL)//baseurl
  .put('/authentications')//endpoint
  .send(refreshToken)
  .type('json')
  .set({'Content-Type':'application/json'})
  .set({'Authorization': accessToken})
      console.log((await response).body)
      expect((await response).status).to.equal(400)
      expect((await response).body.error).to.equal("Bad Request")
      expect((await response).body.message).to.equal("Invalid request payload JSON format") 
})
