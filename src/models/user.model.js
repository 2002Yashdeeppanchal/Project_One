import mongoose, { Mongoose, Schema } from "mongoose";
import { jwt } from "jsonwebtoken";
import bcrypt from "bcrypt";


const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    avatar: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video"
      }
    ],
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true
  }
)
//apn user ka password save krne se phle usse encrpyt krenge using bcrypt and jwt iske liye schema me hi inbuild hooks ka use krenge jese pre hook use krenge ese hi post hook bhi hota hai jo save hone ke turrnt baad execute krta hai
//isme arrow fucntion ka use ni krenge apn because arrow functions me this ka refernece ni hota hai so simple fucntions used here in call back
//pre hook is used to perform some action before saving the document
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    next();
  }//if password is not modified then we will not hash it again
  this.password = await bcrypt.hash(this.password, 10); //10 is the number of rounds for hashing
  next();
});
//checking for password correct or not is also handled by bcrypt
userSchema.methods.isPasswordCorrect = async function(password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function() {
  return jwt.sign(
    { _id: this._id,
      email: this.email,
      username: this.username, 
      fullName: this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};
userSchema.methods.generateRefreshToken = function() {
  return jwt.sign(
    { _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

export const User = mongoose.model("User", userSchema);