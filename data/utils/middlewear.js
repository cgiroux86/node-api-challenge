//middleware imports
const projects = require("../helpers/projectModel");
const actions = require("../helpers/actionModel");

//checking to see if req.body is in correct format
const bodyCheck = (req, res, next) => {
  !req.body.name && !req.body.description
    ? res
        .status(400)
        .json({ message: "missing required name and description field" })
    : !req.body.name
    ? res.status(400).json({ message: "name is required" })
    : !req.body.description
    ? res.status(400).json({ message: "description is required" })
    : next();
};

//checking to see if a resource with corresponding id exists for specified id
const showMeYourId = (req, res, next) => {
  projects
    .get(req.params.id)
    .then((user) =>
      !user
        ? res
            .status(404)
            .json({ message: "cannot find user with specified id" })
        : next()
    );
};

//checking to see if an id exists for specified action
const letsSeeSomeId = (req, res, next) => {
  actions
    .get(req.params.id)
    .then((result) =>
      result === null
        ? res
            .status(404)
            .json({ error: "unable to find action matching specified id" })
        : next()
    )
    .catch((err) =>
      res.status(500).json({ message: "server error", error: err })
    );
};

//making sure that the data submitted is in correct string format
const typeCheckerProjects = (req, res, next) => {
  typeof req.body.name !== "string"
    ? res.status(400).json({ message: "name must be a string" })
    : typeof req.body.description !== "string"
    ? res.status(400).json({ message: "description must be a string" })
    : next();
};

module.exports = {
  bodyCheck,
  showMeYourId,
  letsSeeSomeId,
  typeCheckerProjects,
};
