/********************************************************************************
 *  WEB322 – Assignment 02
 *
 *  I declare that this assignment is my own work in accordance with Seneca's
 *  Academic Integrity Policy:
 *
 *  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
 *
 *  Name: Jay Hsia Student ID: 112935242 Date: 2025-11-04
 *
 *  Published URL: https://web322-assignment.jayhsia.com/
 *
 ********************************************************************************/

const express = require("express");
const path = require("path");
const projectData = require("./modules/projects");

const app = express();
const PORT = process.env.PORT || 8080;

// view engine & static assets
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (req, res) => {
  let projects = await projectData.getAllProjects();
  projects = projects.slice(0, 3);
  const sectors = await projectData.getSectors();
  res.render("home", { projects, sectors });
});

app.get("/about", async (req, res) => {
  const sectors = await projectData.getSectors();
  res.render("about", { sectors });
});

app.get("/solutions/projects", async (req, res) => {
  const sectors = await projectData.getSectors();
  try {
    if (req.query && req.query.sector) {
      const projects = await projectData.getProjectsBySector(req.query.sector);
      if (projects.length > 0) {
        return res.render("projects", { projects, sectors });
      }
      return res.status(404).render("404", { message: `No projects found for sector: ${req.query.sector}`, sectors });
    } else {
      const projects = await projectData.getAllProjects();
      return res.render("projects", { projects, sectors });
    }
  } catch (err) {
    res.status(404).render("404", { message: String(err), sectors });
  }
});

app.get("/solutions/projects/id-demo", async (req, res) => {
  try {
    const proj = await projectData.getProjectById(9);
    res.json(proj);
  } catch (err) {
    res.status(404).send(String(err));
  }
});

app.get("/solutions/projects/sector-demo", async (req, res) => {
  const sectors = await projectData.getSectors();
  try {
    const projs = await projectData.getProjectsBySector("agriculture");
    res.json(projs);
  } catch (err) {
    res.status(404).send(String(err), sectors);
  }
});

app.get("/solutions/projects/:id", async (req, res) => {
  const sectors = await projectData.getSectors();
  try {
    const project = await projectData.getProjectById(req.params.id);
    return res.render("project", { project, sectors });
  } catch (err) {
    return res.status(404).render("404", { message: String(err), sectors });
  }
});

projectData
  .initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server listening on: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to initialize projects:", err);
  });

app.use(async (req, res) => {
  const sectors = await projectData.getSectors();
  res.status(404).render("404", { message: "I'm sorry, we're unable to find what you're looking for.", sectors });
});
