
const model = require("../schema/books");



exports.getAllBooks = async (req, res) => {
try {
    const books = await model.find();
    res.status(200).json({message: "All books", books});
} catch (error) {
    res.status(500).json({ "message": "Error fetching books" });
    console.log(error);
}
}

exports.getBook = async (req, res) => {
    const bookId = req.params.id;
    try {
        const book = await model.findById(bookId);
        if
    (!book) {
                return res.status(404).json({ message: "Book not found" });
            }   
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: "Error fetching book" });
    }
}

exports.addBook = async (req, res) => {
    try {
        const Role = req.user.role;
        if (Role === "Admin") {
              const book = await model.create(req.body);
    
        console.log(book);
            res.status(201).json(book);
        } else {
            return res.status(403).json({ message: "Access denied" });
        }
      
    } catch (error) {
     res.status(500).json({ message: "Error fetching books", error: error.message });

    }
}

exports.deleteBook = async (req, res) => {
try {
    const Role = req.user.role;
    if (Role === "Admin") {
        const bookId = req.params.id;
    const book = await model.findByIdAndDelete(bookId);
    res.status(200).json({ message: "Book deleted successfully", book });
    }   else {
        return res.status(403).json({ message: "Access denied" });
    }
    

} catch (error) {
    res.status(500).json({ message: "Error deleting book" });
    console.log(error);
    
}
}


exports.updateBook = async (req, res) => {
try {
    const Role = req.user.role;
    if (Role === "Admin") {
        
    const updatedBook = await model.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json(updatedBook);
    }   else {
        return res.status(403).json({ message: "Access denied" });
    }
   
} catch (error) {
     res.status(500).json({ message: "Error updating book" });
    console.log(error);
}
}
