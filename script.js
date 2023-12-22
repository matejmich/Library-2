window.onload = function(){ 

const myLibrary = [];
let main = document.querySelector(".main")

// this is handling opening and closing form with buttons (not submit)
const openModalButtons = document.querySelectorAll("[data-modal-target]")
const closeModalButtons = document.querySelectorAll("[data-modal-close]")
const overlay = document.getElementById("overlay")
openModalButtons.forEach(button => {
    button.addEventListener("click", () => {
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal)
    })
})
closeModalButtons.forEach(button => {
    button.addEventListener("click", () => {
        const modal = button.closest(".modal")
        closeModal(modal)
    })
})

overlay.addEventListener("click", () => {
    const modals = document.querySelectorAll(".modal.active")
    modals.forEach(modal => {
        closeModal(modal)
    })
})

function openModal(modal) {
    modal.classList.add("active")
    overlay.classList.add("active")
}
function closeModal(modal) {
    modal.classList.remove("active")
    overlay.classList.remove("active")
}

// closing the form and sending in a book

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return title + " by " + author + ", " + pages + " pages, " + read
    };
}

document.querySelector("#form").addEventListener("submit", () => {
    event.preventDefault();
    addBookToLibrary();
    renderLibrary();
    closeModal(modal);
    console.log(myLibrary)
    
})

function addBookToLibrary() {
    
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let read = document.getElementById("read").checked;
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    clearFrom();
    
};

function renderLibrary() {
    const library = document.querySelector(".library")
    // delete (refresh) display
    deleteLibrary();
    // create all bookDivs from library
    for (let i = 0; i < myLibrary.length; i++) {
        let book = myLibrary[i]

        let bookDiv = document.createElement("div")
        bookDiv.classList.add("book")
        library.appendChild(bookDiv)

        let deleteBookBTN = document.createElement("button")
        deleteBookBTN.classList.add("deleteBook")
        deleteBookBTN.setAttribute("id",i)
        deleteBookBTN.innerHTML = "&times;"
        bookDiv.appendChild(deleteBookBTN)

        let bookTitle = document.createElement("div")
        bookTitle.classList.add("title")
        bookTitle.textContent = book.title
        bookDiv.appendChild(bookTitle)

        let bookAuthor = document.createElement("div")
        bookAuthor.classList.add("title")
        bookAuthor.textContent = book.author
        bookDiv.appendChild(bookAuthor)

        let bookPages = document.createElement("div")
        bookPages.classList.add("pages")
        bookPages.textContent = book.pages
        bookDiv.appendChild(bookPages)

        let bookSwitch = document.createElement("label")
        bookSwitch.classList.add("switch")
        bookDiv.appendChild(bookSwitch)

        let bookRead = document.createElement("input")
        bookRead.type = "checkbox"
        bookRead.classList.add("read")
       
        bookSwitch.appendChild(bookRead)
        if (book.read === true) {
            bookRead.checked = true;
        }
        let bookSlider = document.createElement("span")
        bookSlider.classList.add("slider", "round")
        bookSwitch.appendChild(bookSlider)


        // delete our own book
        deleteBookBTN.addEventListener("click", () => {
            myLibrary.splice(i, 1)
            renderLibrary()
        })
    }
    
}


function deleteLibrary() {
    const library = document.querySelector(".library")
    library.innerHTML = ""
}

function clearFrom() {
    document.getElementById("form").reset()
}
// deleting individual books
let eraseBook = document.querySelectorAll(".deleteBook")


eraseBook.forEach(button => {
    button.addEventListener("click", () => {
        renderLibrary()
    })
    
})

}

// validation