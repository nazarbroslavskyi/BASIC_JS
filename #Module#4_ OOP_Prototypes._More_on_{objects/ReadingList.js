// The Reading List
// Create a class BookList. Create another class called Book.

// BookLists should have the following properties:

// Number of books marked as read
// Number of books marked not read yet
// A reference to the next book to read (book object)
// A reference to the current book being read (book object)
// A reference to the last book read (book object)
// An array of all the Books


// Each Book should have several properties:

// Title
// Genre
// Author
// Read (true or false)
// Read date, can be blank, otherwise needs to be a JS Date() object


// Every Book should have a few methods:
// .markAsRead(book)

// Should mark the book that is currently being read as "read"
// Give it a read date of new Date(Date.now())


// Every Booklist should have a few methods:
// .add(book)

// Should add a book to the books list.
// If it is first one in a list, then it should became current one

// .finishCurrentBook()

// Change the last book read to be the book that just got finished
// Change the current book to be the next book to be read
// Change the next book to be read property to be the first unread book you find in the list of books

class Book {
  constructor(title, genre, author, read = false, readDate = null) {
    this.title = title;
    this.genre = genre;
    this.author = author;
    this.read = read;
    this.readDate = readDate;
  }

  markAsRead() {
    if (this.read) {
      console.log("You have already read this book");
    } else {
      this.read = true;
      this.readDate = new Date(Date.now());
    }
  }
}

class BookList {
  constructor() {
    this.bookList = [];
    this.numberOfReadedBooks = 0;
    this.numberOfUnreadedBooks = 0;
    this.nextBookToRead = null;
    this.currentBook = null;
    this.lastReadedBook = null;
  }

  add(book) {
    this.bookList.push(book);
    this.currentBook =
      this.bookList.length === 1 ? this.bookList[0] : this.currentBook;

    const nextBookToRead = this.bookList.find(el => {
      return el.read === false && el !== this.currentBook;
    });

    this.nextBookToRead = nextBookToRead
      ? nextBookToRead
      : console.log("YOU DO NOT HAVE ANY BOOK TO READ.");
  }

  finishCurrentBook() {
    if (!this.bookList.length) {
      console.log("Your book list is empty. Please add any book to it");
    } else {
      this.currentBook.markAsRead();
      this.lastReadedBook = this.currentBook;
      const currentBookToRead = this.bookList.find(book => book.read === false);

      this.currentBook = currentBookToRead
        ? currentBookToRead
        : console.log(
          "You do not have unreaded book already. Please add any book"
        );

      const nextBookToRead = this.bookList.find(el => {
        return el.read === false && el !== this.currentBook;
      });

      this.nextBookToRead = nextBookToRead
        ? nextBookToRead
        : console.log("YOU DO NOT HAVE ANY BOOK TO READ.");
    }
  }
}

const book1 = new Book("Robinzon Cruzo", "adventure", "Daniel Defo", false, null);
const book2 = new Book("Love of Life", "novel", "Jack London", false, null);
const book3 = new Book("Martin Iden", "novel", "Jack London", false, null);
const book4 = new Book("Kobzar", "poem", "Taras Shevchenko", true, "01-02-2008");
const book5 = new Book("Harry Potter", "fantasy novel", "Joanne Rowling ", false, null);

const bookList = new BookList();

bookList.finishCurrentBook(); // Your book list is empty. Please add any book to it;

bookList.add(book1);

console.log(bookList.currentBook); // Robinzon Cruzo BookList
console.log(bookList.nextBookToRead); // YOU DO NOT HAVE ANY BOOK TO READ.

bookList.add(book2);

console.log(bookList.currentBook); // Again Robinzon Cruzo
console.log(bookList.nextBookToRead); // And now we have next book to read 'love OF Life'
console.log(bookList.lastReadedBook); // Null, bacause we do not have last readed book

bookList.finishCurrentBook();

console.log(bookList.currentBook); // Now Current BOOK IS 'LOVE OF LIFE'
console.log(bookList.nextBookToRead); // undefined because we have only two books
console.log(bookList.lastReadedBook); // Robinzon Cruzo

