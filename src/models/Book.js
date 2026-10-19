export class Book {
  constructor(title, author, genre) {
    this.id = crypto.randomUUID(); //generates a random unique id 
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.isAvailable = true;
  }

  //update stock - if same book ka multiple copies are getting added - so u gotta update their stock - get all books , check exact title match and then update , or have the same id for it somehow 
  
}