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

const theHobbit = new Book('The Hobbit', 'J.R.R Tolkien', 295, 'not read yet');
const lordOfRings = new Book('The Lord of the Rings', 'J.R.R Tolkien', 1216, 'read')
const harryPotter = new Book('Harry Potter and the Philosopher`s Stone ', 'J.K. Rowling', 223, 'not read yet')


addBookToLibrary(theHobbit);
addBookToLibrary(lordOfRings);
addBookToLibrary(harryPotter);
console.log(myLibrary);


let table = document.querySelector(".libraryTable");


myLibrary.forEach(element => {

    //create row and cells
    let row = table.insertRow();
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);

    //set content in cells
    cell1.innerHTML = element.title;
    cell2.innerHTML = element.author;
    cell3.innerHTML = element.pages;
    cell4.innerHTML = element.read;
}); 

/* Add book to library in the browser */
document.addEventListener('click', )