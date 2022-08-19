const fs = require("fs/promises");
const path = require("path");

async function createPaths() {
  const data = await fs.readFile(
    path.join(__dirname, "allGolfCourseUrlPaths.txt"),
    "utf8"
  );

  const allGolfCourseUrlPaths = data.split("\r\n");

  for (const path of allGolfCourseUrlPaths) {
    const fullPath = `https://www.pga.com${path}`;

    await fs.appendFile("AllGolfCourseFullUrlPaths.txt", `${fullPath}\r\n`);
  }
}

createPaths();
