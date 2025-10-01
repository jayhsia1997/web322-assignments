const projectData = require("../data/projectData.json");
const sectorData = require("../data/sectorData.json");

let projects = [];

function initialize() {
  return new Promise((resolve, reject) => {
    try {
      projects = [];
      projectData.forEach((proj) => {
        const sector = sectorData.find((s) => s.id === proj.sector_id);
        const sectorName = sector ? sector.sector_name : null;
        projects.push({ ...proj, sector: sectorName });
      });
      resolve();
    } catch (err) {
      reject("unable to initialize projects");
    }
  });
}

function getAllProjects() {
  return new Promise((resolve, reject) => {
    try {
      resolve(projects);
    } catch (err) {
      reject("unable to get projects");
    }
  });
}

function getProjectById(projectId) {
  return new Promise((resolve, reject) => {
    const idNum = Number(projectId);
    const proj = projects.find((p) => p.id === idNum);
    if (proj) {
      resolve(proj);
    } else {
      reject("unable to find requested project");
    }
  });
}

function getProjectsBySector(sector) {
  return new Promise((resolve, reject) => {
    const query = String(sector || "")
      .toLowerCase()
      .trim();
    const result = projects.filter((p) =>
      String(p.sector || "")
        .toLowerCase()
        .includes(query)
    );
    if (result && result.length > 0) {
      resolve(result);
    } else {
      reject("unable to find requested projects");
    }
  });
}

module.exports = { initialize, getAllProjects, getProjectById, getProjectsBySector };
