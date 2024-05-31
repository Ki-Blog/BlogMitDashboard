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
    default: "https://firebasestorage.googleapis.com/v0/b/it-guru-blog.appspot.com/o/titel_pic.jpg?alt=media&token=ff2ab791-0aec-4c42-b362-8a184f5a9066",
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