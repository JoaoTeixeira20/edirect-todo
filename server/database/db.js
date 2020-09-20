const mongoose = require('mongoose');

const database_uri = process.env.DB_URI

mongoose.Promise = global.Promise;

if (process.env.NODE_ENV === 'test'){
  const Mockgoose = require('mockgoose').Mockgoose;
  const mockgoose = new Mockgoose(mongoose)
  
  mockgoose.prepareStorage()
    .then(() => {
      mongoose.connect(database_uri, {
        useNewUrlParser: true, 
        useCreateIndex: true,
        useUnifiedTopology: true,
        connectTimeoutMS: 9999999
      }, function(err){
        err ? console.error('there was a problem connecting to the database, might be unavaliable, details: ', err.message) : console.log('connected to the database')
      });
    })
  }else{
    mongoose.connect(database_uri, {
      useNewUrlParser: true, 
      useCreateIndex: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 1000
    }, function(err){
      err ? console.error('there was a problem connecting to the database, might be unavaliable, details: ', err.message) : console.log('connected to the database')
    });
  }

//const that will hold the database connection
const db = mongoose.connection;

module.exports = db;