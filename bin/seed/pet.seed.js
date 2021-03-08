const mongoose = require('mongoose');
require("./../app") ;
const PetModel = require("./../models/Pet.model")
const friends = [
    { nickname: 'Goldie', type: "cat" },
    { nickname: 'Jojo la terreur', type: "horse" },
    { nickname: 'Tigrou', type: "cat" },
    { nickname: 'Chief', type: "dog" },
    { nickname: 'Fluffy', type: "rabbit" },
   
    
  ];
  PetModel.insertMany(friends)
  .then(insertPet => console.log(insertPet))
  .catch(err => console.log(err))