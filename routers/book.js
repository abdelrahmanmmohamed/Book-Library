const express = require('express');
const Controllers = require('../controllers/book');
const authMiddleware = require('../midlewares/auth');
const router = express.Router();

router.get("/api/books",authMiddleware, Controllers.getAllBooks);
router.get("/api/books/:id",authMiddleware, Controllers.getBook);
router.post("/api/books",authMiddleware, Controllers.addBook);
router.put("/api/books/:id",authMiddleware, Controllers.updateBook);
router.delete("/api/books/:id",authMiddleware, Controllers.deleteBook);


module.exports = router;