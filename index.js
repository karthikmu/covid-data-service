
const express = require('express');
const scraper = require('./scraper');
const app = express();

/**
 * Fetch all the global cases 
 */
app.get('/case/all', async (req, res, next) => {
    try {
        let data = await scraper.scrapeAllCases();
        res.json(data);
    }
    catch(err) {
        next(err);
    }
});


app.listen(process.env.PORT || 3000, ()=>console.log("listening..."));

