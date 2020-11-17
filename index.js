// This will be our application entry. We'll setup our server here.
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
const http = require('http');
const app = require('./config/app'); // The express app we just created
console.log(process.env.NODE_ENV);

const port = +(process.env.PORT) || 8000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});