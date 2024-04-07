const { mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is required"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: {
    type: String,
    default: false,
  },
  forgotPasswordTokenExpiry: {
    type: String,
    default: 'false',
  },
  verifyToken: {
    type: String,
    default: false,
  },
  verifyTokenExpiry: {
    type: String,
    default: 'false',
  },
})

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;