//imports
const express = require("express");
const router = express.Router();
const actions = require("../helpers/actionModel");
const middleware = require("../utils/middlewear");

//get and post routes for actions route
router
  .route("/")
  .get((req, res) => {
    actions
      .get()
      .then((result) => res.status(200).json(result))
      .catch((err) =>
        res.status(500).json({ message: "server error", error: err })
      );
  })
  .post((req, res) => {
    actions
      .insert(req.body)
      .then((action) => res.status(201).json(action))
      .catch((err) =>
        res.status(500).json({ message: "server error", error: err })
      );
  });

//put and delete for actions route
router
  .route("/:id")
  .get(middleware.letsSeeSomeId, (req, res) => {
    actions
      .get(req.params.id)
      .then((action) => res.status(200).json(action))
      .catch((err) =>
        res.status(500).json({ message: "server errpr", error: err })
      );
  })
  .put(middleware.letsSeeSomeId, (req, res) => {
    actions
      .update(req.params.id, req.body)
      .then((updated) => res.status(201).json(updated))
      .catch((err) =>
        res.status(500).json({ message: "server error", error: err })
      );
  })
  .delete(middleware.letsSeeSomeId, (req, res) => {
    actions.remove(req.params.id).then((deleted) => {
      deleted > 0 &&
        res
          .status(200)
          .json(
            `${deleted} items deleted. Post with id of ${req.params.id} removed`
          );
    });
  });

module.exports = router;
