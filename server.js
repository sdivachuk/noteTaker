// pulls in depedencies 
const express = require('express');
const path = require('path');
const fs = require('fs');

//sets up port in Heroku or use 3001
const PORT = process.env.PORT || 3001;

//pulls in express app
const app = express();

// pulls public folder
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// pulls routes for notes.html and index.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})
//creates new notes
function createNote(body, currentNotes) {
    const newNote = body;
    if (!Array.isArray(currentNotes))
        currentNotes = [];
    
    if (currentNotes.length === 0)
        currentNotes.push(0);

    body.id = currentNotes[0];
    currentNotes[0]++;

    currentNotes.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(currentNotes, null, 2)
    );
    return newNote;
}

app.post('/api/notes', (req, res) => {
    const newNote = createNote(req.body, './db/db.json');
    res.json(newNote);
});

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);