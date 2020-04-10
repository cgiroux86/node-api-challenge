//imports
const express = require("express");
const router = express.Router();
const projects = require("../helpers/projectModel");
const middleware = require("../utils/middlewear");

//route for getting all projects and posting a new project
router
  .route("/")
  .get((req, res) => {
    projects
      .get()
      .then((all) => res.status(200).json(all))
      .catch((err) => res.status(500).json({ error: err }));
  })
  .post(middleware.bodyCheck, middleware.typeCheckerProjects, (req, res) => {
    projects
      .insert(req.body)
      .then((proj) => res.status(201).json(proj))
      .catch((err) => res.status(500).json({ error: err }));
  });

//route for getting project by id, making a put on an id, and deleting an id
router
  .route("/:id")
  .get(middleware.showMeYourId, (req, res) => {
    projects
      .get(req.params.id)
      .then((project) => res.status(200).json(project))
      .catch((err) =>
        res.status(500).json({ message: "server error", error: err })
      );
  })
  .put(middleware.showMeYourId, (req, res) => {
    projects
      .update(req.params.id, req.body)
      .then((updated) => res.status(201).json(updated))
      .catch((err) => res.status(500).json({ error: err }));
  })
  .delete(middleware.showMeYourId, (req, res) => {
    projects
      .remove(req.params.id)
      .then((deleted) => {
        deleted > 0 &&
          res
            .status(200)
            .json(
              `${deleted} items deleted. Post with id of ${req.params.id} removed`
            );
      })
      .catch((err) =>
        res.status(500).json({ message: "server error", error: err })
      );
  });

//route for getting actions of a specified project id
router.get("/:id/actions", middleware.letsSeeSomeId, (req, res) => {
  projects
    .getProjectActions(req.params.id)
    .then((actions) => res.status(200).json(actions))
    .catch((err) => console.log(err));
});

module.exports = router;
