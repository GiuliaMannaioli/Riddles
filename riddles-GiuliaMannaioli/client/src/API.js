'use strict';

const SERVER_URL = 'http://localhost:3001';

// RIDDLE APIs ---------------------------------------------------------------



//GET APIs
async function getAllRiddles() {
  const url = SERVER_URL + '/api/riddles';
  try {
      const response = await fetch(url, {
          method: 'GET',
          credentials: 'include'
      });
      if (response.ok) {
          const list = await response.json();
          return list;
      } else {
          const text = await response.text();
          throw new TypeError(text);
      }
  } catch (err) {
      throw err;
  }

}

async function getRiddlesbyAuthor() {

  const url = SERVER_URL + '/api/riddlesauthor';
  try {
      const response = await fetch(url, {
          method: 'GET',
          credentials: 'include'
      });
      if (response.ok) {
          const list = await response.json();
          return list;
      } else {
          const text = await response.text();
          throw new TypeError(text);
      }
  } catch (err) {
      throw err;
  }

}


async function getRanking() {
  const url = SERVER_URL + '/api/ranking';

  try {
      const response = await fetch(url, {
          method: 'GET',
          credentials: 'include'
      });
      if (response.ok) {
          const list = await response.json();
          return list;
      } else {
          const text = await response.text();
          throw new TypeError(text);
      }
  } catch (err) {
      throw err;
  }

}

async function getAnswers(riddle) {
  const url = SERVER_URL + `/api/${riddle}/answers`;

  try {
      const response = await fetch(url, {
          method: 'GET',
          credentials: 'include'
      });
      if (response.ok) {
          const list = await response.json();
          return list;
      } else {
          const text = await response.text();
          throw new TypeError(text);
      }
  } catch (err) {
      throw err;
  }

}

//POST APIs

async function addRiddle(riddle, user){
  const url = `${SERVER_URL}/api/riddlesauthor`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({user : user, question: riddle.question, difficulty: riddle.difficulty,
                               life: riddle.life, hint1: riddle.hint1, hint2: riddle.hint2, answer: riddle.answer})
  });

  if (!response.ok) {
    const text = await response.text();
    throw new TypeError(text);
  }
  } catch (err) {
  throw err;
  }
}


async function addAnswer(answer, user){
  const url = `${SERVER_URL}/api/answers/${answer.CodR}`;
  ;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({user : user, CodR: answer.CodR, text: answer.text})
  });

  if (!response.ok) {
    const text = await response.text();
    throw new TypeError(text);
  }
  } catch (err) {
  throw err;
  }
}


async function getUserById(id) {
  const url = SERVER_URL + `/api/users/${id}`;

  try {
      const response = await fetch(url, {
          method: 'GET',
          credentials: 'include'
      });
      if (response.ok) {
          const list = await response.json();
          return list;
      } else {
          const text = await response.text();
          throw new TypeError(text);
      }
  } catch (err) {
      throw err;
  }

}


// SESSION APIs ---------------------------------------------------------------
const logIn = async (credentials) => {
  const response = await fetch(`${SERVER_URL}/api/sessions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(credentials),
  });
  if(response.ok) {
    const user = await response.json();
    return user;
  }
  else {
    const errDetails = await response.text();
    throw errDetails;
  }
};

const getUserInfo = async () => {
  const response = await fetch(`${SERVER_URL}/api/sessions/current`, {
    credentials: 'include',
  });
  const user = await response.json();
  if (response.ok) {
    return user;
  } else {
    throw user;  // an object with the error coming from the server
  }
};

const logOut = async() => {
  const response = await fetch(`${SERVER_URL}/api/sessions/current`, {
    method: 'DELETE',
    credentials: 'include'
  });
  if (response.ok)
    return null;
}









  
  const API = {getUserById, getAnswers, getAllRiddles, getRiddlesbyAuthor, addAnswer, addRiddle, getRanking, logIn, logOut, getUserInfo};
  export default API;