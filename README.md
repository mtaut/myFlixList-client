# myFlixList

myFlixList-client is an app built with React, based on the existing server-side code, myFlixList (REST API and database). This app allows users to register an account, view information about movies, and create a list of their favorite movies. The app is a single page with routing and several interface views.

## myFlixList-client

1. Install parcel
   npm install -g parcel

2. Install packages and dependencies
   npm install --save react react-dom

3. Create files
   myFlixList-client/src/index.jsx
   myFlixList-client/src/index.scss
   myFlixList-client/src/index.html

4. Create components folders
   main-view
   movie-card
   movie-view

5. Create components in each folder
   main-view.jsx in "main-view" directory
   movie-card.jsx in "movie-card" directory  
   movie-view.jsx in "movie-view" directory

6. Add hook to main-view.jsx
   useState

7. Install parcel as a local developer dependency
   npm install --save-dev parcel

8. Run parcel
   parcel src/index.html
