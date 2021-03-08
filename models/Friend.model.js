const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const friendSchema = new Schema({
    name: String,
    occupation: String,
    age: Number,
    pet: [{ type: Schema.Types.ObjectId, ref: "Pets" }]
});


const FriendModel = mongoose.model("Friend", friendSchema);

module.exports = FriendModel;
