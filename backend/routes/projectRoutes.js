const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");
const { isAuthenticated } = require("../controllers/userController");

// Create a new project
router.post("/", isAuthenticated, projectController.createProject);

// Get all projects for the logged-in user
router.get("/", isAuthenticated, projectController.getProjects);

// Update a project (only owner or admin)
router.put("/:id", isAuthenticated, projectController.updateProject);

// Delete a project (only owner or admin)
router.delete("/:id", isAuthenticated, projectController.deleteProject);

module.exports = router;
