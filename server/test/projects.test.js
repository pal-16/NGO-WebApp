const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../src/app');
chai.use(chaiHttp);
const {signToken} = require('../src/utilities/auth');
const Student = require('../src/models/Student');
const Project = require('../src/models/Project');

// Create Project
describe("Create Project ", () => {

  var token="";
  var studentID="";
  var facultyID="";
  const userType="student";
  var achievement={};

  
  beforeEach((done) => {
      Student.create({
          studentID:"666666666",
          name: "test namefdwbfrgr",
          email: "palak1@gmail.com",
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

 
   describe("POST /api/projects/new", () => {
    
      it("Returns 400 when all the details not given to create a project", (done) => {

        project = {
            userID: studentID,
            tags:['nodejs'],
            title: "CF 1",
            description: "Achievement Creation",
        };   
          chai
              .request(app)
              .post("/api/projects/new")
              .set('Authorization', `Bearer ${token}`)
              .send({ ...project })
              .end((err, res) => {
             
                  expect(err).to.be.null;
                  expect(res.status).to.be.equal(400);
                  // expect(res.body).to.be.an("object");
                  // expect(res.body).to.have.property("product");
                  done();
              });
      });

      it("returns 400 when all details are not given", (done) => {
        const incompleteProject = {
            userID: studentID,
            description: "Achievement Creation",
        };   
          chai
              .request(app)
              .post("/api/projects/new")
              .set('Authorization', `Bearer ${token}`)
              .send({ ...incompleteProject })
              .end((err, res) => {
                 // expect(err).to.be.null;
                  expect(res.status).to.be.equal(400);
                  // expect(res.body).to.be.an("object");
                  // expect(res.body).to.have.property("message").not.equal("");
                  done();
              });
      });
  });

});


// Get Projects
 describe("Get All Project", () => {

    var token="";
    var studentID="";
    var facultyID="";
    const userType="student";
    var achievement={};
  
    beforeEach((done) => {
        Student.create({
            studentID:"181071084",
            name: "test namefdwbfrgr",
            email: "student5@gmail.com",
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
          })
    })
  
   
     describe("GET /api/student/projects/getAll", () => {

        it("returns 200 after fetching all projects", (done) => {

              chai
                  .request(app)
                  .get("/api/projects/getAll")
                  .set('Authorization', `Bearer ${token}`)
                  .end((err, res) => {
                     // expect(err).to.be.null;
                      expect(res.status).to.be.equal(200);
                      // expect(res.body).to.be.an("object");
                      // expect(res.body).to.have.property("message").not.equal("");
                      done();
                  });
          });
     });
});  




// 2. View Application Detail

describe("project", () => {

    var token="";
    var studentID="";
    var facultyID="";
    var applicationID="";
    const userType="student";
    var achievement={};
  
  // 0. Create Project
    
    beforeEach((done) => {
        Student.create({
            studentID:"181071088",
            name: "test namefdwbfrgr",
            email: "student9@gmail.com",
            password: "12345678",
            department: "Computer Engineering",
            degree: "BTech",
            admissionYear: 2018
        }).then((student) => {   
            studentID = student._id.toString();
            token = signToken(studentID);
             Project.create({
            userID:studentID,
            title: "application 1",
            description:"HOD",
            tags:['node.js']
        }).then((application) => {
            applicationID = application._id.toString();
        
          done();
        });
    
});
})
  
     afterEach(( done) => {
        Student.deleteMany().then(()=>{
        
            Project.deleteMany().then(()=>{
                done();
            })
        
    
          });
    })
  
   
     describe("GET /api/projects/id/getDetail", () => {
      
        it("returns 200 to fetch all details of a given project", (done) => {
         
            chai
                .request(app)
                .get("/api/projects/"+applicationID+"/getDetail")
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                   // expect(err).to.be.null;
                    expect(res.status).to.be.equal(200);
                    // expect(res.body).to.be.an("object");
                    // expect(res.body).to.have.property("message").not.equal("");
               
                              // expect(res.body).to.be.an("object");
                                            // expect(res.body).to.have.property("message").not.equal("");
                                            done();
                          
                  
                });    
    });
});
});

describe("project like", () => {

    var token="";
    var studentID="";
    var facultyID="";
    var applicationID="";
    const userType="student";
    var achievement={};
  
  // 0. Create Application
  // app.post("/api/applications/apply",auth.loginRequired,uploader.single("file"),ApplicationController.create.applyForReward);
    
    beforeEach((done) => {
        Student.create({
            studentID:"181071088",
            name: "test namefdwbfrgr",
            email: "student9@gmail.com",
            password: "12345678",
            department: "Computer Engineering",
            degree: "BTech",
            admissionYear: 2018
        }).then((student) => {   
            studentID = student._id.toString();
            token = signToken(studentID);
             Project.create({
            userID:studentID,
            title: "application 1",
            description:"HOD",
            tags:['node.js']
        }).then((application) => {
            applicationID = application._id.toString();
        
          done();
        });
    
});
})
  
     afterEach(( done) => {
        Student.deleteMany().then(()=>{
        
            Project.deleteMany().then(()=>{
                done();
            })
        
    
          });
    })
  
   
     describe("POST /api/applications/id/like", () => {
      
      
                                it("returns 200 after liking a project", (done) => {
                                
                                
                                    chai
                                        .request(app)
                                        .post("/api/projects/"+applicationID+"/like")
                                        .set('Authorization', `Bearer ${token}`)
                                        .send({ 'userID': studentID })
                                        .end((err, res) => {
                                           // expect(err).to.be.null;
                                            expect(res.status).to.be.equal(200);
                                            // expect(res.body).to.be.an("object");
                                            // expect(res.body).to.have.property("message").not.equal("");
                                            done();
                                        });
                                });
                  
                });

});


describe("Like and Comment on a project", () => {

    var token="";
    var studentID="";
    var applicationID="";
    const userType="student";
    var newComment={};
  
    
    beforeEach((done) => {
        Student.create({
            studentID:"181071044",
            name: "test namefdwbfrgr",
            email: "student69@gmail.com",
            password: "12345678",
            department: "Computer Engineering",
            degree: "BTech",
            admissionYear: 2018
        }).then((student) => {   
            studentID = student._id.toString();
            token = signToken(studentID);
             Project.create({
            userID:studentID,
            title: "application 1",
            description:"HOD",
            tags:['node.js']
        }).then((application) => {
            applicationID = application._id.toString();
        
              done();
            });
    
        });
    })
  
     afterEach(( done) => {
        Student.deleteMany().then(()=>{
        
            Project.deleteMany().then(()=>{
                done();
            })
        
    
          });
    })
  
   
     describe("POST /api/applications/id/comment", () => {
     
    
                                it("returns 200 after commenting on a project", (done) => {
                                
                                    newComment={
                                        'commentText': "Palak is doing good",
                                        'authorID': studentID,
                                        'projectID': applicationID
                                    }         
                                    chai
                                        .request(app)
                                        .post("/api/projects/"+applicationID+"/comment")
                                        .set('Authorization', `Bearer ${token}`)
                                        .send({...newComment})
                                        .end((err, res) => {
                                           // expect(err).to.be.null;
                                            expect(res.status).to.be.equal(200);
                                            // expect(res.body).to.be.an("object");
                                            // expect(res.body).to.have.property("message").not.equal("");
                                            done();
                                        });
                                });
                  
                });

});

