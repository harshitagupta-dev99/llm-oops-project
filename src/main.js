import { Admin } from "./models/Admin.js";
import { Member } from "./models/Member.js";
import { Book } from "./models/Book.js";
import { LibraryService } from "./services/LibraryService.js";



const library = new LibraryService();

//create a fixed admin and member for now - later u can registration and make it dynamic as well
const admin = new Admin("Harshita", "hash@llm.com");
const member = new Member("Noddy", "noddy@gmail.com");
let currentUser = admin; //default is admin only

//role = member --> hide the bookform
let userSwitcher = document.getElementById("userSwitcher");
let bookSection = document.getElementById("bookSection");
let borrowedSection = document.getElementById("borrowedSection");
let bookForm = document.getElementById("bookForm");
let booksList = document.getElementById("bookList");
let borrowedList = document.getElementById("borrowedList");
const borrowedContainer = document.getElementById("borrowedList");
const availableContainer = document.getElementById("bookList");

//we want to be able to display the added books in available section - 2 ways
//  --> create a method jisme we pass this newly created book , add the book directly to dom
// second way - create services - reusable by other peices of UI + single place for all the crud functionality - single source of truth ( we used this one !!)
function renderAvailableBooks() {
  
  //isme we want to get all the available books and show in the UI
  booksList.innerHTML = "";
  library.getAllBooks().forEach((book) => {
    //create an li elements to render in the list
    const li = document.createElement("li");
    li.className =
      "bg-white p-4 rounded shadow flex justify-between items-center";

    let controls = "";

    //here we could have used the selected value from UI vairable as well right to display stuff conditionally - why are we getting the role from the current user object instead ??
    //reason : tomm the UI elements can change and u will have to make code changes everywhere as full logic of whether we are dealing with admin or member will depend on that and u wil have to makes changes in lots of places and retest , however , the userObject is something we created so it is more dependable as it wont change that frequenlty and does not depend on external circumstances unlike the dropdown - so we will not have to make code changes everywhere - it is beneficial for future development & reduces our dev effort significantly in the longer run - good practice hehe

    if (currentUser.getRole() === "Member" && book.isAvailable) {
      controls = `<button class="bg-green-500 text-white px-3 py-1 rounded" data-action="borrow" data-id="${book.id}">Borrow</button>`;
    }else if(currentUser.getRole() === "Member" && !book.isAvailable){
      controls = `<span class="text-sm text-gray-500">${
        !book.isAvailable && "Borrowed"
      }</span>`;
    }
    else if (currentUser.getRole() === "Admin") {
      //why not use else here - coz it is possible ki koi 3rd scenario aajaye jisme glti se kuch bhi input aajaye but we want changes only for admin nobody else - so its a stricter check
      controls = `<span class="text-sm text-gray-500">${
        book.isAvailable ? "Available" : "Borrowed"
      }</span>`;
    }
    li.innerHTML = `
            <div>
              <strong>${book.title}</strong> by ${book.author} <em>(${book.genre})</em>
            </div>
            ${controls}
        `;
    booksList.appendChild(li);
  });
}

function hideAddBooksSectionForMember(selectedUser) {
  currentUser = selectedUser === "admin" ? admin : member;
  bookSection.style.display = selectedUser === "admin" ? "block" : "none";
}
function hideBorrowedBooksSectionForAdmin(selectedUser) {
  currentUser = selectedUser === 'Admin' || selectedUser === "admin" ? admin : member;
  borrowedSection.style.display = selectedUser === 'Admin' || selectedUser === "admin" ? "none" : "block";
}

function userSwitchDropdown(e) {
    let selectedUser = e.target.value;
    hideAddBooksSectionForMember(selectedUser);
    hideBorrowedBooksSectionForAdmin(selectedUser);
    renderAvailableBooks();
}

//admin should be able to add books
function addBooks() {
  bookForm.addEventListener("submit", (e) => {
    //when user submits a form , we want a new book is created
    //by default - on submitting the browser reloads the page --> to prevent this use preventDefault
    e.preventDefault();
    const bookTitle = document.getElementById("title").value;
    const bookAuthor = document.getElementById("author").value;
    const bookGenre = document.getElementById("genre").value;
    const newBook = new Book(bookTitle, bookAuthor, bookGenre); //update stock for same book - later

    library.addBookToCollection(newBook);
    renderAvailableBooks();
    bookForm.reset();
  });
}

//next task: we want to display borrow btn for members on which they click and the book goes to borrow section + for admin we want to display whether that book is available or borrowed text simanateously

function renderBorrowSection(){
   //isme we want to get all the borrowed books and show in the UI
  borrowedList.innerHTML = "";
  library.getBorrowedBooks().forEach((book) => {
    //create an li elements to render in the list
    const li = document.createElement("li");
    li.className =
      "bg-white p-4 rounded shadow flex justify-between items-center";
    
    let controls = "";

    if (currentUser.getRole() === "Member" && !book.isAvailable) {
      controls = `<button class="bg-green-500 text-white px-3 py-1 rounded" data-action="return" data-id="${book.id}">Return</button>`;
    }
    //this part needs to be checked yeh kal krte - for both return & borrow 
    li.innerHTML = ` 
            <div>
              <strong>${book.title}</strong> by ${book.author} <em>(${book.genre})</em>
            </div>
            ${controls}
        `;
    borrowedList.appendChild(li);
  });
}

function borrowBooks(event) {
    //then we can borrow the book - 2 approaches - iterate through all the borrow buttons currently in dom and then listen to event for each seperately - more memory consumed + new btn add hua toh uske liye for loop wont listen automiatically as for loop will run only once when the page loads. 

    //second way - it to target the parent container contianing these boorow btns , and listen to click event on parent since event bubbles up , parent will be able to catch the exact event fired with the associated id, and even if we add btns dynamically, we would be able to to listen to the relevant event click.

    //so we are following the approach 2 - secondly passing id in html is harmless.
    //Add just ONE single event listener to the parent

      const clickedElement = event.target.closest('button[data-action]');

      //Filter check: Ensure the user actually clicked a delete button & //Safely extract the custom data attributes
      if (clickedElement.dataset.action === "borrow") {
        const bookId = clickedElement.dataset.id;
        //add this book to borrowed section --> isAvailable ko false krdo & update the current book in library as well
        let selectedBook = library.getSelectedBook(bookId);
        selectedBook.isAvailable = false;
        renderBorrowSection();
        renderAvailableBooks();
      }
}

function returnBooks(event){
    // event.target is the exact internal element that was clicked
      const clickedElement = event.target.closest('button[data-action]');

      //Filter check: Ensure the user actually clicked a return button & //Safely extract the custom data attributes
      if (clickedElement.dataset.action === "return") {
        const bookId = clickedElement.dataset.id;
        //add this book to borrowed section --> isAvailable ko false krdo & update the current book in library as well
        let selectedBook = library.getSelectedBook(bookId);
        selectedBook.isAvailable = true;
        renderBorrowSection();
        renderAvailableBooks();
      }
}


borrowedContainer.addEventListener("click", (event) => {
        //safety check - only a member can borrow a book
if (currentUser.getRole() !== "Member" || library.getBorrowedBooks().length === 0) {
    return;
}
      returnBooks(event);
});

availableContainer.addEventListener("click", (event) => {
    //safety check - only a member can borrow a book
if (currentUser.getRole() !== "Member" || library.getAvailableBooks().length === 0) {
    return;
}
      borrowBooks(event);
});

userSwitcher.addEventListener("change", (e) => {
    userSwitchDropdown(e);
});


hideBorrowedBooksSectionForAdmin(currentUser.getRole());

addBooks();


