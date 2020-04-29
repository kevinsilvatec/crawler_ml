 const express = require('express');
 const routes = require('./routes');

 const server = express();
 const host = 'http://localhost'
 const port = 3333;
 server.use(express.json()); 

 server.use(routes);

 server.listen(port, () => {
    console.log(`Server is running at ${host}:${port}`)
  })