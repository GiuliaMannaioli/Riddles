
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

import API from './API';

import { BrowserRouter, Routes, Route, Navigate, Outlet} from 'react-router-dom';
import { AuthorRoute, LoginRoute, NotFoundRoute} from './components/Views';
import { Container, Row, Alert, Col} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Header } from "./components/Header";
import RankList from './components/RankList';
import AnonymousList from './components/AnonymousList';



function App() {

  
  // loggedIn flag to indicate whether a user is authenticated or not.
  const [loggedIn, setLoggedIn] = useState(false);
  // user variable used for storing information about current user
  const [user, setUser] = useState();
  // message to show to user
  const [message, setMessage] = useState("");
  //all riddles
  const [riddles, setAllRiddles] = useState([]); 
  //riddles published by the user 
  const [riddlesauthor, setRiddlesByAuthor] = useState([]); 
  //all rank
  const [ranking, setRanking] = useState([]); 
  //to set the anonymous mode
  const [anonymous, setAnonymous] = useState(false);
  //create state of Application: set default to author
  const [filterCondition, setFilterCondition] = useState("Author");
  //to show the answers
  const [selectedRiddle,  setSelectedRiddle] = useState();
  
  const [answers,  setAnswers] = useState([]);


  const [winner,  setWinner] = useState([]);

  


  useEffect(() => {
    const checkAuth = async () => {
      try{
        const user_info = await API.getUserInfo();
        setLoggedIn(true);
        setUser(user_info);
      }
      catch(err){
        // console.log(err);
      }
    };
    checkAuth();
  }, []);

  // functions to handle login and logout
  const handleLogin = async (credentials) => {
    try {
      const user_info = await API.logIn(credentials);
      setLoggedIn(true);
      setUser(user_info);
      setMessage({msg: `Welcome, ${user_info.nickname}!`, type: "success"});
    }catch(err) {
      console.log(err);
      setMessage({msg: 'Incorrect username or password', type: "danger"});
    }
  };

  const handleLogout = async () => {
    await API.logOut();
    setLoggedIn(false);
    setUser();
    // clean up everything
    setMessage("");
  };


//riddles


const getRiddles = async() => {
  const riddlesList = await API.getAllRiddles();
  setAllRiddles(riddlesList);
};


const getRiddlesByAuthor = async() => {
  const riddlesList = await API.getRiddlesbyAuthor(user);
  setRiddlesByAuthor(riddlesList);
};


const getRanking = async() => {
  const rankingList = await API.getRanking();
  setRanking(rankingList);
};


const getAnswers = async() => {
  const answerList = await API.getAnswers(selectedRiddle);
  setAnswers(answerList);
};


const getUserById = async(codwin) => {
  const nicknamewin= await API.getUserById(codwin)
  setWinner(nicknamewin.nickname)
};


const addRiddle = (riddle) => {
  API.addRiddle(riddle, user).then(()=> refreshData());
}

const addAnswer = (answer) => {
  API.addAnswer(answer, user).then(()=> refreshData());
}


const refreshData = () => {
  if(loggedIn) {
    getRiddlesByAuthor();
  }
  getRanking();
  getRiddles();
  getAnswers();
}

useEffect(() => {
  refreshData();
}, [loggedIn, selectedRiddle]);



// useEffect(() => {
//     const timer = setInterval(update, 1000);
//     return () => clearInterval(timer);
// });



 //create function to modify films
 const updateFilterCondition = (newFilterCondition) => {
  setFilterCondition(newFilterCondition);
 
}

  return (
  <Container fluid className='App'>
  <BrowserRouter>
    <Routes>
      <Route element={<AppLayout />}> 
            <Route path="/" element={  
                loggedIn ? <Navigate replace to='/author'/>  : <LoginRoute login={handleLogin} message={message} 
                                                                               setMessage={setMessage} setAnonymous={setAnonymous}/>
            } />
            <Route path='/anonymous' element={ 
                loggedIn ? <Navigate replace to='/'/> :<AnonymousList riddles={riddles} loggedIn={loggedIn}/>
            } />
            <Route path='/author' element={ 
              loggedIn ? <AuthorRoute  riddlesauthor={riddlesauthor} riddles={riddles} updateFilterCondition = {updateFilterCondition}  getAnswers={getAnswers} answers={answers} winner={winner}
                                                                  filterCondition={filterCondition} addRiddle={addRiddle} setSelectedRiddle = {setSelectedRiddle} getUserById={getUserById} addAnswer={addAnswer}> </AuthorRoute> : <Navigate replace to='/'/> 
            } />
            <Route path='*' element={ <NotFoundRoute/> 
            } />

      </Route>


    </Routes>
  </BrowserRouter> 
  </Container>
  );

// layout for our page, header and sidebar al always on display, while the main changes.
function AppLayout() {
  return (<Container className='bg-light'>
  <Row className='align-middle'>
  <Header logout = {handleLogout} loggedIn= {loggedIn} anonymous={anonymous} setAnonymous={setAnonymous} />
  </Row>
  {message && <Row>
    <Alert variant={message.type} onClose={() => setMessage('')} dismissible>{message.msg}</Alert>
  </Row>} 
    <Row>
    <Col>
    <Outlet></Outlet>
    </Col>
    <Col xs={2} >
    <RankList rank={ranking} loggedIn={loggedIn}/>
    </Col>
  </Row>

</Container>)
}
}

export default App;
