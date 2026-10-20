export class LibraryService{
    #books; // this is a private variable since we dont want any user to manipulate it directly 

    constructor(){
        this.#books = []; //empty arr of books
    }

    addBookToCollection(book){
        this.#books.push(book);
    }

    getAvailableBooks(){
        return this.#books.filter((book)=>{
            return book.isAvailable;
        })
    }

    getAllBooks(){
        return this.#books;
    }

    getSelectedBook(bookId){
         return this.#books.find((book)=>{
            return book.id === bookId;
        })
    }

    getBorrowedBooks(){
        return this.#books.filter((book)=>{
            return !book.isAvailable;
        })
    }

   


}