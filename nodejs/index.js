const puppeteer = require("puppeteer");
const fs = require("fs/promises");
const path = require("path");

async function start() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // await page.goto("https://www.pga.com/play");

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

  // const data = await fs.readFile(
  //   path.join(__dirname, "allCityUrlPaths.txt"),
  //   "utf8"
  // );

  // const allCityUrlPaths = data.split("\r\n");

  // let allGolfCourseUrlPaths = [];
  // let golfCourseUrlPaths;
  // let x = 0;
  // for (const path of allCityUrlPaths) {
  //   if (x > 0) {
  //     await fs.appendFile("allGolfCourseUrlPaths.txt", "\r\n");
  //   }
  //   await page.goto("https://www.pga.com" + path);
  //   golfCourseUrlPaths = await page.evaluate(() => {
  //     return Array.from(
  //       document.querySelectorAll(
  //         "#__next > div > div > div > div > div > div:nth-child(3) > div > div > a"
  //       )
  //     ).map((x) => {
  //       return x.getAttribute("href");
  //     });
  //   });

  //   allGolfCourseUrlPaths.push(...golfCourseUrlPaths);

  //   await fs.appendFile(
  //     "allGolfCourseUrlPaths.txt",
  //     golfCourseUrlPaths.join("\r\n")
  //   );
  //   x++;
  // }

  const data = await fs.readFile(
    path.join(__dirname, "allGolfCourseUrlPaths.txt"),
    "utf8"
  );

  const allGolfCourseUrlPaths = data.split("\r\n");

  paths = allGolfCourseUrlPaths.slice(12994);

  for (const path of paths) {
    await page.goto("https://www.pga.com" + path);

    const courseData = await page.evaluate(() => {
      const courseName = document.querySelector(
        "#__next > div > div > div > div > div > div > div > h4"
      ).textContent;

      const courseLocation = document.querySelector(
        "#__next > div > div > div > div > div > div > div > div > div > a"
      ).textContent;

      const coursePhoneNumber = Array.from(
        document.querySelectorAll(
          "#__next > div > div > div > div > div > div > div > div > div > a"
        )
      ).map((x) => {
        return x.textContent;
      })[1];

      const pgaProfessionals = Array.from(
        document.querySelectorAll(
          "#__next > div > div > div > div > div > div > div > div > a > div > div > h6"
        )
      ).map((x) => {
        return {
          name: x.textContent,
          title: x.nextElementSibling.textContent,
        };
      });

      return {
        courseName,
        courseLocation,
        coursePhoneNumber: coursePhoneNumber ? coursePhoneNumber : "N/A",
        pgaProfessionals,
      };
    });

    const { courseName, courseLocation, coursePhoneNumber, pgaProfessionals } =
      courseData;

    let csvString = `${courseName},${courseLocation},${coursePhoneNumber}`;

    let proString = "";
    if (pgaProfessionals.length > 0) {
      i = 0;
      for (const professional of pgaProfessionals) {
        if (i === pgaProfessionals.length - 1) {
          proString += `${professional.name},${professional.title}`;
        } else {
          proString += `${professional.name},${professional.title}#`;
        }
        i++;
      }
      csvString += `,${proString}`;
    }

    await fs.appendFile("GolfCourseData.txt", `${csvString}\r\n`);
  }

  //   if (pgaProfessionalTitle === "PGA Professionals") {
  //     await fs.appendFile(
  //       "GolfCoursesWithPgaProfessionalsUrlPaths.txt",
  //       `${path}\r\n`
  //     );
  //   }
  // }

  // const data = await fs.readFile(
  //   path.join(__dirname, "GolfCoursesWithPgaProfessionalsUrlPaths.txt"),
  //   "utf8"
  // );

  // const golfCoursesWithPgaProfessionalsUrlPaths = data.split("\r\n");

  // paths = golfCoursesWithPgaProfessionalsUrlPaths.slice(3249);
  // console.log(golfCoursesWithPgaProfessionalsUrlPaths[3249]);

  // for (const path of paths) {
  //   await page.goto("https://www.pga.com" + path);

  //   const pgaProfessionalUrlPaths = await page.evaluate(() => {
  //     return Array.from(
  //       document.querySelectorAll(
  //         "#__next > div > div > div > div > div > div > div > div > a"
  //       )
  //     ).map((x) => x.getAttribute("href"));
  //   });

  //   for (const p of pgaProfessionalUrlPaths) {
  //     await fs.appendFile("PgaProfessionalUrlPaths.txt", `${p}\r\n`);
  //   }
  // }

  // const data = await fs.readFile(
  //   path.join(__dirname, "PgaProfessionalUrlPaths.txt"),
  //   "utf8"
  // );

  // const pgaProfessionalsUrlPaths = data.split("\r\n");

  // paths = golfCoursesWithPgaProfessionalsUrlPaths.slice(3249);
  // console.log();
<<<<<<< HEAD
  // await page.goto("https://directory.pga.org/member/detail/152078714");

  // const contactInfo = await page.evaluate(() => {
  //   return Array.from(
  //     document.querySelectorAll(
  //       "#__next > div > div > div > div > div > ul > li > a"
  //     )
  //   ).map((x) => {
  //     return x.getAttribute("href");
  //   });
  // });
=======
  await page.goto("https://directory.pga.org/member/detail/689184262");

  const contactInfo = await page.evaluate(() => {
    return document.querySelector("h1").textContent;
  });
>>>>>>> afb7db540e48d504a73329aea7275d44ff2ec7ac

  // console.log(contactInfo);

  await browser.close();
}

start();
