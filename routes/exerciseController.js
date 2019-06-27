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
  Serie.findOne(req.body.serieId, (err, exercise) => {
    if (err) {
      debug("Error during fetching series: %s", err.message);
      res.status(400).end();
    } else {
      exercise.kind = req.body.kind || exercise.kind;
      exercise.question = req.body.question || exercise.question;
      exercise.responseList = req.body.responseList || exercise.responseList;
      exercise.response = req.body.response || exercise.response;
      exercise.save(saveErr => {
        if (saveErr) {
          res.json("error during update, error is: ", saveErr);
          res.status(500).end();
        } else {
          updateSerie(req, res, exercise);
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
