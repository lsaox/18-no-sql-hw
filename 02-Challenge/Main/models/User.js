const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;

const mongoose = require('mongoose');

// Define your User schema
const userSchema = new mongoose.Schema({
  // Other fields...
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

// Define the virtual field
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

// Create the User model
const User = mongoose.model('User', userSchema);

// Example usage
const user = new User({
  // Other field values...
  friends: [/* array of friend IDs */],
});

console.log(user.friendCount); // This will output the length of the 'friends' array