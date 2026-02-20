const fs = require("fs").promises;
const path = require("path");
const filePath = path.join(__dirname, "..", "data", "wallet.json");
async function getWallet() {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    if (!data || data.trim() === "") {
      return [];
    }
    return JSON.parse(data);
  } catch (err) {
    throw err;
  }
}
async function saveWallet(wallet) {
  try {
    await fs.writeFile(filePath, JSON.stringify(wallet, null, 2), "utf-8");
    console.log(`✓ Successfully saved ${wallet.length} user(s) to ${filePath}`);

  } catch (err) {
    console.error(`error: ${filePath}`, err);
    throw err;
  }
}
module.exports={
    getWallet,
    saveWallet
}
