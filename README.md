# 📚 Library Management System (OOPS in Pure JavaScript)

A clean, modular **Library Management System** built entirely with **Vanilla JavaScript** using Object-Oriented Programming (OOP) principles. 

I built this project while following **Tapas Adhikary's (tapaScript) Hands-On JavaScript series** to strengthen my core JS fundamentals, understand how to structure a real-world application from scratch, and practice clean, maintainable code architecture without relying on frameworks.

---

### 🎯 Why I Built This
- **Application Architecture:** Learned how to separate business logic, data models, and UI/DOM manipulation cleanly.
- **OOP in Action:** Practiced real-world usage of ES6 Classes, Encapsulation, Inheritance, and Polymorphism.
- **Best Practices:** Focused on writing readable, modular, and DRY (Don't Repeat Yourself) code.

---

### ✨ Key Features
- 📖 **Book Management:** Add new books, view available inventory, and track book status (Available / Borrowed).
- 👤 **Member Management:** Manage borrowing permissions. Only Admin can add books while members can borrow them.
- 🔄 **Borrow & Return System:** Handle book checkouts, returns, and real-time availability updates.
- 💾 **Data Persistence:** Saves library records using `localStorage` so data stays intact across page reloads *(in progress)*.


---

### 🏗️ Project Structure
```text
├── index.html          # Main entry point & UI layout
├── style.css           # Clean styling for the library interface
└── src/
    ├── models/         # OOP Classes (Book, Member, Admin, Library)
    ├── services/       # Storage & business logic helpers
    └── main.js          # DOM manipulation & event listeners
```

### 🧠 Core OOP Concepts Applied
- **Classes & Constructors:** Modeled real-world entities like `Book`, `User`/`Member`, and `Library`.
- **Encapsulation:** Used private fields (`#`) and getter/setter methods to protect internal state and validate data.
- **Inheritance & Polymorphism:** Extended base user classes for specialized roles (e.g., `Member` vs. `Admin` privileges).
- **Separation of Concerns:** Kept data models completely decoupled from DOM updates.

---

### 🚀 How to Run Locally
1. Clone the repository:
   ```bash
   git clone https://github.com
   ```
2. Navigate into the project folder:
   ```bash
   cd YOUR-REPO-NAME
   ```
3. Open `index.html` in your browser (or run it using the **Live Server** extension in VS Code).

---

### 🙏 Acknowledgments
- Built as part of my hands-on learning journey following **tapaScript's JavaScript Series** by [Tapas Adhikary](https://github.com).
