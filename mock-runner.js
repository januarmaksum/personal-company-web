/* eslint-disable @typescript-eslint/no-require-imports */
const jsonServer = require("json-server");
const fs = require("fs");
const path = require("path");

const server = jsonServer.create();

// Gabungkan semua file mock JSON
const mocksDir = path.join(__dirname, "mocks");
let db = { pages: [] };

fs.readdirSync(mocksDir).forEach((file) => {
  if (file.endsWith(".json")) {
    try {
      const data = JSON.parse(
        fs.readFileSync(path.join(mocksDir, file), "utf8"),
      );
      if (data.pages && Array.isArray(data.pages)) {
        db.pages = [...db.pages, ...data.pages];
      }
    } catch (err) {
      console.error(`Error reading ${file}:`, err);
    }
  }
});

// JSON Server merender database in-memory jika dilempar object,
// sehingga Save Editor berhasil (meski tidak tertulis permanen ke file mock secara disk)
const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

server.listen(3001, () => {
  console.log("JSON Server is running on port 3001 with merged tenant data");
  console.log("Total mocked pages:", db.pages.length);
});
