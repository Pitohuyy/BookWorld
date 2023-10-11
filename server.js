const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, 'Public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Public', 'home.html'));
});

app.get('/api/books', (req, res) => {
    const booksData = require('./Public/db/book.json');
    res.json(booksData);
});

app.get('/api/users', (req, res) => {
    const usersData = require('./Public/db/user.json');
    res.json(usersData);
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
