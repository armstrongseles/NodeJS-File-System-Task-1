// index.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const FOLDER_PATH = path.join(__dirname, 'files');

// Ensure the folder exists
if (!fs.existsSync(FOLDER_PATH)) {
    fs.mkdirSync(FOLDER_PATH);
}

// Endpoint to create a text file with the current timestamp
app.get('/create-file', (req, res) => {
    const currentDate = new Date();
    const fileName = `${currentDate.toISOString().replace(/[:.]/g, '-')}.txt`;
    const filePath = path.join(FOLDER_PATH, fileName);
    const content = currentDate.toISOString();

    fs.writeFile(filePath, content, (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.send(`File created: ${fileName}`);
    });
});

// Endpoint to retrieve all text files in the folder
app.get('/get-files', (req, res) => {
    fs.readdir(FOLDER_PATH, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.send(files.filter(file => file.endsWith('.txt')));
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
