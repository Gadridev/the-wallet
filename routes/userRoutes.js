const userController = require("../controller/userController");


function userRoutes(req, res) {
  const urlParts = req.url.split("/");
  const id = urlParts[2];
  if (req.method === "POST" && req.url === "/users") {
    return userController.createUser(req, res);
  }
  if (req.method === "GET" && req.url === "/users") {
    return userController.getUsers(req, res);
  }
  if (req.method === "GET" && id) {
    return userController.getUserById(req, res, id);
  }

  if (req.method === "PUT" && id) {
    return userController.updateUser(req, res, id);
  }

  if (req.method === "DELETE" && id) {
    return userController.deleteUser(req, res, id);
  }

  res.writeHead(404);
  res.end(JSON.stringify({ message: "User route not found" }));
}

module.exports = userRoutes;
