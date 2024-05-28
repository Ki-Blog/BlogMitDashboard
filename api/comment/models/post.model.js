import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  userId:{
    type: String,
    required: true,
  },
  content:{
    type: String,
    required: true,
  },
  title:{
    type: String,
    required: true,
    unique: true,
  },
  image:{
    type: String,
    default: "https://www.seoclerk.com/pics/000/787/824/51099d50ed6a0c6fa4e74f1260db024b.png",
  },
  category:{
    type: String,
    default: "uncategorized",
  },
  slug:{
    type: String,
    required: true,
    unique: true,
  },
}, {timestamps: true});

const Post = mongoose.model("Post", postSchema);

export default Post;