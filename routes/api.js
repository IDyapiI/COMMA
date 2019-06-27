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
  .put(serie.updateOne)
  .delete(serie.deleteOne);

router
  .route("/series/groupId/:groupId")
  .get(serie.readByGroupId)

router
  .route("/series/creatorId/:creatorId")
  .get(serie.readByCreatorId)
  
const result = require("./resultController");

router
    .route("/results/")
    .post(result.create);
router
    .route("/results/:id")
    .get(result.readOne)
  .put(result.updateOne);

const group = require("./groupController");

router
    .route("/groups/")
    .post(group.create)
    .get(group.list);

router
    .route("/groups/:id")
    .put(group.updateOne)
    .get(group.readOne)
    .delete(group.deleteOne);


const exercise = require("./exerciseController");

router
    .route("/exercises/")
    .post(exercise.create);

router
    .route("/exercises/:id")
    .put(exercise.updateOne)
    .get(exercise.readOne)
    .delete(exercise.deleteOne);

module.exports = router;
