const express = require("express");
const app = express();
const data = require("./data.json");
const port = 3000;

app.set("view engine", "pug");

app.use("/static", express.static("public"));

/*
------Middlewares-----
*/
app.use((req,res,next)=>{
  if(!data.projects){
    const err = new Error('No data')
    err.status = 500
    console.error(err.message)
    return next(err)
  }
  next()
})

app.use('/project/:id',(req,res,next)=>{
  const regEx = /^[0-4]$/
  if(!regEx.test(req.params.id)){
    const err = new Error('project not found')
    err.status = 404
    return next(err)
  }
  next()
})

/*
-------Routes-------
*/

app.get("/", (req, res) => {
  res.render("index", data);
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/project/:id", (req, res) => {
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

app.use((req,res,next)=>{
  const err = new Error('page not found')
  err.status = 404
  next(err)
})

/*
----Error middleware----
*/
app.use((err,req,res,next)=>{
  res.status(err.status)
  res.render('error', {err})
  console.log(err.message)
  console.log(`status code ${err.status}`)
})

/*
----Port selection and running message
*/
app.listen(port, () => console.log(`application running on port ${port}`));
