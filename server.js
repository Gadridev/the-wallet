const http = require("http");
const userRoutes=require("./routes/userRoutes")
const walletRoutes=require("./routes/walletRoutes")
const server = http.createServer((req, res) => {

  if (req.url.startsWith("/users")) {
    return userRoutes(req, res);
  }
  if (req.url.startsWith("/wallets")) {
      console.log("just for testing")
      return walletRoutes(req, res);
  }

  res.writeHead(404);
  res.end(JSON.stringify({ message: "Route Not Found" }));
});

server.listen(8000, () => {
  console.log("Server running on port 8000");
});
