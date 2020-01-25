const cors = require('cors');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const fs = require('fs');

const layerPath = '/store/layers/';

// Middleware
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static('/app/public')); // serve frontend from static assets


// to not die, QRadar expects /debug to return something
app.get('/debug', (req, res) => {
    res.send('I live!');
});

// get list of names for all layers on the server
app.get('/layers', (req, res) => {
    if (!fs.existsSync(layerPath)) {
        fs.mkdirSync(layerPath);
    }
    files = fs.readdirSync(layerPath);
    res.send(files);
});

app.get('/layer/:name', (req, res) => {
    layer = req.params.name;
    if (!fs.existsSync(layerPath + layer)) {
        res.sendStatus(404);
    } else {
        res.sendFile(layerPath + layer);
    }
});

app.post('/layer/:name', (req, res) => {
    layer = req.params.name;
    data = new Uint8Array(Buffer.from(JSON.stringify(req.body)));
    fs.writeFile(layerPath + layer, data, (err) => {
        if (err) throw err;
        res.sendStatus(200);
    });
});

app.delete('/layer/:name', (req, res) => {
    layer = req.params.name;
    if (!fs.existsSync(layerPath + layer)) return res.send(200); // return success if file didn't exist in the first place
    fs.unlink(layerPath + layer, (err) => {
        if (err) throw err;
        res.sendStatus(200);
    });
});

http.listen(5000, () => { console.log('listening on *:5000'); });