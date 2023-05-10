# Bookspace

![UML diagram](/public/image/bookspace_diagram.png)

BookSpace is a social network where users can review books and track the books they read. Book details are retrieved using 
the Google Books API. 

There are three types of users: readers, authors, and critics. All three types may favorite/unfavorite books, add/remove books
to their reading list, and review books with both ratings and text reviews.

Once logged in, BookSpace users are greeted by the home page. The home pages displays recent reviews posted to BookSpace, 
the user's personal reading list, and the user's personal favorites.

![Home Page](/public/image/bookspace_home.png)

The search page queries the Google Books API and retrieves books relevant to the user's query. 

![Search Page](/public/image/bookspace_search.png)

Up to 20 books are queried and displayed.

![Results Page](/public/image/bookspace_search_results.png)

When the user selects a book, the book's details are displayed.

![Details Page](/public/image/bookspace_details.png)

Users can favorite books, add them to their reading list, and review them. Reviews consist of a rating out of 5 stars and 
a text description. Users can create, read, update, and delete their own reviews. 

![Additional Details Page](/public/image/bookspace_user_details.png)

Critics have the unique ability to recommend one book. If a critic recommends a book, it will appear on the book's details page.

![Critic Recommendation](/public/image/bookspace_critic.png)

The "Critically Acclaimed" tab is only available to users who are logged in. It contains all of the recommendations created by 
critics.

![Acclaimed](/public/image/bookspace_acclaimed.png)

Authors have the unique ability to upload books. The book details are uploaded and stored in BookSpace's database. User-uploaded 
books can be favorites, added to reading lists, and reviewed just like books from the Google API.

![Upload](/public/image/bookspace_upload.png)

Once a user has created an account, they have access to a profile page, which contains their recent reviews, favorited books, and 
personal reading list. Users can update their name and email. Every user has a public profile, which is their profile page shown to 
other users. This public profile hides their email address for privacy.

![Profile](/public/image/bookspace_profile.png)

Critics have an additional part of their profile page that shows which book they recommend to readers.

![Recommendation](/public/image/bookspace_recommend.png)

Authors have an additional part of their profile page that contains all of the books they have authored by using the upload 
function.

![Authored](/public/image/bookspace_author.png)







