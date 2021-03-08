const express = require('express');
const router  = express.Router();
const FriendModel = require("../models/Friend.model");
const PetModel = require("../models/Pet.model");


router.get('/friends', (req, res, next) => {
  
  FriendModel.find()
      .then((dbRes) => {
        // console.log(dbRes);
        res.render("friends/index.hbs", { friends: dbRes });
      })
      .catch((error) => {
        console.log(error);
      });
  });
  

  router.get("/friends/new", (req, res, next) => {
   PetModel.find()
    .then((pets) => {
      // console.log(dbRes);
      res.render("friends/new.hbs", { pets });
    })
    .catch((error) => {
      console.log(error);
    })
  });

  router.post('/friends/new', async (req, res, next) => {
    const { name, occupation, age, pet } = req.body; 
    console.log("tot",req.body)
    try {
      await FriendModel.create({
        name,
        occupation,
        age,
        pet
        
      });
      res.redirect("/friends");
    } catch (err) {
      next(err);
    }
     
  });

  router.get('/friends/:id', (req, res, next) => {
  
    FriendModel.findById(req.params.id).populate("pet")
      .then((dbRes) => {
         console.log(dbRes);
        //  console.log(req.params.id);
        res.render("friends/show.hbs", { dbRes });
      })
      .catch((error) => {
        next(error);
      });
  });

  router.get("/friends/delete/:id", async (req, res, next) => {
    try {
      await FriendModel.findByIdAndDelete(req.params.id);
      res.redirect("/friends");
    } catch (err) {
      next(err); 
    }
  });

  router.get('/friends/edit/:id', (req, res, next) => {
    FriendModel.findById(req.params.id)
    .then((friend) => res.render("friends/edit", { friend }))
    .catch(next);
  });
  
  
  router.post('/friends/edit/:id', async (req, res, next) => {
    const { name, occupation, age, pet } = req.body;
    try {
      await FriendModel.findByIdAndUpdate(req.params.id, {
        name,
        occupation,
        age,
        pet
      });
      res.redirect("/friends");
    } catch (err) {
      next(err);
    }
  });

module.exports = router;

