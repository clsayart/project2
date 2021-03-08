const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const petSchema = new Schema({
  nickname: String,
  type: {
    type: String,
    enum: ["cat", "dog", "rabbit", "horse"],
  },
});

const PetModel = mongoose.model("Pets", petSchema);

module.exports = PetModel;
