const puppeteer = require('puppeteer');

async function scrapeSpiele() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  try {
    await page.goto('https://www.flashscore.de/', { waitUntil: 'networkidle2' });
    await page.waitForSelector('.event__match', { timeout: 15000 });
    await autoScroll(page);

    const spiele = await page.evaluate(() => {
      const rawHtmlList = [];
      const alleElemente = Array.from(document.querySelectorAll('.sportName > div'));

      alleElemente.forEach(el => {
        if (el.classList.contains('event__match')) {
          rawHtmlList.push(el.innerHTML);
        }
      });

      return rawHtmlList;
    });

    console.log("🔍 HTML-Ausgabe von .event__match:");
    spiele.forEach((html, i) => {
      console.log(`\n=== SPIEL ${i + 1} ===`);
      console.log(html);
    });

    await browser.close();
    return [];
  } catch (error) {
    console.error('❌ Fehler beim Scrapen:', error);
    await browser.close();
    return [];
  }
}

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise(resolve => {
      let totalHeight = 0;
      const distance = 400;
      const timer = setInterval(() => {
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= document.body.scrollHeight - 300) {
          clearInterval(timer);
          resolve();
        }
      }, 250);
    });
  });
}

module.exports = { scrapeSpiele };
