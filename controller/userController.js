const parseBody = require("../bodyParser/parseBody");
const userModel = require("../models/userModel");

async function createUser(req, res) {
  try {
    const body = await parseBody(req);   
    if (!body.name) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: "Name is required" }));
    }
    const users = await userModel.getUsers();
    console.log(`Current users count: ${users.length}`);
    const newUser = {
      id: Date.now(),
      name: body.name
    };
    console.log(users)
    users.push(newUser); 
    console.log(`Adding user:`, newUser);
    await userModel.saveUsers(users);
    console.log(`User saved successfully. Total users: ${users.length}`);

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(newUser));
  } catch (err) {
    console.error("Error creating user:", err);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Server error", details: err.message }));
  }
}

async function getUsers(req, res) {
  try {
    const users = await userModel.getUsers();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
  } catch (err) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Server error" }));
  }
}
async function getUserById(req, res, id) {
  try {
    const users = await userModel.getUsers();
    const user = users.find((u) => u.id == id);
    if (!user) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: "User not found" }));
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(user));
  } catch (err) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Server error" }));
  }
}
async function updateUser(req, res, id) {
  try {
    const users = await userModel.getUsers();
    const user = users.find((u) => u.id == id);
    
    if (!user) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: "User not found" }));
    }

    const body = await parseBody(req);

    if (!body.name) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: "Name is required" }));
    }

    user.name = body.name;
    await userModel.saveUsers(users);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(user));
  } catch (err) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: err.message || "Bad request" }));
  }
}
async function deleteUser(req, res, id) {
  try {
    const users = await userModel.getUsers();
    const index = users.findIndex((u) => u.id == id);

    if (index === -1) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: "User not found" }));
    }

    users.splice(index, 1);
    await userModel.saveUsers(users);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "User deleted" }));
  } catch (err) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Server error" }));
  }
}

module.exports = {
  getUserById,
  updateUser,
  getUsers,
  deleteUser,
  createUser,
};
