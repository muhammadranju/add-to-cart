const { Schema, model } = require("mongoose");
const mongooseAggregatePaginate = require("mongoose-aggregate-paginate-v2");
const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
    },
    fullName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    status: {
      type: String,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.plugin(mongooseAggregatePaginate);

const User = model("User", userSchema);

module.exports = User;
