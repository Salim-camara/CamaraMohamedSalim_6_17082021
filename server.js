const http = require ('http');

// impotation du fichier app.js
const app = require('./app');

// indication du port utilisé par app.js
app.set('port', process.env.PORT || 3000);
const server = http.createServer(app);

server.listen(process.env.PORT || 3000);
