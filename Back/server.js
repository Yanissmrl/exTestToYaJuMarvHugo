const http = require('http');
const express = require('express');
const models = require('./models');
require('dotenv').config();

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});


models.sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch(error => {
    console.error('Unable to connect to the database:', error);
});
models.sequelize.sync().then(() => {
    console.log('Database sync');
}).catch((error) => {
    console.log(error, 'Database sync failed');
});



let httpsServer = null;

if (process.env.NODE_ENV === "production") {
    // Redirect http to https in production
    httpsServer = https.createServer(
        {
            // certbot certificates
            key: fs.readFileSync(process.env.PRIVKEY),
            cert: fs.readFileSync(process.env.CERT),
            ca: fs.readFileSync(process.env.CHAIN),
        },
        app
    );
} else {
    // In development, use http
    httpsServer = http.createServer(app);
}

const port = 4040;
app.set('port', port);
httpsServer.listen(port);

httpsServer.on('listening', () => {
    console.log(`Server web lancé à l'adresse : http://localhost:${port}`);
});

httpsServer.on('error', e => {
    if (e.code === 'EADDRINUSE') {
        console.log(`Error : address http://localhost:${port} already in use`);
        process.exit();
    }
});