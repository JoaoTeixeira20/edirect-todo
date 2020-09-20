process.env.NODE_ENV = 'test'
process.env.TOKEN_SECRET = 'test'
process.env.USERNAME = 'hello'
process.env.PASSWORD = 'world'
process.env.BEARERTOKEN = ''
process.env.PROJECTID = ''
process.env.TASKID = ''

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../index')
const conn = require('../../database/db')


//user
describe('API interface', () => {
  before(done => {
    conn.connect()
      .then(() => done())
      .catch(err => done(err));
  })

  after(done => {
    conn.close()
      .then(() => done())
      .catch((err) => done(err))
  })
})

it('Fail, logging in', (done) => {
  request(app).post('/api/user/login')
    .send({
      username:'hello',
      password:'world'
    })
    .then(res => {
      expect(res.status).to.equal(401)
      done()
    })
    .catch(err => {
      console.log(err)
    })
}).timeout(5000)

it('Ok, creating a new username', (done) => {
  request(app).post('/api/user/signup')
    .send({
      name: 'john',
      username: process.env.USERNAME,
      password: process.env.PASSWORD
    })
    .then(res => {
      expect(res.status).to.equal(201)
      done()
    })
    .catch(err => {
      console.log(err)
    })
})

it('Ok, logging in', (done) => {
  request(app).post('/api/user/login')
    .send({
      username: process.env.USERNAME,
      password: process.env.PASSWORD
    })
    .then(res => {
      process.env.BEARERTOKEN = res.body.BearerToken
      expect(res.status).to.equal(200)
      done()
    })
    .catch(err => {
      console.log(err)
    })
})

//project
it('Fail, getting a project', (done) => {
  request(app).get('/api/project')
    .send()
    .then(res => {
      expect(res.status).to.equal(401)
      done()
    })
    .catch(err => {
      console.log(err)
    })
})

it('Ok, getting a project', (done) => {
  request(app).get('/api/project')
    .set('Authorization', 'bearer ' + process.env.BEARERTOKEN)
    .send()
    .then(res => {
      expect(res.status).to.equal(200)
      done()
    })
    .catch(err => {
      console.log(err)
    })
})

it('Fail, posting a project', (done) => {
  request(app).post('/api/project')
    .send()
    .then(res => {
      expect(res.status).to.equal(401)
      done()
    })
    .catch(err => {
      console.log(err)
    })
})

it('Ok, posting a project', (done) => {
  request(app).post('/api/project')
    .set('Authorization', 'bearer ' + process.env.BEARERTOKEN)
    .send({
      projectName:"xpto"
    })
    .then(res => {
      expect(res.status).to.equal(201)
      done()
    })
    .catch(err => {
      console.log(err)
    })
})

it('Fail, deleting a project', (done) => {
  request(app).delete('/api/project/xpto')
    .send()
    .then(res => {
      expect(res.status).to.equal(401)
      done()
    })
    .catch(err => {
      console.log(err)
    })
})

//tasks
//project

it('Ok, posting a task', (done) => {
  request(app).get('/api/project')
    .set('Authorization', 'bearer ' + process.env.BEARERTOKEN)
    .send()
    .then(res => {
      process.env.PROJECTID = res.body[0].projectID
      request(app).post('/api/task/' + process.env.PROJECTID)
        .set('Authorization', 'bearer ' + process.env.BEARERTOKEN)
        .send({description: 'xpto'})
        .then(res => {
          expect(res.status).to.equal(201)
          done()
        })
        .catch(err => {
          console.log('error on post api task ', err)
        })
    })
    .catch(err => {
      console.log('error on get api project', err)
    })
  })

it('Ok, getting tasks', (done) => {
  request(app).get('/api/task/' + process.env.PROJECTID)
    .set('Authorization', 'bearer ' + process.env.BEARERTOKEN)
    .send()
    .then(res => {
      process.env.TASKID = res.body[0].taskID
      //process.env.TASKID = res.body[0].taskID
      expect(res.status).to.equal(200)
      done()
    })
    .catch(err => {
      console.log(err)
    })
})

it('Ok, completing a task', (done) => {
  request(app).put('/api/task/'+process.env.PROJECTID+"/"+process.env.TASKID)
    .set('Authorization', 'bearer ' + process.env.BEARERTOKEN)
    .send()
    .then(res => {
      expect(res.status).to.equal(201)
      done()
    })
    .catch(err => console.log('error on put api task ', err))
})

it('Ok, deleting a task', (done) => {
  request(app).delete('/api/task/'+process.env.PROJECTID+"/"+process.env.TASKID)
    .set('Authorization', 'bearer ' + process.env.BEARERTOKEN)
    .send()
    .then(res => {
      expect(res.status).to.equal(200)
      done()
    })
    .catch(err => console.log('error on delete api task ', err))
})

it('Ok, deleting a project', (done) => {
  request(app).get('/api/project')
    .set('Authorization', 'bearer ' + process.env.BEARERTOKEN)
    .send()
    .then(res => {
      const projectID = res.body[0].projectID
      request(app).delete('/api/project/' + projectID)
        .set('Authorization', 'bearer ' + process.env.BEARERTOKEN)
        .send()
        .then(res => {
          expect(res.status).to.equal(200)
          done()
        })
        .catch(err => {
          console.log(err)
        })
    })
})