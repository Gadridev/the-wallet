const fs = require("fs").promises;
const path = require("path");
const filePath = path.join(__dirname, "..", "data", "historique.json");
async function getHistorique() {
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
async function saveHistorique(historique) {
  try {
    await fs.writeFile(filePath, JSON.stringify(historique, null, 2), "utf-8");
  } catch (err) {
    throw err;
  }
}
module.exports = { getHistorique, saveHistorique };
