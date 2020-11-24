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
    connectionString : process.env.DATABASE_URL,
    ssl: true,
  }
});

db.select('*').from('users').then(data => {
	console.log(data);
})

const app = express();
app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res) => { res.send('it is working') } catch(err => console.error("not working")) )

app.post('/signIn', (req, res) => { signIn.handleSignIn(req, res, db, bcrypt) }catch(err => console.error("unable to sign in")) )

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) }catch(err => console.error("unable to register")) )

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) }catch(err => console.error(data)) )

app.put('/image', (req, res) => { image.handleImage(req, res, db) }catch(err => console.error("image problem")) )

app.post('/imageUrl', (req, res) => { image.handleApiCall(req, res) }catch(err => console.error("image url invalid")) )


app.listen(process.env.PORT || 3001, ()=>{
	console.log('app is running on ${process.env.PORT}');
})


