const parseBody = require("../bodyParser/parseBody");
const userModel = require("../models/userModel");
const { saveWallet, getWallet } = require("../models/walletModel");

async function createWallet(req, res) {
  try {
    const body = await parseBody(req);

    const { user_id, name } = body;
    console.log(user_id, name);

    if (!user_id || !name) {
      res.writeHead(400);
      return res.end(JSON.stringify({ error: "user_id and name required" }));
    }
    const users = await userModel.getUsers();
    const wallet = await getWallet();

    const userExists = users.find((u) => u.id == user_id);

    if (!userExists) {
      res.writeHead(404);
      return res.end(JSON.stringify({ error: "User does not exist" }));
    }
    const newWallet = {
      id: Date.now(),
      user_id,
      name,
      sold: 0,
    };
    wallet.push(newWallet);
    await saveWallet(wallet);
    res.writeHead(201);
    res.end(JSON.stringify(newWallet));
  } catch (err) {
    res.writeHead(400);
    console.log(err);
    res.end(JSON.stringify({ error: err }));
  }
}
async function deposit(req, res, id) {
  try {
    const body = await parseBody(req);
    const amount = body.amount;

    if (!amount || amount <= 0) {
      res.writeHead(400);
      return res.end(JSON.stringify({ error: "Amount must be positive" }));
    }
    const wallets = await getWallet();
    console.log(wallets);

    const wallet = wallets.find((w) => w.id == id);

    if (!wallet) {
      res.writeHead(404);
      return res.end(JSON.stringify({ error: "Wallet not found" }));
    }

    wallet.sold += amount;
    console.log(wallets);

    await saveWallet(wallets);

    res.writeHead(200);
    res.end(JSON.stringify(wallet));
  } catch (err) {
    console.log(err);
    res.writeHead(500);
    res.end(JSON.stringify({ error: "Server error" }));
  }
}
async function getWallets(req, res) {
  try {
    const wallets = await getWallet();
     res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(wallets));
  } catch (err) {
    console.log(err);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ err: err }));
  }
}
async function withdraw(req, res, id) {
  try {
    const body = await parseBody(req);
    const amount = body.amount;

    if (!amount || amount <= 0) {
         res.writeHead(500, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: "Amount must be positive" }));
    }

    const wallets = await getWallet();
    const wallet = wallets.find((w) => w.id == id);

    if (!wallet) {
      res.writeHead(404);
      return res.end(JSON.stringify({ error: "Wallet not found" }));
    }

    if (wallet.sold < amount) {
      res.writeHead(400);
      return res.end(JSON.stringify({ error: "Insufficient balance" }));
    }
    wallet.sold -= amount;
    await saveWallet(wallets);

    res.writeHead(200);
    res.end(JSON.stringify(wallet));
  } catch (err) {
    res.writeHead(500);
    res.end(JSON.stringify({ error: "Server error" }));
  }
}

module.exports = {
  createWallet,
  deposit,
  withdraw,
  getWallets,
};
