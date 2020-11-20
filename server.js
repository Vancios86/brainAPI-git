const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signIn = require('./controllers/signIn');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '123',
    database : 'brain-db'
  }
});

db.select('*').from('users').then(data => {
	console.log(data);
})

const app = express();
app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res) => { res.send(database.users) } )

app.post('/signIn', (req, res) => { signIn.handleSignIn(req, res, db, bcrypt) } )

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) } )

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) } )

app.put('/image', (req, res) => { image.handleImage(req, res, db) } )

app.post('/imageUrl', (req, res) => { image.handleApiCall(req, res) } )


app.listen(process.env.PORT || 3001, ()=>{
	console.log('app is running on ${process.env.PORT}');
})

