const wallet = require("../controller/walletController");

function walletRoutes(req, res) {
  const parts = req.url.split("/");
  const id = parts[2];
  const action = parts[3];
  if (req.method === "POST" && req.url === "/wallets") {
    return wallet.createWallet(req, res);
  }
   if (req.method === "GET" && req.url === "/wallets") {
    return wallet.getWallets(req,res);
  }
  if (req.method === "POST" && action === "deposit") {
    return wallet.deposit(req, res, id);
  }
  if (req.method === "POST" && action === "withdraw" && id) {
    console.log("testing")
    return wallet.withdraw(req, res, id);
  }
  res.writeHead(404);
  res.end(JSON.stringify({ message: "Wallet route not found" }));
}

module.exports = walletRoutes;
