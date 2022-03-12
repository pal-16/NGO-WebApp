const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../src/app');
chai.use(chaiHttp);
const {signToken} = require('../src/utilities/auth');
const Student = require('../src/models/Student');
const Faculty = require('../src/models/Faculty');
const Application = require('../src/models/Application');
const Project = require('../src/models/Project');
const Crowdfunding = require('../src/models/Crowdfunding');

// create post
describe("Create Crowdfunding Post", () => {

    var token="";
    var studentID="";
    var postID="";
    const userType="student";
    var achievement={};
  
    
    beforeEach((done) => {
        Student.create({
            studentID:"181071043",
            name: "test namefdwbfrgr",
            email: "Pmantrypalak@gmail.com",
            password: "12345678",
            department: "Computer Engineering",
            degree: "BTech",
            admissionYear: 2018
        }).then((student) => {
  
            studentID = student._id.toString();
            token = signToken(studentID);
         
          done();
          });
        
        })

  
     afterEach(( done) => {
        Student.deleteMany().then(()=>{
         
              done();
        
          });
    })
  
   
     describe("POST /api/crowdfundings/new", () => {
      
  
        it("returns 201 when new crowdfunding post is created", (done) => {
          const achievement = {
             userID: studentID,
             title: "palak-1",
             amountNeeded: 5,
              description: "Achievement Creation",
          };   
            chai
                .request(app)
                .post("/api/crowdfundings/new")
                .set('Authorization', `Bearer ${token}`)
                .send({ ...achievement })
                .end((err, res) => {
                    expect(res.status).to.be.equal(201);
                 done();
                });
            });
        });
});      
   
// view all posts            
describe("View all crowdfunding posts", () => {

                        var token="";
                        var studentID="";
                        var postID="";
                        const userType="student";
                        var achievement={};
                      
                        
                        beforeEach((done) => {
                            Student.create({
                                studentID:"181071043",
                                name: "test namefdwbfrgr",
                                email: "Pmantrypalak@gmail.com",
                                password: "12345678",
                                department: "Computer Engineering",
                                degree: "BTech",
                                admissionYear: 2018
                            }).then((student) => {
                      
                                studentID = student._id.toString();
                                token = signToken(studentID);
                            done();
                           
                        })
                    });
                      
                         afterEach(( done) => {
                            Student.deleteMany().then(()=>{
                             
                                  done();
                            
                              });
                        })
                      
    describe("POST /api/crowdfundings/getAll", () => {
      
  
        it("returns 200 to fetch all posts", (done) => {
        
            chai
                .request(app)
                .get("/api/crowdfundings/getAll")
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    expect(res.status).to.be.equal(200);
                  done();
                });
            });
        });
});


// donate   
describe("Donate to a Crowdfunding Post", () => {

        var token="";
        var studentID="";
        var postID="";
        var achievement={};
        beforeEach((done) => {
            Student.create({
                studentID:"181071043",
                name: "test namefdwbfrgr",
                email: "Pmantrypalak@gmail.com",
                password: "12345678",
                department: "Computer Engineering",
                degree: "BTech",
                admissionYear: 2018,
                coins:100
            }).then((student) => {
      
                studentID = student._id.toString();
                token = signToken(studentID);
                Crowdfunding.create({
                    userID:studentID,
                    title: "test namefdwbfrgr",
                    description: "apalk@gmail.com",
                   amountNeeded: 2018
                }).then((c) => {
                    postID=c._id.toString();
              done();
            });
          
        })
    });
      
         afterEach(( done) => {
            Student.deleteMany().then(()=>{
             Crowdfunding.deleteMany().then(()=>{
                  done();
             });
              });
        })
      
    describe("POST /api/crowdfundings/donate", () => {
      
  
        it("returns 200 when all details of donating are given", (done) => {
             achievement = {
                postID: postID,
                senderID: studentID,
                donateAmount: 5,
                receiverID:studentID
             };   
            chai
                .request(app)
                .post("/api/crowdfundings/donate")
                .set('Authorization', `Bearer ${token}`)
                .send({ ...achievement })
                .end((err, res) => {
                    expect(res.status).to.be.equal(200);
                    done();
                });
          
            });
        });
});



  
  