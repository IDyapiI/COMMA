const bcryptjs = require("bcryptjs");
const User = require("../models/user");
const saltRounds = 10;
const salt = bcryptjs.genSaltSync(saltRounds);

function create(req, res) {
  const user = new User();
  user.firstname = req.body.firstname;
  user.lastname = req.body.lastname;
  user.email = req.body.email;
  user.password = bcryptjs.hashSync(req.body.password, salt);
  user.status = req.body.status;
  user.save(err => {
    if (err) {
      debug("Error during creating user: %s", err.message);
      res.status(400).end();
    } else {
      user.password = undefined;
      res.json(user);
      res.status(200).end();
    }
  });
}

function readOne(req, res) {
  User.findOne({ _id: req.params.id }, (err, user) => {
    if (err) {
      debug("finding problem: %s", err.message);
      res.json({});
    } else {
      res.json(user);
      res.status(200).end();
    }
  });
}

function updateOne(req, res) {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      debug("Error during fetching users: %s", err.message);
      res.status(400).end();
    } else {
      user.firstname = req.body.firstname || user.firstname;
      user.lastname = req.body.lastname || user.lastname;
      user.email = req.body.email || user.email;
      user.password = req.body.password || user.password;
      user.status = req.body.status || user.status;
      user.save(saveErr => {
        if (saveErr) {
          res.json("error durring update, error is: ", saveErr);
          res.status(500).end();
        } else {
          res.json(user);
        }
      });
    }
  });
}

function login(req, res) {
  User.find({email: req.body.email}, (err, user) => {
    if (err) {
      debug(`Error finding user email at login: ${err}`);
      res.status(400).end();
    } else if (!user) {
      debug("No match email");
      res.status(401).end();
    } else {
      const hash = user.password;
      const passwordFromFront = req.body.password;
      bcryptjs.compare(passwordFromFront, hash, (error, result) => {
        if (error) {
          debug(`Error: ${error}`);
          res.status(500).end();
        } else if (!result) {
          debug("password don't match");
          res.status(401).end();
        } else {
          user.password = undefined;
          res.json(user);
        }
      });
    }
  });
}

function list(req, res) {
  User.find(err, user => {
    if (err) {
      console.log(err);
    } else {
      res.status(200);
      res.json(user);
    }
  });
}
module.exports = {
  create,
  readOne,
  updateOne,
  login,
  list
};
