const mongoose = require("mongoose")
const Serie = require("../models/serie");
const Exercise = require("../models/exercise");

function create(req, res) {
  const serie = new Serie();
  serie.topic = req.body.topic;
  serie.name = req.body.name;
  serie.level = req.body.level;
  serie.description = req.body.description;
  serie.groupId = req.body.groupId;
  serie.creator = req.body.creator;
  serie.exercise = req.body.exercises;
  serie.save(err => {
    if (err) {
      console.log("Error during creating serie: %s", err.message);
      res.status(400).end();
    } else {
      res.json(serie);
    }
  });
}

function readOne(req, res) {
  Serie.findOne({ _id: req.params.id }, (err, serie) => {
    if (err) {
      console.log("finding problem: %s", err.message);
      res.json({});
    } else {
      res.json(serie);
    }
  });
}

function updateOne(req, res) {
  Serie.findById(req.params.id, (err, serie) => {
    if (err) {
      console.log("Error during fetching series: %s", err.message);
      res.status(400).end();
    } else {
      serie.topic = req.body.topic || serie.topic;
      serie.name = req.body.name || serie.name;
      serie.email = req.body.email || serie.email;
      serie.level = req.body.level || serie.level;
      serie.description = req.body.description || serie.description;
      serie.groupId = req.body.groupId || serie.groupId;
      serie.creator = req.body.creator || serie.creator;
      serie.exercise = req.body.exercise || serie.exercise;
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

function list(req, res) {
  Serie.find({}, (err, serie) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200);
      res.json(serie);
    }
  });
}

function readByGroupId(req, res) {
  Serie.findOne({ groupId: req.params.groupId }, (err, serie) => {
    if (err) {
      console.log("finding problem: %s", err.message);
      res.json({});
    } else {
      res.json(serie);
      res.status(200).end();
    }
  });
}

function readByCreatorId(req, res) {
  Serie.find({ creator: req.params.creatorId }, (err, serie) => {
    if (err) {
      console.log("finding problem: %s", err.message);
      res.json({});
    } else {
      res.json(serie);
      res.status(200).end();
    }
  });
}
function deleteOne(id) {
  D.functions('Entering to deleteOne'); ""
  Serie.findById(id, (err, serie) => {
    if (err) {
      res.json(err);
      res.status(500).end();
    } else if (serie) {
      serie.remove((error) => {
        if (error) {
          res.json(err);
          res.status(500).end();
        } else {
          res.json('deleted.');
          res.status(200).end();
        }
      });
    } else {
      res.json('user not found');
      res.status(400).end();
    }
  });
}
module.exports = {
  create,
  readOne,
  updateOne,
  list,
  readByGroupId,
  readByCreatorId,
  deleteOne,
};
