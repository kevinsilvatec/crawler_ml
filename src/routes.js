const express = require('express');
const CrawlerController = require('./Controller/CrawlerController');
 
const routes = express.Router();

routes.get("/", (req, res) => {
    return res.json({message: "This API is working!"});
});

routes.post('/search', CrawlerController.search);

module.exports = routes;