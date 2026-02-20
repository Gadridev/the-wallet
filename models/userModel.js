const fs = require("fs").promises;
const path = require("path");

//../walet/data/users.json
const filePath = path.join(__dirname, "..", "data", "users.json");
console.log("Users file path:", filePath);
async function getUsers() {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    // Handle empty file
    if (!data || data.trim() === '') {
      return [];
    }
    return JSON.parse(data);
  } catch (err) {
    throw err;
  }
}

async function saveUsers(users) {
  try {
    await fs.writeFile(filePath, JSON.stringify(users, null, 2), "utf-8");
    console.log(`✓ Successfully saved ${users.length} user(s) to ${filePath}`);
  } catch (err) {
    console.error(`✗ Error saving users to ${filePath}:`, err);
    throw err;
  }
}

module.exports = {
  getUsers,
  saveUsers
};
