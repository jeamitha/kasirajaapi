const { expect } = require("chai");
const request = require("supertest");
const baseURL = 'https://kasir-api.belajarqa.com'
const kumpulData = require('../data/authData.js')
const testData1 = kumpulData.CREATE_LOGIN_DATA_1

it('TC01 Sukses Logout', async()=>{
    
    const get_token = request(baseURL)
    .post('/authentications')
    .send(testData1)
    const accessToken = (await get_token).body.data.accessToken
    const refreshToken = (await get_token).body.data.refreshToken

    const response = request(baseURL)//baseurl
    .delete('/authentications')//endpoint
    .send(refreshToken)
    .set({'Content-Type':'application/json'})
    .set({'Authorization': accessToken})
        console.log((await response).body)
        expect((await response).status).to.equal(200)
        expect((await response).body.status).to.equal("success") 
        expect((await response).body.message).to.equal("Refresh Token Berhasil Dihapus") 
})

it('TC02 Gagal Logout', async()=>{
    
  const get_token = request(baseURL)
  .post('/authentications')
  .send(testData1)
  const accessToken = (await get_token).body.data.accessToken
  const refreshToken = (await get_token).body.data.refreshToken

  const response = request(baseURL)//baseurl
  .delete('/authentications')//endpoint
  .send(refreshToken)
  .set({'Content-Type':'application/json'})
  .set({'Authorization': accessToken})
      console.log((await response).body)
      expect((await response).status).to.equal(400)
      expect((await response).body.error).to.equal("Bad Request") 
      expect((await response).body.message).to.equal("Invalid request payload JSON format") 
})