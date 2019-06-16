const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({
    status: "OK"
  });
});

const user = require("./userController");

router
  .route("/users/")
  .post(user.create)
  .get(user.list);
router
  .route("/users/:id")
  .get(user.readOne)
  .put(user.updateOne);
router.route("/login").post(user.login);

const serie = require("./serieController");

router
  .route("/series/")
  .post(serie.create)
  .get(serie.list);
router
  .route("/series/:id")
  .get(serie.readOne)
  .put(serie.updateOne);
module.exports = router;
