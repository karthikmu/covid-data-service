
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


let server = app.listen(process.env.PORT || 8080, '0.0.0.0', ()=> {
    let host = server.address().address;
    let port = server.address().port;
    console.log('app listening at http://%s:%s', host, port);
});

