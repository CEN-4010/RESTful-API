API Service to support an online web application 
bookstore which targets a particular niche in 
technology.

Features
Book browsing and sorting:

Create a new book:
http://localhost:3000/browsing/book/newBook

View a list of all the books in the library:
http://localhost:3000/browsing/book/viewList

View books by genre (Change genre to view others):
http://localhost:3000/browsing/book/byGenre/Thriller

View top ten sold:
http://localhost:3000/browsing/book/copiesSold/topTenSold

View books by rating (Change rating value to view others):
http://localhost:3000/browsing/book/byRating/5

View a quantity of books (Change quantity value to view others):
http://localhost:3000/browsing/book/viewBooks/2

Book Details:

Add a book:
http://localhost:3000/bookDetails/addBook

Add an author:
http://localhost:3000/bookDetails/addAuthor

Find a book by ISBN:
http://localhost:3000/bookDetails/book/byISBN/52368456013

Find books associated with an author:
http://localhost:3000/bookDetails/book/byAuthor/Bob Owens
