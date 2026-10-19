import { Admin } from "./models/Admin.js";
import { Member } from "./models/Member.js";
import { Book } from "./models/Book.js";
import { LibraryService } from "./services/LibraryService.js";

console.log("hi app created for llm");

const library = new LibraryService();

//create a fixed admin and member for now - later u can registration and make it dynamic as well
const admin = new Admin("Harshita", "hash@llm.com");
const member = new Member("Noddy", "noddy@gmail.com");
let currentUser = admin; //default is admin only

//role = member --> hide the bookform
let userSwitcher = document.getElementById("userSwitcher");
let bookSection = document.getElementById("bookSection");
let bookForm = document.getElementById("bookForm");
let booksList = document.getElementById("bookList");

//we want to be able to display the added books in available section - 2 ways
//  --> create a method jisme we pass this newly created book , add the book directly to dom
// second way - create services - reusable by other peices of UI + single place for all the crud functionality - single source of truth ( we used this one !!)
function renderAvailableBooks(){
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
    } else if (currentUser.getRole() === "Admin") { //why not use else here - coz it is possible ki koi 3rd scenario aajaye jisme glti se kuch bhi input aajaye but we want changes only for admin nobody else - so its a stricter check 
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

function userSwitchDropdown() {
  userSwitcher.addEventListener("change", (e) => {
    let selectedUser = e.target.value;
    hideAddBooksSectionForMember(selectedUser);
    renderAvailableBooks();
  });
}

//admin should be able to add books
function addBooks() {
  bookForm.addEventListener("submit", (e) => {
    //when user submits a form , we want a new book is created
    //by default - on submitting the browser reloads the page --> to prevent this use preventDefault
    e.preventDefault();
    console.log(e);
    const bookTitle = document.getElementById("title").value;
    const bookAuthor = document.getElementById("author").value;
    const bookGenre = document.getElementById("genre").value;
    const newBook = new Book(bookTitle, bookAuthor, bookGenre); //update stock for same book - later

    library.addBookToCollection(newBook);
    renderAvailableBooks();
    bookForm.reset();
  });
}

//next ip we want to display borrow btn for members on which they click and the book goes to borrow section + for admin we want to display whether that book is available or borrowed text simanateously

userSwitchDropdown();
addBooks();
