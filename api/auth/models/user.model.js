import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default: "https://firebasestorage.googleapis.com/v0/b/it-guru-blog.appspot.com/o/profil.jpg?alt=media&token=e627e2f8-cd3f-4a0a-ad8b-7b5ed7889ca7",
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  }, {timestamps: true}
);


const User = mongoose.model("User", userSchema);

export default User;