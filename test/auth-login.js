const { expect } = require("chai");
const request = require("supertest");
const baseURL = 'https://kasir-api.belajarqa.com'
const kumpulData = require('../data/authData.js')
const testData1 = kumpulData.CREATE_LOGIN_DATA_1
const testData2 = kumpulData.CREATE_REGIS_DATA_2


describe('TC01 Login Sukses', () => {
    const response = request(baseURL)//baseurl
    .post('/authentications')//endpoint
    .send(testData1)
    
    it('Response Body', async()=>{
        console.log((await response).body)
    })

    it('Response 201 sesuai', async () =>{
        expect((await response).status).to.equal(201)
    })

    it('Status success sesuai', async () =>{
           expect((await response).body.status).to.equal("success") 
    })

    it('Message sesuai', async () =>{
           expect((await response).body.message).to.equal("Authentication berhasil ditambahkan") 
    })

    it('User data sesuai', async () =>{
        expect((await response).body.data.user.name).to.equal("louxwell shop") 
        expect((await response).body.data.user.email).to.equal("sample@example.com") 
 })
 //const refreshTokenSimpan = response.body.data.refreshToken
})

describe('TC02 Login Gagal - Password Salah', () => {
    const response = request(baseURL)//baseurl
    .put('/authentications')//endpoint
    .send(testData2)
    
    it('Response Body', async()=>{
        console.log((await response).body)
    })

    it('Response 400 sesuai', async () =>{
        expect((await response).status).to.equal(400)
    })

    it('Status fail sesuai', async () =>{
           expect((await response).body.status).to.equal("fail") 
    })

    it('Message sesuai', async () =>{
           expect((await response).body.message).to.equal("\"refreshToken\" is required") 
    })
})