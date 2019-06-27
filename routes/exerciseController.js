const mongoose = require('mongoose');
const debug = require('debug')
const Exercise = require("../models/exercise");
const Serie = require("../models/serie")

 function create(req, res) {
  const exercise = new Exercise();
  exercise.kind = req.body.kind;
  exercise.question = req.body.question;
  exercise.responseList = req.body.responseList;
  exercise.response = req.body.response;
  exercise.save(err => {
    if(err) {
      debug("Error during creating exercise: %s", err.message);
      console.log(err);
      res.status(400).end();
    } else {
      updateSerie(req, res, exercise);
    }
  });
}

function updateSerie(req, res, exercise){
  Serie.findById(req.body.serieId, (err, serie) => {
    if (err) {
      debug("Error during fetching series: %s", err.message);
      res.status(400).end();
    } else {
      serie.exercises.push(exercise);
      serie.save(saveErr => {
        if (saveErr) {
          res.json("error durring update, error is: ", saveErr);
          res.status(500).end();
        } else {
          res.json({serie,exercise}).end();
        }
      });
    }
  });
}
function readOne(req, res) {
  Exercise.findOne({ _id: req.params.id }, (err, exercise) => {
    if (err) {
      debug("finding problem: %s", err.message);
      res.json({});
      res.status(400).end();
    } else {
      res.json(exercise);
      res.status(200).end();
    }
  });
}
function updateOne(req, res) {
  Serie.findById(req.body.serieId, (err, serie) => {
    if (err) {
      console.log("Error during fetching series: %s", err.message);
      res.status(400).end();
    } else{  
    serie.exercises.forEach(element => {
      if (element._id == req.params.id) {
        console.log('yes')
        element.kind = req.body.kind || element.kind;
        element.question = req.body.question || element.question;
        element.responseList = req.body.responseList || element.responseList;
        element.response = req.body.response || element.response;
        serie.save(saveErr => {
          if (saveErr) {
            res.json("error durring update, error is: ", saveErr);
            res.status(500).end();
          } else {
            res.json(serie);
          }
        });
      }
      });
    }
  });
}

function deleteOne(req, res) {
  Exercise.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      debug('Error during deleting Serie: %s', err.message);
      res.status(500).end();
    } else {
      res.status(200).end();
    }
  });
}

module.exports = {
  create,
  readOne,
  updateOne,
  deleteOne,
}
