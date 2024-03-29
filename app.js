import parsedBody from 'body-parser';
import express from 'express';
import session from 'express-session';
import http from 'http';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import router from './router.js';
import addUserData from './middleware/addUserData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

// Template engine
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(parsedBody.urlencoded({ extended: false }));

app.use(session({
  secret: 'My-Super-Secret',
  saveUninitialized: true,
  resave: true
}))
app.use((req, res, next) => {
  res.locals.isLoggedIn = req.session.isLoggedIn;
  res.locals.email = req.session.userEmail;
  res.locals.userId = req.session.userId;
  next()
})

// Router
app.use(router);
app.use(addUserData);


const server = http.createServer(app);
const port = 3001;
server.listen(port);

console.log(`listening on port http://localhost:${port}`);