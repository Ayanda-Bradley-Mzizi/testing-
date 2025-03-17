const express = require('express');
const app = express();

app.use(express.json()); 

const PORT = 3000;


let books = [];


app.get('/whoami', (req, res) => {
    res.json({ studentNumber: "12345678" });
});


app.get('/books', (req, res) => {
    res.json(books);
});


app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === req.params.id);
    if (!book) {
        return res.status(404).json({ error: "Book not found" });
    }
    res.json(book);
});


app.post('/books', (req, res) => {
    const { id, title, details } = req.body;
    if (!id || !title || !details) {
        return res.status(400).json({ error: "Missing required book details" });
    }
    books.push({ id, title, details });
    res.status(201).json({ message: "Book added successfully" });
});


app.put('/books/:id', (req, res) => {
    const book = books.find(b => b.id === req.params.id);
    if (!book) {
        return res.status(404).json({ error: "Book not found" });
    }
    const { title, details } = req.body;
    if (title) book.title = title;
    if (details) book.details = details;
    res.json({ message: "Book updated successfully" });
});


app.delete('/books/:id', (req, res) => {
    books = books.filter(b => b.id !== req.params.id);
    res.json({ message: "Book deleted successfully" });
});


app.post('/books/:id/details', (req, res) => {
    const book = books.find(b => b.id === req.params.id);
    if (!book) {
        return res.status(404).json({ error: "Book not found" });
    }
    const { id, author, genre, publicationYear } = req.body;
    if (!id || !author || !genre || !publicationYear) {
        return res.status(400).json({ error: "Missing detail fields" });
    }
    book.details.push({ id, author, genre, publicationYear });
    res.status(201).json({ message: "Detail added successfully" });
});


app.delete('/books/:id/details/:detailId', (req, res) => {
    const book = books.find(b => b.id === req.params.id);
    if (!book) {
        return res.status(404).json({ error: "Book not found" });
    }
    book.details = book.details.filter(d => d.id !== req.params.detailId);
    res.json({ message: "Detail removed successfully" });
});


app.listen(3000, () => {
    console.log(`Server is running on port ${3000}`);
});
