const database = require('./src/database');
const User = require('./model/user');
const app = require('./src/app');
const http = require('http');

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