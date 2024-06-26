const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function(){
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
    }

    this.toggle = function(){    
        return this.read = (this.read.toLowerCase() === 'read') ? 'not read yet': 'read'; 
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
/* Finished manually adding content */


const table = document.querySelector(".libraryTable");
const table_body = document.querySelector(".table-body");

/* Render library - show in table*/
function renderLibrary() {
    table_body.innerHTML = ''; /* Empty table before rerendering */
    myLibrary.forEach(element => {

    //create row and cells
    let cells = makeRow();

    cells.cell1.innerHTML = element.title;
    cells.cell2.innerHTML = element.author;
    cells.cell3.innerHTML = element.pages;
    cells.cell4.innerHTML = element.read;

    let newRow = cells.row;

    /* Set dataattribute on row to link click-event to a specific row */
    newRow.setAttribute("data-row-index", table.rows.length);
    let id = newRow.rowIndex; 
   
    /* Add delete button for each book */
    let btn = document.createElement("button");
    btn.innerText = 'Delete';
    btn.classList.add("delete_button");
    cells.cell5.appendChild(btn);

    /* Add button to change read status for each book */
    let status_btn = document.createElement("button");
    status_btn.innerText = 'Change';
    cells.cell5.appendChild(status_btn);

    /* Add eventlistener to delete buttons */
    btn.addEventListener('click', (e) => {
        table.deleteRow(id);
        myLibrary.splice(id-1, 1); /* remove from libraryarray */
        renderLibrary();
    }); 

    /* Add eventlistener to change status button */
    status_btn.addEventListener('click', (e) => {
        cells.cell4.innerHTML = element.toggle();
    });      
}); 
};


/* Reference to form and buttons in HTML */
const formElem = document.querySelector("form");
const submit_button = document.querySelector(".submit_button");
const add_button = document.querySelector(".newBook");

/* show form in click event and hide 'Add new book' button */
add_button.addEventListener('click', () => {
        formElem.style.display = 'block';
        add_button.style.display = 'none';
});


/* Stop default event and trigger formdata event  */
submit_button.addEventListener('click', (e) => {
    /* Prevent sending to server on submit */
    e.preventDefault();

    /* Creating a new formdata object */
    const data = new FormData(formElem);    
    
    /* Write form data to new Book element and add to Library */
    let title = data.get("book_title");
    let author = data.get("book_author");
    let pages = data.get("numberOfPages");
    let read = data.get("read_status"); 
    let newBook = new Book(title, author,pages,read);
   
    addBookToLibrary(newBook);    

    /* Hide form-element and show add new book button */
    formElem.style.display = 'none';
    add_button.style.display = 'block';
    
    /* Reset input fields to allow adding a new book */
    formElem.reset();

    /* Show updated library */
    renderLibrary();      
});


function makeRow() {
    let row = table_body.insertRow();
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);

    return {row, cell1, cell2, cell3, cell4, cell5};
}

renderLibrary();