-- Table: users
CREATE TABLE users (id INTEGER PRIMARY KEY NOT NULL, nickname VARCHAR (100) NOT NULL, username VARCHAR (100) NOT NULL, hash VARCHAR (64) NOT NULL, salt VARCHAR (32) NOT NULL, ranking INTEGER);
INSERT INTO users (id, nickname, username, hash, salt, ranking) VALUES (1, 'Giul629', 'giulia.mannaioli@gmail.com', '68041ca0df961cdbea8d3e10053412903f47ed910e36d0b2fd06f8fa3f4dd35a', 'lz1syZdFvZcTYv4n', 8);
INSERT INTO users (id, nickname, username, hash, salt, ranking) VALUES (2, 'Virgo', 'virginia.mazzei@gmail.com', 'd2f95c32a4000ed37f7bd4c905626b53a92283a37a28e8cb46295757f994ca96', 'LzWXloQmDK9iDq5O', 8);
INSERT INTO users (id, nickname, username, hash, salt, ranking) VALUES (3, 'MartaSbuc', 'marta.delellis@hotmail.it', '8c8072024a2ec4eb2e695c212c047596725753eb807eb1caa7a95e1c0d374347', 'Gr3wipbV1TtQz4Il', 0);
INSERT INTO users (id, nickname, username, hash, salt, ranking) VALUES (4, 'Lucaz', 'luca.zanetti@polito.it', '9d34b1367ff2bfa298fb47bd03aeea6180a308f068cac3c6094f75add99e4c1d', 'QImbT1PPhj3IvFZq', 4);
INSERT INTO users (id, nickname, username, hash, salt, ranking) VALUES (5, 'Edoske', 'edoardo.pelosin@gmail.com', 'a5ff94feccfa7aec0c3aceab763445cc8c910b170f40622e287a0934b84af3a5', 'KNCpVDf7I1QmWYHn', 3);
INSERT INTO users (id, nickname, username, hash, salt, ranking) VALUES (6, 'Davidello', 'davide.aiello@gmail.com', '68041ca0df961cdbea8d3e10053412903f47ed910e36d0b2fd06f8fa3f4dd35a', 'lz1syZdFvZcTYv4n', 3);


CREATE TABLE answers (CodA INTEGER PRIMARY KEY NOT NULL, CodR INTEGER NOT NULL, CodU INTEGER NOT NULL, text TEXT , correct INTEGER NOT NULL DEFAULT(0)) 


CREATE TABLE riddles (CodR INTEGER PRIMARY KEY NOT NULL, CodU INTEGER NOT NULL, question TEXT NOT NULL, difficulty INTEGER DEFAULT(1), life INTEGER NOT NULL, hint1 TEXT, hint2 TEXT, state INTEGER NOT NULL, answer TEXT, startTimer DATETIME);

INSERT INTO riddles (CodR, CodU, question, difficulty, life, hint1, hint2, state, answer, startTimer) VALUES (1,	3,	'What has to be broken before you can use it?',	1,	2,	'hen'	,'chicken',	0	,'egg',NULL);
INSERT INTO riddles (CodR, CodU, question, difficulty, life, hint1, hint2, state, answer, startTimer) VALUES (2,	3,	'I’m tall when I’m young, and I’m short when I’m old. What am I?',	1,	3,	'I burn at the top',	'I melt',	0,	'candle',	NULL);
INSERT INTO riddles (CodR, CodU, question, difficulty, life, hint1, hint2, state, answer, startTimer) VALUES (3,	3,	'What month of the year has 28 days?',	1,	2,	'It is not only february',	'It is not onlyone',	1,	'all',	NULL);
INSERT INTO riddles (CodR, CodU, question, difficulty, life, hint1, hint2, state, answer, startTimer) VALUES (4,	2,	'What is full of holes but still holds water?',	1,	3,	'It is soft',	'It comes from the sea',	1,	'sponge',	NULL);
INSERT INTO riddles (CodR, CodU, question, difficulty, life, hint1, hint2, state, answer, startTimer) VALUES (5,	2,	'What goes up and down but doesn’t move?',	2,	4,	'It can be high','It can be service ..',	0,	'staircase',	NULL);
INSERT INTO riddles (CodR, CodU, question, difficulty, life, hint1, hint2, state, answer, startTimer) VALUES (6,	2,	'It belongs to you, but other people use it more than you do. What is it?',	2,	3, 'You can have more than one','It is not a material object',	0,	'name',	NULL);
INSERT INTO riddles (CodR, CodU, question, difficulty, life, hint1, hint2, state, answer, startTimer) VALUES (8,	1,	'I shave every day, but my beard stays the same. What am I?',	2,	4,	'I am always standing', 'It is my job',	0,	'barber',	NULL);
INSERT INTO riddles (CodR, CodU, question, difficulty, life, hint1, hint2, state, answer, startTimer) VALUES (7,	1,	'What gets wet while drying?',	1,	2,	'It is soft', 	'You use it everyday',	1,	'towel',NULL);
INSERT INTO riddles (CodR, CodU, question, difficulty, life, hint1, hint2, state, answer, startTimer) VALUES (9,	1,	'What can’t talk but will reply when spoken to?',	2,	5,	'Sometimes it replies loudly',	'Sometimes it is unsettling',	0,	'echo',	NULL);
INSERT INTO riddles (CodR, CodU, question, difficulty, life, hint1, hint2, state, answer, startTimer) VALUES (10,	5,	'The more of this there is, the less you see. What is it?',	3,	4,	'It can be scary',	'It makes you see the stars',	0,	'darkness',	NULL);
