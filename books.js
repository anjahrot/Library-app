const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function(){
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

/* Adding books manually */
const theHobbit = new Book('The Hobbit', 'J.R.R Tolkien', 295, 'not read yet');
const lordOfRings = new Book('The Lord of the Rings', 'J.R.R Tolkien', 1216, 'read')
const harryPotter = new Book('Harry Potter and the Philosopher`s Stone ', 'J.K. Rowling', 223, 'not read yet')

addBookToLibrary(theHobbit);
addBookToLibrary(lordOfRings);
addBookToLibrary(harryPotter);

let table = document.querySelector(".libraryTable");

myLibrary.forEach(element => {

    //create row and cells
    let cells = makeRow();

    //set content in cells
    cells.cell1.innerHTML = element.title;
    cells.cell2.innerHTML = element.author;
    cells.cell3.innerHTML = element.pages;
    cells.cell4.innerHTML = element.read;
}); 

/* Add book to library in the browser */

/* Reference to form and button in HTML */
const formElem = document.querySelector("form");
let submit_button = document.querySelector("button");

/* Stop default event and trigger formdata event  */
submit_button.addEventListener('click', (e) => {
    /* Prevent sending to server on submit */
    e.preventDefault();

    /* Creating a new formdata object */
    new FormData(formElem);    
});


formElem.addEventListener("formdata", (e) => {
    console.log("formdata fired");

    let newRow = makeRow();
    /* Get the formdata from the event object and write values to table in HTML */
    const data = e.formData;
    newRow.cell1.innerHTML = data.get("book_title");
    newRow.cell2.innerHTML = data.get("book_author");
    newRow.cell3.innerHTML = data.get("numberOfPages");
    newRow.cell4.innerHTML = data.get("read_status"); 
} )
    




function makeRow() {
    let row = table.insertRow();
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);

    return {cell1, cell2, cell3, cell4};
}