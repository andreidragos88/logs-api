const path = require('path');
const express = require('express');
const app = express();
const fs = require('fs');
const csv = require('csv-parser');
const logsRoutes = require('./routes/logs');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use((req, res, next) => {
    let filePath = path.join(__dirname, 'logs.csv');

    try {
        req.db = [];

        fs.createReadStream('logs.csv')
            .pipe(csv())
            .on('data', (row) => {
                req.db.push(row);
            })
            .on('end', () => {
                next();
            });
        
        
    } catch (err) {
        err.statusCode = 500;
        throw err;
    }
});

app.use('/', logsRoutes);

app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({
        message: message,
        data:data
    })
})

const server = app.listen(8080);

module.exports = server;