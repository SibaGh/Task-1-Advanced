class Book {
    #title;
    #author;
    #category;
    #availability;
    constructor(title, author, category, availability = true){
        this.#title = title;
        this.#author = author;
        this.#category = category;
        this.#availability = availability;
    }
    getTitle() {
        return this.#title;
    }
    getAuthor() {
        return this.#author;
    }
    getCategory() {
        return this.#category;
    }
    isBookAvailable() {
        return this.#availability;
    }
    toggleAvailable(){
        return this.#availability = !this.#availability;
    }
    displayInfo(){
        return `Book informations : Title: ${this.#title}, Author: ${this.#author}, Category: ${this.#category}
        Availability: ${this.#availability ? "Availabel" : "Not Available"}`;
    }
}

class Library {
    #books = [];
    constructor(){

    }
    addBook(book){
        this.#books.push(book);
    }
    removeBook(title) {
    this.#books = this.#books.filter(book => book.getTitle() !== title);
    }
    searchBooks(query) {
    const searchTerm = query.toLowerCase();
    return this.#books.filter(book =>
        book.getTitle().toLowerCase().includes(searchTerm) ||
        book.getAuthor().toLowerCase().includes(searchTerm)
    );
}
    filterByCategory(category) {
    if (category === "All") {
        return this.#books;
    }
    return this.#books.filter(Book => Book.getCategory() === category);
}

toggleAvailability(title) {
    const book = this.#books.find(book => book.getTitle() === title);
    if (book) {
        book.toggleAvailable();
        renderBooks(this.#books);
} 
}
getBooks() {
    return this.#books;
}
}
class ReferenceBook extends Book{
    #locationCode;
    constructor(title, author, category, availability = true,locationCode){
        super(title, author, category, availability);
        this.#locationCode = locationCode;
    }
    displayInfo(){
        return `${super.displayInfo()} location Code : ${this.#locationCode}`
    }
    getLocationCode() {
    return this.#locationCode;
    }
}

const searchInput = document.getElementById("search-input");
const categoryFilter = document.getElementById("category-filter");
const booksContainer = document.getElementById("books-container");

searchInput.addEventListener('keyup', (e) => {
const query = e.target.value;
const filteredBooks = myLibrary.searchBooks(query);
renderBooks(filteredBooks);
});

categoryFilter.addEventListener('change', (e) => {
const category = e.target.value;
const filteredBooks = myLibrary.filterByCategory(category);
renderBooks(filteredBooks);
});

const myLibrary = new Library();

myLibrary.addBook(new Book("عناكب", "أحمد خالد توفيق", "خيال علمي"));
myLibrary.addBook(new Book("بيت الكوابيس", "أحمد خالد توفيق", "رعب"));
myLibrary.addBook(new ReferenceBook("أطلس الفضاء", "توني فنسنت", "تاريخي", "A-52"));
myLibrary.addBook(new Book("أسطورة الطفولة", "أحمد خالد توفيق", "رعب"));

function renderBooks(Books) {
    booksContainer.innerHTML = '';

    Books.forEach(Book => {
    if (Book && Book.getTitle) { 
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookCard.innerHTML = `
            <h3>${Book.getTitle()}</h3>
            <p><strong>المؤلف: </strong>${Book.getAuthor()}</p>
            <p><strong>الفئة:</strong> ${Book.getCategory()}</p>
            <p><strong>الحالة:</strong> ${Book.isBookAvailable() ? 'متاح' : 'غير متاح'}</p>
            ${Book instanceof ReferenceBook ? `<p><strong>رمز الموقع:</strong> ${Book.getLocationCode()}</p>` : ''}
            <button class="toggle-btn" data-title="${Book.getTitle()}">تغيير الحالة</button>
            <button class="delete-btn" data-title="${Book.getTitle()}">حذف</button>
            `;
        booksContainer.appendChild(bookCard);
    }
});
}
renderBooks(myLibrary.getBooks());

booksContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('toggle-btn')) {
        const title = e.target.dataset.title;

        myLibrary.toggleAvailability(title);

        renderBooks(myLibrary.getBooks());
}
    if (e.target.classList.contains('delete-btn')) {
        const title = e.target.dataset.title;
        myLibrary.removeBook(title);
        renderBooks(myLibrary.getBooks()); 

}
});

const addBookForm = document.getElementById('add-book-form');
const bookTitleInput = document.getElementById('book-title');
const bookAuthorInput = document.getElementById('book-author');
const bookCategoryInput = document.getElementById('book-category');

addBookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = bookTitleInput.value;
    const author = bookAuthorInput.value;
    const category = bookCategoryInput.value;

if (title && author && category) {
    const newBook = new Book(title, author, category);
    myLibrary.addBook(newBook);
    renderBooks(myLibrary.getBooks());
    bookTitleInput.value = '';
    bookAuthorInput.value = '';
    bookCategoryInput.value = '';
} else {
    alert('الرجاء إدخال جميع معلومات الكتاب.');
}
});











