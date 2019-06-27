const Group = require("../models/group");

function create(req, res) {
  const group = new Group();
  group.level = req.body.level;
  group.name = req.body.name;
  group.save(err => {
    if (err) {
      console.log("Error during creating group: %s", err.message);
      res.status(400).end();
    } else {
      res.json(group);
    }
  });
}

function readOne(req, res) {
  Group.findOne({ _id: req.params.id }, (err, group) => {
    if (err) {
      console.log("finding problem: %s", err.message);
      res.json({});
    } else {
      res.json(group);
    }
  });
}

function updateOne(req, res) {
  Group.findById(req.params.id, (err, group) => {
    if (err) {
      console.log("Error during fetching groups: %s", err.message);
      res.status(400).end();
    } else {
      group.topic = req.body.topic || group.topic;
      group.name = req.body.name || group.name;
      group.save(saveErr => {
        if (saveErr) {
          res.json("error durring update, error is: ", saveErr);
          res.status(500).end();
        } else {
          res.json(group);
        }
      });
    }
  });
}

function list(req, res) {
  Group.find({}, (err, group) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200);
      res.json(group);
    }
  });
}

function deleteOne(req, res) {
  Group.findById(req.params.id, (err, group) => {
    if (err) {
      debug("Error during fetching group: %s", err.message);
      res.status(400).end();
    } else {
      group.remove(saveErr => {
        if (saveErr) {
          res.json("error during delete, error is: ", saveErr);
          res.status(500).end();
        } else {
          res.json(group);
          res.status(200).end();
        }
      });
    }
  });
}
module.exports = {
  create,
  readOne,
  updateOne,
  list,
  deleteOne
};
