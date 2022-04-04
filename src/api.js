const router = require('express').Router();
const books = require('./books_dumb.js');

let booksDir = books;

router.get('/books', function (req, res) {
    res.send(booksDir);
});
router.get('/books/:id', function (req, res) {
    const { id } = req.params;
    const book = booksDirectory.find(b => b.isbn === id);
    if (!book) return res.status(404).send('Book does not exist');

    res.send(book);
});
router.post('/books', function (req, res) {
    const {
        title,
        isbn,
        pageCount,
        publishedDate,
        thumbnailUrl,
        shortDescription,
        longDescription,
        status,
        authors,
        categories
    } = req.body;

    const bookExist = bookDir.find(b => b.isbn === isbn);
    if (bookExist) return res.send('Book already exists');

    const book = {
        isbn,
        pageCount,
        publishedDate,
        thumbnailUrl,
        shortDescription,
        longDescription,
        status,
        authors,
        categories
    };
    bookDir.push(book);
    res.send(book);

});
router.put('/books/:id', function (req, res) {
    const { id } = req.params;
    const{ 
        isbn,
        pageCount,
        publishedDate,
        thumbnailUrl,
        shortDescription,
        longDescription,
        status,
        authors,
        categories
    }=req.body;

    const book = bookDir.find(b => b.isbn === bn);
    if(!book) return res.send('Book does not exist');
    const updateField = (val, prev) => !val ? prev : val;
    const updatedBook = {
        ...book,
        title: updateField(title, book.title),
        isbn: updateField(isbn, book.isbn),
        pageCount: updateField(pageCount, book.pageCount),
        publishedDate: updateField(publishedDate, book.publishedDate),
        thumbnailUrl: updateField(thumbnailUrl, book.thumbnailUrl),
        shortDescription: updateField(shortDescription, book.shortDescription),
        longDescription: updateField(longDescription, book.longDescription),
        status: updateField(status, book.status),
        authors: updateField(authors, book.authors),
        categories: updateField(categories, book.categories),
    };

    const bookIndex = booksDirectory.findIndex(b => b.isbn === book.isbn);
    booksDirectory.splice(bookIndex, 1, updatedBook);

    res.status(200).send(updatedBook);
});

router.delete('/books/:id', function (req, res) {
    const { id } = req.params;

    let book = booksDirectory.find(b => b.isbn === id);
    if (!book) return res.status(404).send('Book does not exist');

    booksDirectory = booksDirectory.filter(b => b.isbn !== id);

    res.send('Success');

});


module.exports = router;
