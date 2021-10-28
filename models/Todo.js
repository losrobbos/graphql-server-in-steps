import mongoose from "mongoose"
const { Schema, model } = mongoose

const TodoSchema = new Schema({
  text: { type: String, required: true },
  status: { type: Boolean, default: false },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  versionKey: false,
  timestamps: true
})

const Todo = model("Todo", TodoSchema)

export default Todo