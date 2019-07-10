const express = require("express");
const app = express();
const data = require("./data.json");
const port = 3000;

app.set("view engine", "pug");

app.use("/static", express.static("public"));

app.get("/", (req, res) => {
  res.render("index", data);
});

app.get("/about", (req, res) => {
  res.render("about");
});

//project route: id is optional. If not present, route will be redirected to project/1
app.get("/project/:id?", (req, res) => {
  if (!req.params.id) {
    return res.redirect("/project/1");
  }
  const { id } = req.params;
  const project = data.projects[id];
  const projectData = {
    project_name: project.project_name,
    description: project.description,
    technologies: project.technologies,
    live_link: project.live_link,
    github_link: project.github_link,
    image_urls: project.image_urls
  };
  res.render("project", projectData);
});

app.listen(port, () => console.log(`application running on port ${port}`));
