const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema;

const saltRounds = 10

const userSchema = new Schema({
    name: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
},{
    timestamps:true
})

//condition to verify if user exists and hash a password on user insert
userSchema.pre('save', async function(next) {
    const document = this;
    //condition if the user exists
    // Check if document is new or a new password has been set
    if (this.isNew || this.isModified('password')) {
      // Saving reference to this because of changing scopes
      const hashedPassword = await bcrypt.hash(document.password, saltRounds);
      document.password = hashedPassword;
      next();
    }
});
  
  //condition to validade if a password is correct
  userSchema.methods.isCorrectPassword = async function(password){
    const result = await bcrypt.compare(password, this.password)
    return result
  }

const User = mongoose.model('User',userSchema);

module.exports = User