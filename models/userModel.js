import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: [true, "role is required"],
    },
    name: {
      type: String,
      required: [true, "name is required"],
    },
    isAdmin:{
      type:Boolean,
      default:true
    },

    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      validate: validator.isEmail,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    profile_pic: {
      public_id: {
        type: String
      },
      url: {
        type: String
      }
    },
    aboutMe: {
      type: String,
    },
    contact : {
      type : Number,
    },
    updatedAt: {
      type: Date,
      default: Date.now(),
    },
    isVerified: {
      type: Boolean,
      default: true
    },
    isVerifiedToken: {
      type: String,
    }
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (!this.isModified('password')) {
    return
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// compare password

userSchema.methods.comparePassword = async function (userPassword) {
  const isMatch = await bcrypt.compare(userPassword, this.password);
  return isMatch
};
// json web token

userSchema.methods.createJWT = function () {
  return JWT.sign({ userId: this._id }, process.env.SECRET_CODE, {
    expiresIn: "1d",
  });
};

export default mongoose.model("User", userSchema);
