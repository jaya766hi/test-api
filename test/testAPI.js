let chai = require("chai");
let chaiHttp = require("chai-http");
chai.use(chaiHttp);
chai.should();
var assert = require('assert');
var server = "https://petstore.swagger.io/v2";

//Pet
describe('Ensure user should be able to get Pet Status', () =>{
    it('User should be able to get status Available', () =>{
        chai.request(server)
            .get("/pet/findByStatus?status=available")
            .end((err, response) =>{
            response.should.have.status(200)
            var total = response.body.length
            console.log("Total Pet with status Available = " + total)
        })
    })
    it('User should be able to get status Pending', () =>{
        chai.request(server)
            .get("/pet/findByStatus?status=pending")
            .end((err, response) =>{
            response.should.have.status(200)
            var total = response.body.length
            console.log("Total Pet with status Pending = " + total)
        })
    })
    it('User should be able to get status Sold', () =>{
        chai.request(server)
            .get("/pet/findByStatus?status=sold")
            .end((err, response) =>{
            response.should.have.status(200)
            var total = response.body.length
            console.log("Total Pet with status Sold = " + total)
        })
    })
})

describe('Ensure user should be able to Insert new Pet', () =>{
    it('User should be able to insert pet with status Available', () =>{
        chai.request(server)
            .post("/pet")
            .send(
                    {
                        "id": 123454321,
                        "category": {
                          "id": 1,
                          "name": "string"
                        },
                        "name": "chihuehue",
                        "photoUrls": [
                          "string"
                        ],
                        "tags": [
                          {
                            "id":2,
                            "name": "string"
                          }
                        ],
                        "status": "available"
                    }
                )
            .end((err, response) =>{
            response.should.have.status(200)
        })
    })
})

describe('Ensure user should be able to get Pet Details', () =>{
    it('User should be able to get details Available', () =>{
        chai.request(server)
            .get("/pet/123454321")
            .end((err, response) =>{
            response.should.have.status(200)
        })
    })
})

//user
describe('Ensure user should be able to create new User', () =>{
    it('User should be able to create new User', () =>{
        chai.request(server)
            .post("/user")
            .send(
                {
                    "id": 123321,
                    "username": "jaya",
                    "firstName": "hasan",
                    "lastName": "wijaya",
                    "email": "jay@jay.com",
                    "password": "testing123",
                    "phone": "6282100001111",
                    "userStatus": 1
                  }
                )
            .end((err, response) =>{
            response.should.have.status(200)
        })
    })
})

describe('Ensure user should be able to get User Details', () =>{
    it('User should be able to get valid User Details', () =>{
        chai.request(server)
            .get("/user/jaya")
            .end((err, response) =>{
            response.should.have.status(200)
        })
    })
    it("User shouldn't be able to get invalid User Details", () =>{
      chai.request(server)
            .get("/user/jayacak2")
            .end((err, response) =>{
            response.should.have.status(404)
            assert.strictEqual(response.body.code, 1);
            assert.strictEqual(response.body.type, "error");
            assert.strictEqual(response.body.message, "User not found");
        })
    })
})