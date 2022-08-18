const puppeteer = require("puppeteer");
const fs = require("fs/promises");
const path = require("path");

async function start() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.pga.com/play");

  // //   gets all state url paths **/play/<stateAbbreviation>**
  // const stateUrlPaths = await page.evaluate(() => {
  //   return Array.from(document.querySelectorAll("ul li a")).map((x) =>
  //     x.getAttribute("href")
  //   );
  // });

  // let allCityUrlPaths = [];
  // let cityUrlPaths;
  // let stateAbbreviation;
  // for (const path of stateUrlPaths) {
  //   stateAbbreviation = path.split("/")[2];
  //   await page.goto("https://www.pga.com" + path);
  //   cityUrlPaths = await page.evaluate(() => {
  //     return Array.from(
  //       document.querySelectorAll(
  //         "#__next > div > div > div > div > div > ul > li > a"
  //       )
  //     ).map((x) => x.getAttribute("href"));
  //   });

  //   allCityUrlPaths.push(...cityUrlPaths);
  // }

  // // await fs.writeFile(`allCityUrlPaths.txt`, allCityUrlPaths.join("\r\n"));

  const data = await fs.readFile(
    path.join(__dirname, "allCityUrlPaths.txt"),
    "utf8"
  );

  const allCityUrlPaths = data.split("\r\n");

  let allGolfCourseUrlPaths = [];
  let golfCourseUrlPaths;
  let x = 0;
  for (const path of allCityUrlPaths) {
    if (x > 0) {
      await fs.appendFile("allGolfCourseUrlPaths.txt", "\r\n");
    }
    await page.goto("https://www.pga.com" + path);
    golfCourseUrlPaths = await page.evaluate(() => {
      return Array.from(
        document.querySelectorAll(
          "#__next > div > div > div > div > div > div:nth-child(3) > div > div > a"
        )
      ).map((x) => {
        return x.getAttribute("href");
      });
    });

    allGolfCourseUrlPaths.push(...golfCourseUrlPaths);

    await fs.appendFile(
      "allGolfCourseUrlPaths.txt",
      golfCourseUrlPaths.join("\r\n")
    );
    x++;
  }

  await browser.close();
}

start();
