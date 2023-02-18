const { expect } = require("chai");
const request = require("supertest");
const baseURL = 'https://kasir-api.belajarqa.com'
const kumpulData = require('../data/authData.js')
const testData1 = kumpulData.CREATE_REGIS_DATA_1
const testData2 = kumpulData.CREATE_REGIS_DATA_2


describe('TC01 Registration Sukses', () => {
    const response = request(baseURL)//baseurl
    .post('/registration')//endpoint
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
           expect((await response).body.message).to.equal("Toko berhasil didaftarkan") 
    })
})

describe('TC02 Registration Gagal - Email Tidak Valid', () => {
    const response = request(baseURL)//baseurl
    .post('/registration')//endpoint
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
           expect((await response).body.message).to.equal("\"email\" must be a valid email") 
    })
})