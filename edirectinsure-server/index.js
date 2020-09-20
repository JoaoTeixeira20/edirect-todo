const express = require('express');
const path = require('path')
const cors = require('cors');
require('dotenv').config()

const db = require('./database/db');

const host = process.env.HOST
const port = process.env.PORT

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));

const ProjectRoute = require('./api/routes/ProjectRoute')
const UserRoute = require('./api/routes/UserRoute')
const TaskRoute = require('./api/routes/TaskRoute')

app.use('/api/user', UserRoute);
app.use('/api/project', ProjectRoute);
app.use('/api/task', TaskRoute)

//entrypoint to the react built app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

//start the server once the database is ready
db.on('connected', () => {
    app.listen(port, host, () => {
      console.log(`server is running on ${host}:${port}`)
    })
  })
  
//quits the application with an error
db.on('error', () => {
console.error('fatal error on database, check database config parameters')
process.exit(1)
})

module.exports = app