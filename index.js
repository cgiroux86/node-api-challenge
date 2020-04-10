const express = require("express");
const app = express();
const projectsRouter = require("./data/routes/projectsRoute");
const actionsRouter = require("./data/routes/actionsRoute");

app.use(express.json());
app.use("/api/projects", projectsRouter);
app.use("/api/actions", actionsRouter);

app.listen(4500, () => {
  console.log("listening on port 4200");
});
