const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');
var path = require('path');
const bcrypt = require('bcrypt-nodejs');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');

const db = knex({
  client : 'pg',
  connection : {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'root',
    database : 'dbase'
  }
  });
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));


app.post('/signin',  (req,res) => signin.handleSignin(req,res,db, bcrypt))

app.post('/register', (req,res) => register.handleRegister(req,res,db, bcrypt))

app.post('/clarifai', (req,res) => image.handleClarifai(req,res));

app.put('/image', (req,res) => image.entryCount(req,res,db))

app.get('/*',(req,res)=>{
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
})
app.listen(process.env.PORT || 3030, () =>{
    console.log(`App runnning on ${process.env.PORT}`);
})






// app.get('/profile/:id', (req, res) =>{
//     const {id} = req.params;
//     let found = false;
//     database.users.forEach(user =>{
//         if(user.id === id){
//             found = true;
//             return res.send(user[0]);
//         }
//     })
//     if(!found){
//         res.status(400).json("Not Found");
//     }
// })