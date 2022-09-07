const mongoose = require('mongoose');
const Schema = mongoose.Schema; 
//------- create schema
const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  postText: {
    type: String,
    required: false,
    max: 1000,
  },
  media: {
    type: String,
    required: false,
    max: 100,
  },
  like: {
    type: Number,
    required: true,
    default:0 
  },
  comments: {
    type: Number,
    required: true,
    default:0 
  },
  date: {
    type: Date,
    default: Date.now,
  },  
  
});
module.exports = Post = mongoose.model('post', PostSchema);