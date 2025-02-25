const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.static(__dirname));
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'data', 'data.json');

app.post('/save', (req, res) => {
    const data = req.body;
    fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf8', (err) => {
        if (err) {
            console.error('Errore nel salvataggio dei dati:', err);
            res.status(500).send('Errore nel salvataggio dei dati');
        } else {
            res.send('Dati salvati con successo');
        }
    });
});

app.get('/load', (req, res) => {
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) {
            console.error('Errore nel caricamento dei dati:', err);
            res.status(500).send('Errore nel caricamento dei dati');
        } else {
            res.json(JSON.parse(data));
        }
    });
});

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
    console.log(`Server in ascolto su http://localhost:${port}`);
});