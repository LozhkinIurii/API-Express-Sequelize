**Author:** Iurii Lozhkin<br>
**Date**:

### Instructions to setup and run:
1. Run in the terminal _npm install_ to install all necessary modules.
2. Run the command _node server.js_ or _nodemon server.js_ (better) to launch the server.

Routes:

GET: http://localhost:8000/api/users  (shows all users)<br>
GET: http://localhost:8000/api/users/search  (to use searching requests)<br>
GET: http://localhost:8000/api/users/:id (show user by id)<br>
POST: http://localhost:8000/api/users (to make POST requests)<br>
PATCH: http://localhost:8000/api/users/:id (to make PATCH requests)<br>
PUT: http://localhost:8000/api/users/:id (to make PUT requests)<br>
