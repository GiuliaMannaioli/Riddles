'use strict';

const dayjs = require('dayjs');

const express = require('express');

 // logging middleware
const morgan = require('morgan');
const cors = require('cors');

// Passport-related imports
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');

// init express
const app = new express();
const port = 3001;

// set up the middlewares
app.use(morgan('dev'));
app.use(express.json()); // for parsing json request body

const riddleDao = require('./RiddleDao'); // module for accessing the DB
const userDao = require('./UserDao'); // module for accessing the DB
const { request } = require('express');

// set up and enable cors
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true, //così da permettere l'invio del cookie
};
app.use(cors(corsOptions));

// Passport: set up local strategy
passport.use(new LocalStrategy(async function verify(username, password, cb) {
  const user = await userDao.getUser(username, password)
  if(!user) 
    return cb(null, false, 'Incorrect username or password.'); //cb = CALLBACK
    
  return cb(null, user);
}));


passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (user, cb) { // this user is id + username + nickname
  return cb(null, user);
  // if needed, we can do extra check here (e.g., double check that the user is still in the database, etc.)
});


const isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({error: 'Not authorized'});
}


app.use(session({
  secret: "shhhhh... it's a secret!",
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.authenticate('session'));


app.post('/api/sessions', passport.authenticate('local'), (req, res) => {
  res.status(201).json(req.user);
});


// GET /api/sessions/current
app.get('/api/sessions/current', async (req, res) => {
  try{
  if(req.isAuthenticated()) {
    const r = await userDao.getUserById(req.user.id)
    res.json(r);
  }else res.status(401).json({error: 'Not authenticated'});
  }catch (error) {
    throw error;
  }
});

// DELETE /api/session/current
app.delete('/api/sessions/current', (req, res) => {
  req.logout(() => {
    res.end();
  });
});

//getuserbyid

app.get('/api/users/:id', async (req, res) => {
  const id = req.params.id;

  if(id === null || id === undefined){
    return res.status(422).end();
  }
  try{
      const user = await userDao.getUserById(id);
      res.status(200).json(user);
  }catch{
      res.status(500).end();
  }
});

//   RIDDLE API

app.get('/api/riddles', (req, res) => {
  riddleDao.getAllRiddles()
      .then((r) => {
          return res.status(200).json(r);
      })
      .catch((e) => {
          return res.status(500).end();
      });
})

//  RIDDLE BY AUTHOR API

app.get('/api/riddlesauthor', isLoggedIn, (req, res) => {

  const id = req.user.id;
  if (id === null || id === undefined )  return res.status(422).end();
 
  riddleDao.getRiddlesbyAuthor(id)
      .then((r) => {
          return res.status(200).json(r);
      })
      .catch((e) => {
          return res.status(500).end();
      });
})

//add riddle by author


app.post('/api/riddlesauthor', (req, res) => {
  const id = req.body.user.id;
  const riddle = req.body;
  if (id === null || id === undefined 
            || riddle === null || riddle === undefined || riddle.lenght === 0 )  return res.status(422).end();
  riddleDao.addRiddle(riddle, id)
      .then((r) => {
          return res.status(200).json(r);
      })
      .catch((e) => {
          return res.status(500).end();
      });
})

//add answer

app.post('/api/answers/:answer', async (req, res) => { 


  const id = req.body.user.id;
  const answer = req.body;
  let correct = 0;
  const codR = answer.CodR;
  // let answers = [];
  let now = dayjs();
 

  if (id === null || id === undefined 
            || answer === null || answer === undefined  )  return res.status(422).end();
  try{
    if(answer.text==="TimeIsOver") {
      await riddleDao.setTimer(null, codR);
      await riddleDao.setClosed(codR);
    }else{
      let answers = await riddleDao.getAnswers(codR, 1);
      if(answers===false) await riddleDao.setTimer(now, codR); 
      let cor = await riddleDao.getCorrectAnswer(codR);
      if(cor.answer == answer.text.toLowerCase()) correct=1;
      if(correct===1) {
          await riddleDao.setClosed(codR);
          await riddleDao.setTimer(null, codR); //Si rimette a NULL quando danno la risposta corrretta
          await riddleDao.addScore(cor.difficulty, req.body.user);
      }
      await riddleDao.addAnswer(answer, id, correct)
      res.status(201).end();
  }
  }catch{
      res.status(500).end();
}
});


//   RANKING API

app.get('/api/ranking', (req, res) => {
  riddleDao.getRanking()
      .then((r) => {
          return res.status(200).json(r);
      })
      .catch((e) => {
          return res.status(500).end();

      });
})

//   answers API

app.get('/api/:riddle/answers', (req, res) => {
  riddleDao.getAnswers(req.params) //è l id giusto
      .then((r) => {
          return res.status(200).json(r);
      })
      .catch((e) => {
          return res.status(500).end();

      });
})



//   answers API

app.get('/api/answer/:answer', (req, res) => {
  riddleDao.getWinner(req.params) //è l id giusto
      .then((r) => {
          return res.status(200).json(r);
      })
      .catch((e) => {
          return res.status(500).end();

      });
})




// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});