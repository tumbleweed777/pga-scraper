const puppeteer = require("puppeteer");
const fs = require("fs/promises");

async function start() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.pga.com/play");

  //   gets all state url paths **/play/<stateAbbreviation>**
  const stateUrlPaths = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("ul li a")).map((x) =>
      x.getAttribute("href")
    );
  });

  let allCityUrlPaths = [];
  let cityUrlPaths;
  let stateAbbreviation;
  for (const path of stateUrlPaths) {
    stateAbbreviation = path.split("/")[2];
    await page.goto("https://www.pga.com" + path);
    cityUrlPaths = await page.evaluate(() => {
      return Array.from(
        document.querySelectorAll(
          "#__next > div > div > div > div > div > ul > li > a"
        )
      ).map((x) => x.getAttribute("href"));
    });

    allCityUrlPaths.push(...cityUrlPaths);
  }

  await fs.writeFile(`allCityUrlPaths.txt`, allCityUrlPaths.join("\r\n"));

  console.log(allCityUrlPaths.length);

  await browser.close();
}

start();
