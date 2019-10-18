# About Noms
For this project, I created a MERN (MongoDB, Express, React, Nodejs) stack app called Noms. It lets the user to rate, NOT the restuarant, but individual dish at the restuarant. Once the user signs in, the user can upload a picture and rate the dish (up to five stars). The user has an access to other users' ratings, but does not have any access to edit or delete other users' reviews. The user can update or delete their own review.

- <a href=https://github.com/sookim-Boston/noms-backend>Repo for Noms' Express API</a>
- <a href=https://github.com/sookim914/noms>Repo for Noms' frontend </a>
- <a href=https://fast-peak-68836.herokuapp.com/>Deployed backend Heroku</a>
- <a href=https://sookim914.github.io/noms/>Noms</a>

### Technologies used
- React
- Nodejs
- JavaScript

### Set up and installation
1. Create a github repo
2. Use `npm` to install dependencies
3. Add a new git remote
3. Work locally with Grunt
4. Use `npm run deploy` to deploy to Github pages


### Development Process
1. Created a wirefram and user stories to set up goals for the project
2. Connect API events on the front end to API using axios/AJAX
    - show reviews: GET request
    - create review: POST request
    - update review: PATCH request
    - destory review: DELETE request
3. Use star rating package and emoji package to let users to rate the dish using stars



### Challenges & Problem-Solving
-  Route issue: the user can delete their review on the same page, where they see all the reviews for the dish. Once the user delete the review, the browser needs to be "refreshed" so that it will show the user updated browser with their review deleted. In order to do that, I used dummy route '/reload' before redirect the browser back to the review page.
- Delete and edit button: In order to let the user sees edit and delete buttons only for their posts they own, I used user.token and ternary oprator to verify the user owns the post


### Unsolved Problems
Things that I am planning to work on:
1. Importing external API to get restuarant data
2. Styling
3. Search (for Restuarants)

### Wireframes and User stories
As a user, I should be able to sign up
As a user, I should be able to sign in
As a user, I should be able to sign out
As a user, I should be able to change my PW
As a user, I should be able to create a review
As a user, I should be able to update my review
As a user, I should be able to see other users' reviews
As a user, I should be able to delete my review

### Screenshot of the app

<img src=https://i.imgur.com/ScAtlu3.png>

### Wireframes

<img src=https://i.imgur.com/D7i26Bn.jpg>
