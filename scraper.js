const puppeteer = require('puppeteer');

let scrapeUrl = 'https://www.worldometers.info/coronavirus/#countries';

async function scrapeAllCases() {
    let browser;
    try {
        browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.setViewport({ width: 1920, height: 926 });
        await page.setJavaScriptEnabled(false);
        await page.goto(scrapeUrl);
        await page.waitForSelector('table#main_table_countries');

        const cases = await page.evaluate(() => {
            const rowNodeList = document.querySelectorAll('#main_table_countries tr');
            const rowArray = Array.from(rowNodeList);

            return rowArray.splice(1).map(tr => {
                const dataNodeList = tr.querySelectorAll('td');
                const dataArray = Array.from(dataNodeList);
                const [country, totCases, newCases, totDeaths, newDeath, totRecovered, activeCase, critical, totCasePerMillion] = dataArray.map(td => td.textContent);

                return {
                    country, totCases, newCases, totDeaths, newDeath, totRecovered, activeCase, critical, totCasePerMillion
                };
            })
        });

        await browser.close();
        return cases;
    } 
    catch(err) {
        console.error(err);
        if(browser && browser.close) await browser.close();
        throw err;
    }
}




module.exports.scrapeAllCases = scrapeAllCases;