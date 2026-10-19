import { User } from "./User.js";



export class Member extends User {
     constructor(name, email) {
        super(name, email);
    }

    borrowBook(book) {
      
    }

    returnBook(bookId) {
      // TODO: Implement This. It is your task.
    }

    

    getRole() { //polymorphism - overriding the parent class ka same method 
        return 'Member';
    }
}