const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const tasksSchema = new Schema({
    description: {type: String, required: true},
    finish_state: {type: Boolean, required: true, default: false},
    creation_date: {type: Date, required: true, default: Date.now()},
    finish_date: {type: Date, required: false},
    deleted: {type: Boolean, required: true, default: false}
},{
    timestamps:true
})

//condition to hash a password when inserted to database
// tasksSchema.pre('update', async function(next) {
//     // Check if document is new or a new password has been set
//     const document = this;
//     //saves the current time when finish_state is triggered to true and there's no finish_date
//     if (document.finish_state === true && !document.finish_date) {
//       document.finish_date = Date.now()
//       next();
//     }else{
//       next()
//     }
//   });

const Task = mongoose.model('Tasks',tasksSchema);

module.exports = Task