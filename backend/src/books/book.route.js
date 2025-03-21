const express = require('express');

const { postABook, getAllBooks, getSingleBook, UpdateBook, deleteABook } = require('./book.controller');
const verifyAdminToken = require('../middleware/verifyAdminToken');
const router = express.Router();


// post = when submit something to frontend frontend from backend
// get = when get something back from db
// put/patch = when editing or updating something
// delete = when deleting something

//posting book and giving admin access to create a book using verifyAdminToken
router.post("/create-book", verifyAdminToken ,postABook)

// get book to frontend
router.get("/", getAllBooks)

// single book endpoint
router.get("/:id", getSingleBook)

// update book endpoint and giving admin access to update
router.put("/edit/:id", verifyAdminToken ,UpdateBook)

// delete book endpoint and giving admin access to delete book
router.delete("/:id", verifyAdminToken ,deleteABook)

module.exports = router;