require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const cors = require('cors')
/************************ Connecting to MongoDB ************************************/
mongoose.connect(process.env.DB_URI, {useNewUrlParser: true});
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
/************************ Making Session colllection ************************************/
const store = new MongoDBStore({
    uri: process.env.DB_URI,
    collection: 'mySessions'
});
// Catch errors
store.on('error', function(error) {
    console.log(new Error(error));
  });

app.use(session({
secret: process.env.SECRET,
cookie: {
    maxAge: 1000 // 5 seconds
},
store: store,
// Boilerplate options, see:
// * https://www.npmjs.com/package/express-session#resave
// * https://www.npmjs.com/package/express-session#saveuninitialized
resave: true,
saveUninitialized: true
}));

/************************ MIDDLEWARES ************************************/

app.use(express.json());
app.use(cors());

/************************ ROUTING ************************************/
app.use(require('./route/router'))


app.listen(process.env.PORT, ()=> console.log(`listening to http://localhost:${process.env.PORT}`));