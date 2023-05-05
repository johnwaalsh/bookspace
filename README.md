# Bookspace

![UML diagram](/public/image/bookspace_diagram.png)

Bookspace is a social network where users can review books and track the books they read. Book details are retrieved using 
the Google Books API. 

There are three types of users: readers, authors, and critics. All three types may favorite/unfavorite books, add/remove books
to their reading list, and review books with both ratings and text reviews.

The search page queries the Google Books API and retrieves books relevant to the user's query. 

When the user selects a book, the book's details are displayed.