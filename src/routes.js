const express = require('express');
 
const routes = express.Router();

routes.get("/", (req, res) => {
    return res.json({message: "This Api is working!"});
});

module.exports = routes;