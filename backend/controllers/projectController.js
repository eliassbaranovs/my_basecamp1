const Project = require("../models/Project");

// Create a project
exports.createProject = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newProject = new Project({
      name,
      description,
      owner: req.session.userId, // Associate the project with the logged-in user
    });
    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to create project" });
  }
};

// Get all projects for a logged-in user
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.session.userId });
    res.status(200).json(projects);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to retrieve projects" });
  }
};

// Update a project
exports.updateProject = async (req, res) => {
  try {
    const { name, description } = req.body;
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    if (
      project.owner.toString() !== req.session.userId &&
      req.session.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ error: "You are not authorized to update this project" });
    }

    project.name = name || project.name;
    project.description = description || project.description;
    await project.save();

    res.status(200).json({ message: "Project updated successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to update project" });
  }
};

// Delete a project
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    if (
      project.owner.toString() !== req.session.userId &&
      req.session.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this project" });
    }

    await Project.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to delete project" });
  }
};
