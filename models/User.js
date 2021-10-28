import mongoose from "mongoose"
const { Schema, model } = mongoose

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  pw: { type: String, required: true }
}, {
  versionKey: false,
  timestamps: true
})

const User = model("User", UserSchema)

export default User
