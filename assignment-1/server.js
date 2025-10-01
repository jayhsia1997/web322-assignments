/********************************************************************************
 *  WEB322 – Assignment 01
 *
 *  I declare that this assignment is my own work in accordance with Seneca's
 *  Academic Integrity Policy:
 *
 *  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
 *
 *  Name: Jay Hsia Student ID: 112935242 Date: 2025-10-01
 *
 ********************************************************************************/

const express = require("express");
const projectData = require("./modules/projects");

const app = express();
const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Assignment 1: Jay Hsia - 112935242");
});

app.get("/solutions/projects", async (req, res) => {
  try {
    const all = await projectData.getAllProjects();
    res.json(all);
  } catch (err) {
    res.status(500).send(String(err));
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
  try {
    const projs = await projectData.getProjectsBySector("agriculture");
    res.json(projs);
  } catch (err) {
    res.status(404).send(String(err));
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
