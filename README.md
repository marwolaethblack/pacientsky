# Pacientsky
To run this app locally, simply run `npm run setup`.  
This will run in order:  
  1. `npm install` to install dependencies.
  2. `npm run build` to build a production ready build.
  3. `npm run populate 100` to populate the sqlite3 database with 500 rows of patients.
  4. `npm run server` to start the server at localhost:3110.

Then just open your browser at `localhost:3110` to view the app.  

Alternatively you can run each of those scripts, in order, yourself.  
After `npm run setup` was run once, only `npm run server` is needed to start the server.  

To populate the database with 250 000 patient records simply run `npm run populate 50000` (this takes a while)  


## Assignment goals:
### Required
  *  - [x] Create a ReactJS application with WebPack, hot-reloading and LESS.
  *  - [x] Create, Edit, Delete Patient.
  *  - [x] Patient contains name, email, birthday and phone number.
  *  - [x] Search through Medicine API and assign result to patient (Viewable on /medicine).
  *  - [x] Deep linking to different views (Implemented react-router, Navigation is located in the header).
  *  - [x] Readme file with instructions on how to run application.
 
 ### Optional
  *  - [x] Script that adds 250 000 patients with various medications, pagination (populate package.json script).
  *  - [x] Server Side Rendering (serverRenderer.js middleware in /server/middleware).
  *  - [x] All forms (search patient, edit patient, create patient, search medication) use the same reusable form 
           component (the GenericForm component in /src/components/GenericForm).
