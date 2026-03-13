import knex from "./db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if ( !email || !password ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await knex("users").where({ email, role }).first();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.password && !user.password.startsWith('$2')) {
      const hashed = await bcrypt.hash(user.password, 10);
      await knex('users').where({ user_id: user.user_id }).update({ password: hashed });
      user.password = hashed;
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
      user_id: user.user_id,
      role: user.role,
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

    const [newUser] = await knex("users")
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
    const { name, description, created_by } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Project name is required" });
    }

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

export const createTask = async (req, res) => {
try{
  const { title, description, start_time, end_time,url} = req.body;
  if (!title) {
    return res.status(400).json({ message: "Title isrequired" });
  }
  const [task] = await knex("tasks")
    .insert({
      title,
      description: description || null,
      start_time: start_time || null,
      end_time: end_time || null,
      url: url || null,
    })
    .returning("*");
  res.status(201).json({ message: "Task created successfully", task });
} catch (error) {
  console.error("Create Task Error:", error);
  res.status(500).json({ message: "Server error" });
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
    const { role, user_id } = req.body;   

    let query = knex("users").select("*");

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