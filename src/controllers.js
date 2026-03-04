import knex from "./db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const loginUser = async (req, res) => {
  try {
    const { user_id, email, password, role } = req.body;
    if (!user_id || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await knex("user").where({ user_id, email, role }).first();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = jwt.sign(
      { user_id: user.user_id, role: user.role },
      "SECRET_KEY",
      { expiresIn: "1d" },
    );
    res.status(200).json({
      message: "Login successful",
      token,
      user,
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const createUser = async (req, res) => {
  try {
    const {
      full_name,
      email,
      role,
      mobile_no,
      profile_picture,
      created_by,
      password,
    } = req.body;
    if (!full_name || !role || !mobile_no) {
      return res.status(400).json({
        message: "full_name, role, and mobile_no are required",
      });
    }
    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

    const [newUser] = await knex("user")
      .insert({
        full_name,
        email,
        role,
        mobile_no,
        profile_picture: profile_picture || null,
        created_by: created_by || null,
        password: hashedPassword,
      })
      .returning("*");

    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Create User Error:", error);
    if (error.code === "23505") {
      return res.status(400).json({ message: "Email already exists" });
    }
    res.status(500).json({ message: "Server error" });
  }
};

export const createProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Project name is required" });
    }

    // Use a default created_by UUID for testing (replace with real user_id later)
    const created_by = "00000000-0000-0000-0000-000000000001";

    const [project] = await knex("projects")
      .insert({
        name,
        description: description || null,
        created_by,
        updated_by: created_by,
      })
      .returning("*"); 

    res.status(201).json({ message: "Project created successfully", project });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const { project_id, status } = req.query;
    let query = knex("tasks").select("*");
    if (project_id) {
      query = query.where("project_id", project_id);
    }
    if (status) {
      query = query.where("status", status);
    }
    const tasks = await query.orderBy("created_at", "desc");
    res.status(200).json({
      message: "Task list fetched successfully",
      tasks,
    });
  } catch (error) {
    console.error("Get Tasks Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getProjects = async (req, res) => {
  try {
    const { status } = req.query;
    let query = knex("projects").select("*");
    if (status) {
      query = query.where("status", status);
    }
    const projects = await query.orderBy("created_at", "desc");
    res.status(200).json({
      message: "Projects list fetched successfully",
      projects,
    });
  } catch (error) {
    console.error("Get Projects Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUser = async (req, res) => {
  try {
    const { role, user_id } = req.query;
    let query = knex("user").select("*");
    if (user_id) {
      query = query.where("user_id", user_id);
    }
    const user = await query.orderBy("created_at", "desc");
    res.status(200).json({
      message: "User list fetched successfully",
      user,
    });
  } catch (error) {
    console.error("Get User Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
