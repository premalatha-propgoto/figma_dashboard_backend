import express from "express";
import { loginUser, createUser, createProject, getTasks, getProjects, getUser, createTask} from "./controllers.js";

const router = express.Router();
router.post("/login", loginUser);
router.post("/create_user", createUser);
router.post("/create_projects", createProject);
router.post("/create_tasks", createTask);
router.post("/task_list", getTasks);
router.post("/project_list", getProjects);
router.post("/user_list", getUser);
export default router;