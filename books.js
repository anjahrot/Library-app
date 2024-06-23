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
console.log(harryPotter);

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

/* Finished manually adding content */


/* Add book to library in the browser */

/* Reference to form and buttons in HTML */
const formElem = document.querySelector("form");
let submit_button = document.querySelector(".submit_button");
let add_button = document.querySelector(".newBook");

/* show form in click event, and hide add new book button */
add_button.addEventListener('click', () => {
        formElem.style.display = 'block';
        add_button.style.display = 'none';
});


/* Stop default event and trigger formdata event  */
submit_button.addEventListener('click', (e) => {
    /* Prevent sending to server on submit */
    e.preventDefault();

    /* Creating a new formdata object */
    new FormData(formElem);    
});


formElem.addEventListener("formdata", (e) => {

    /* Get the formdata from the event object and write values to Book object */
    const data = e.formData;
    
    let title = data.get("book_title");
    let author = data.get("book_author");
    let pages = data.get("numberOfPages");
    let read = data.get("read_status"); 
    let newBook = new Book(title, author,pages,read);
   
    addBookToLibrary(newBook);    
    
    /* Add new book to table */
    let cells = makeRow();
    cells.cell1.innerHTML = title;
    cells.cell2.innerHTML = author;
    cells.cell3.innerHTML = pages;
    cells.cell4.innerHTML = read;
    let newRow = cells.row;
    /* Set dataattribute on row to link click-event to a specific row */
    newRow.setAttribute("data-row-index", table.rows.length);

    /* Add delete button for each book */
    let btn = document.createElement("button");
    btn.innerText = 'Delete';
    btn.classList.add("delete_button");
    cells.cell5.appendChild(btn);

    /* Add button to change read status for each book */
    let status_btn = document.createElement("button");
    status_btn.innerText = 'Change';
    cells.cell5.appendChild(status_btn);

    /* Hide form-element and show add new book button */
    formElem.style.display = 'none';
    add_button.style.display = 'block';
    
    /* Reset input fields to allow adding a new book */
    formElem.reset();
    
    /* Add eventlistener to delete buttons */
    btn.addEventListener('click', (e) => {
            table.deleteRow(newRow.rowIndex);
    }); 

    /* Add eventlistener to change status button */
    status_btn.addEventListener('click', (e) => {
        let rowIndex = newRow.rowIndex;
        const status = table.rows[rowIndex].cells[3];

        if (status.innerHTML.toLowerCase() === 'read'){
            status.innerHTML = 'not read yet';
        } else {
            status.innerHTML = 'read';
        }

    });      
});


function makeRow() {
    let row = table.insertRow();
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);

    return {row, cell1, cell2, cell3, cell4, cell5};
}