'use strict'

const { db } = require('./db');

exports.getAllRiddles=()=>{
    return new Promise((resolve, reject)=>{
        const sql='SELECT * FROM riddles';
        db.all(sql,[],(err,rows)=>{
            if (err) {
                reject(err);
             }
             resolve(rows);
        });
    })
}

exports.getRiddlesbyAuthor=(user)=>{
    return new Promise((resolve, reject)=>{
        const sql= 'SELECT * FROM riddles WHERE CodU = ?';
        db.all(sql,[user],(err,rows)=>{
            if (err) {
                console.log(err);
                reject(err);
            }
            resolve(rows);
        });
    })
}

exports.addRiddle = (riddle, user) => {
 
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO riddles( CodU, question, difficulty, life, hint1, hint2, state, answer, startTimer) VALUES( ?, ?, ?, ?, ?, ? , ?, ?, ?)';
      db.run(sql, [user, riddle.question, riddle.difficulty, riddle.life, riddle.hint1, riddle.hint2,  1 , riddle.answer, 0], (err, row) => {
        if(err){
            console.log(err);
            reject(err);
        }
        else {
          resolve(this.lastID);
        }
      });
    });
  };
  
  exports.addAnswer = (answer, user, correct) => { 

    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO answers(CodR, CodU, text, correct) VALUES( ?, ?, ?, ?)';
      db.run(sql, [answer.CodR, user, answer.text, correct], (err, row) => {
        if(err){
            console.log(err);
            reject(err);
        }
        else {
          resolve(this.lastID);
          
        }
      });
    });
  };
  
  
exports.getCorrectAnswer=(CodR)=>{
    return new Promise((resolve, reject)=>{
        const sql='SELECT answer, difficulty FROM riddles WHERE CodR = ?';
        db.get(sql,[CodR],(err,rows)=>{
            if (err) {
                reject(err);
             }
             resolve(rows);
        });
    })
}

exports.setClosed = (CodR) => {
    return new Promise((resolve, reject) => {
      const sql = 'UPDATE riddles SET state=? WHERE CodR=?';
      db.run(sql, [0 , CodR], function(err) {
        if(err) reject(err);
        else resolve(this.lastID);
      });
    });
  };

  exports.addScore = (score, user) => {
    return new Promise((resolve, reject) => {
      const sql = 'UPDATE users SET ranking=? WHERE id=?';
      db.run(sql, [user.ranking + score, user.id], function(err) {
        if(err) reject(err);
        else resolve(this.lastID);
      });
    });
  };

  exports.setTimer = (now, codR) => {
    return new Promise((resolve, reject) => {
      const sql = 'UPDATE riddles SET startTimer=? WHERE CodR=?';
      db.run(sql, [now ,codR], function(err) {
        if(err) reject(err);
        else resolve(this.lastID);
      });
    });
  };


exports.getRanking=()=>{
 
    return new Promise((resolve, reject)=>{
        const sql = "WITH cte AS ( SELECT *, DENSE_RANK() OVER (ORDER BY ranking DESC) rnk FROM users) SELECT id, nickname, ranking FROM cte WHERE rnk <= 3;"
        db.all(sql,[],(err,rows)=>{
            if (err) {
                reject(err);
             }
            
             resolve(rows);
        });
    })
}


exports.getAnswers=(CodR, cod)=>{
  if(cod===undefined){
    return new Promise((resolve, reject)=>{
      const sql= 'SELECT * FROM answers WHERE CodR = ?';
      db.all(sql,[CodR.riddle],(err,rows)=>{ 
          if (err) {
              reject(err);
           }
          
           resolve(rows);
      });
  })
  }else{
    return new Promise((resolve, reject)=>{
      const sql= 'SELECT * FROM answers WHERE CodR = ?';
      db.all(sql,[CodR],(err,rows)=>{
          if (err) {
              reject(err);
           }
          if(rows.lenght>0)resolve(rows);
          else resolve(false)
      });
  })
  }
}

