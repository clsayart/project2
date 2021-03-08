const express = require('express');
const router  = express.Router();
const PetModel = require("../models/Pet.model");


router.get('/pets', (req, res, next) => {
  
  PetModel.find()
      .then((dbRes) => {
        // console.log(dbRes);
        res.render("pets/index.hbs", { pets: dbRes });
      })
      .catch((error) => {
        console.log(error);
      });
  });
  

  router.get("/pets/new", (req, res, next) => {
    res.render("pets/new.hbs");
  });

  router.post('/pets/new', async (req, res, next) => {
    const { nickname, type } = req.body; 
    console.log(req.body)
    try {
      await PetModel.create({
        nickname,
        type
        
      });
      res.redirect("/pets");
    } catch (err) {
      next(err);
    }
     
  });

  router.get('/pets/:id', (req, res, next) => {
  
    PetModel.findById(req.params.id)
      .then((dbRes) => {
         console.log(dbRes);
        //  console.log(req.params.id);
        res.render("pets/show.hbs", { dbRes });
      })
      .catch((error) => {
        next(error);
      });
  });

  router.get("/pets/delete/:id", async (req, res, next) => {
    try {
      await PetModel.findByIdAndDelete(req.params.id);
      res.redirect("/pets");
    } catch (err) {
      next(err); 
    }
  });

  router.get('/pets/edit/:id', (req, res, next) => {
    PetModel.findById(req.params.id)
    .then((pet) => res.render("pets/edit", { pet }))
    .catch(next);
  });
  
  
  router.post('/pets/edit/:id', async (req, res, next) => {
    const { nickname, type } = req.body;
    try {
      await PetModel.findByIdAndUpdate(req.params.id, {
        nickname,
        type
      });
      res.redirect("/pets");
    } catch (err) {
      next(err);
    }
  });

module.exports = router;

