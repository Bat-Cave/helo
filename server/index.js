require('dotenv').config();
const express = require('express'),
      massive = require('massive'),
      cors = require('cors'),
      session = require('express-session'),
      {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env,
      port = SERVER_PORT,
      ctrl = require('./controller'),
      app = express();

app.use(cors());
app.use(express.json());

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: SESSION_SECRET,
  cookie: {maxAge: 1000 * 60 * 60}
}))

//ENDPOINTS

app.post('/api/register', ctrl.register);
app.post('/api/login', ctrl.login);
app.get('/api/posts', ctrl.getPosts);
app.get('/api/post/:id', ctrl.getPost);
app.post('/api/new/:id', ctrl.createPost);
app.delete('/api/post/:id', ctrl.deletePost)
app.post('/api/auth/logout', ctrl.logout);


massive(CONNECTION_STRING).then(db => {
  app.set('db', db);
  console.log('Database connected')
  app.listen(port, () => console.log(`Server started on ${port}`));
});

