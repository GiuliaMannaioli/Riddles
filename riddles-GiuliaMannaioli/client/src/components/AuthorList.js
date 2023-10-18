
import { Table, Form, Button, Nav, Row} from 'react-bootstrap';
import Timer from './Timer';
import { contractIcon, expandIcon } from "./Icons";

import React, { useState } from 'react'
import "./ComponentsStyle.css";



function FilterRiddles(props) {

  const  change= (eventKey) => {
    props.updateFilterCondition(eventKey) ;
    }



    return(<>
          <Nav fill variant="tabs"  onSelect={(e) => {change(e)} }> 
            <Nav.Item>
              <Nav.Link  eventKey="Author"> As Author</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link   eventKey="Open"  >Open</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link  eventKey="Closed" >Closed</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link  eventKey="Create" >Create a new riddle</Nav.Link>
            </Nav.Item>
    </Nav>
        
     </>
    );
  }
  
  
function AuthorList(props) {
    let filteredRiddles = [];
    if (props.filterCondition === "Author") {
        filteredRiddles = props.riddlesauthor;
    }
    else if (props.filterCondition === "Open") {
        filteredRiddles = props.riddles.filter( r  => r.state === 1 ).filter(r=> r.CodU !== props.riddlesauthor[0].CodU);
    }
    else if (props.filterCondition === "Closed") { 
        filteredRiddles = props.riddles.filter( r  => r.state === 0 ).filter(r=> r.CodU !== props.riddlesauthor[0].CodU);
    }

    return(
        <main>
            <Table bordered  hover variant="light" className='table-light'>
                <thead>
                    <tr className="bg-gradient-info">
                        <th className='align-middle'>Question</th>
                        <th className='align-middle'>Difficulty</th>
                       {props.filterCondition === "Author" ? <th className='align-middle'>State</th> :null}
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredRiddles.map((r)=>
                        (<AuthorRow  key={r.CodR} riddle={r} setSelectedRiddle = {props.setSelectedRiddle}  answers={props.answers}  addAnswer={props.addAnswer}
                                    loggedIn={props.loggedIn} getUserById={props.getUserById} riddlesauthor={props.riddlesauthor} winner={props.winner} filterCondition={props.filterCondition}/> ))}
                </tbody> 
            </Table>
        </main>);
}


    function AuthorRow(props) {

      const [expanded, setExpanded] = useState(false);
      

      const  showAnswers= () => {
      setExpanded((was) => !was); 
      props.setSelectedRiddle(props.riddle.CodR);

      }

        return (
            (<>
                <tr  className="align-middle" >
                    <td>{props.riddle.question}</td>
                    <td rowSpan={expanded?"2":"1"}>{props.riddle.difficulty===1 ? 'easy' : props.riddle.difficulty===2 ? 'average' : 'difficult'}</td>
                  {props.filterCondition === "Author" ? <td  rowSpan={expanded?"2":"1"}>{props.riddle.state===0 ? 'closed' : 'open'}</td> : null}
                    <td rowSpan={expanded?"2":"1"}>
                        <Button variant='outline-success' className="text-dark border-light"
                            onClick={() => showAnswers() }>
                            {expanded ? contractIcon : expandIcon}
                        </Button>
                    </td>
                </tr>
                {expanded ? 
                        <> {props.filterCondition === "Author" ? <tr className="bg-white">
                           <td colSpan={1} >{props.answers.map((a)=> <tr  className="align-middle" ><td key={a.CodA+"expand"}>{a.correct===1 ? <>The correct answer is {a.text} given by {props.getUserById(a.CodU) ? <> {props.winner} </> : null }</> : a.text}</td> </tr> )}
                           </td>
               </tr>  : null } </> : null }
                {expanded ? 
                        <> {props.filterCondition === "Closed" ? <tr className="bg-white" >
                           <td colSpan={1}> {props.answers.map((a)=> <tr className="align-middle"><td key={a.CodA+"expand"}>{a.correct===1 ? <>The correct answer is {a.text} given by {props.getUserById(a.CodU) ? <> {props.winner} </> : null }</> : a.text}</td> </tr> )}
                         </td>
               </tr>  : null } </> : null }
               {expanded ? 
                        <> {props.filterCondition === "Open" ? <tr className="bg-white" >
                            <> <td colSpan={1} > <ReplyForm riddlesauthor={props.riddlesauthor}  riddle={props.riddle} setExpanded={setExpanded} addAnswer={props.addAnswer} answers={props.answers}/> </td> </> 
               </tr>  : null } </> : null }
            </>)
        );
    }
   

    function ReplyForm(props){
      
      const [newAnswer, setNewAnswer] = useState(""); 

      const [showReply, setShowReply] = useState(true);

      const [firstTime, setFirstTime] = useState(true);
    
      const handleSubmit1 = (event) => {
        event.preventDefault();
        const ans = {CodR: props.riddle.CodR, text: newAnswer};  
        props.addAnswer(ans);
        setShowReply(false)


      }
      for(let i in props.answers){
        if(props.answers.CodR===props.riddle.CodR && props.answers.codU===props.riddlesauthor.CodU) setFirstTime(false);
      
    
      }
      

      return(<Form onSubmit={handleSubmit1}>
          <Row><Timer addAnswer={props.addAnswer} showReply={showReply} setShowReply={setShowReply} riddle={props.riddle}></Timer></Row>
             
                {firstTime ? <> {showReply ? <Form.Control type="text" required={true}  onChange={event=>{setNewAnswer(event.target.value)}} placeholder="your answer" /> : null }
                 </> : <> You have already answered </> }
                  <br />  
                  {firstTime ? <>{showReply ? <Button  type="submit" > Reply </Button> : null} </>  : null}
              </Form>) 
    }

    function CreateForm(props) {


      const [question, setQuestion] = useState("");
      const [difficulty, setDifficulty] = useState(1);
      const [life, setLife] = useState(0);
      const [hint1, setHint1] = useState("");
      const [hint2, setHint2] = useState("");
      const [answer, setAnswer] = useState("");
    
    
      const handleSubmit2 = (event) => {
        event.preventDefault();
        const riddle = { question: question, difficulty: difficulty, life: life, hint1: hint1,  hint2: hint2 , answer: answer.toLowerCase()};
        props.addRiddle(riddle);
        props.updateFilterCondition("Author")
      }

      return (
          (<>
              <Form onSubmit={handleSubmit2}>
                <Form.Group className="mb-3" controlId="question">
                  <Form.Label>Question</Form.Label>
                  <Form.Control as="textarea" rows={2} required={true} onChange={event=>{setQuestion(event.target.value)}} placeholder="What has to be broken before you can use it?" />
                
                  <br />
             
                  <Form.Label>Hint 1</Form.Label>
                  <Form.Control type="text" required={true} onChange={event=>{setHint1(event.target.value)}} placeholder="we can eat it" />
                  <br />  
                  <Form.Label>Hint 2</Form.Label>
                  <Form.Control type="text" required={true} onChange={event=>{setHint2(event.target.value)}} placeholder="..." />
                  <br />
                  <Form.Label>Answer</Form.Label>
                  <Form.Control type="text" required={true} onChange={event=>{setAnswer(event.target.value)}} placeholder="egg" />
                  <br />  
                  <Form.Label>Difficulty</Form.Label>
                  <Form.Select aria-label="select difficulty" required={true} onChange={event=>{setDifficulty(event.target.value)}} > 
                    <option value="1">easy</option>
                    <option value="2">average</option>
                    <option value="3">difficult</option>
                  </Form.Select>
                  <Form.Label for="timepicker-valid" required={true}  >Time to answer</Form.Label>
                  <Form.Select aria-label="select lifetime" onChange={event=>{setLife(event.target.value)}} >
                    <option value="30">00:30</option>
                    <option value="60">01:00</option>
                    <option value="90">01:30</option>
                    <option value="120">02:00</option> 
                    <option value="150">02:30</option>
                    <option value="180">03:00</option>
                    <option value="210">03:30</option>
                    <option value="240">04:00</option>
                    <option value="270">04:30</option>
                    <option value="300">05:00</option>
                    <option value="330">05:30</option>
                    <option value="360">06:00</option>
                    <option value="390">06:30</option>
                    <option value="420">07:00</option>
                    <option value="450">07:30</option>
                    <option value="480">08:00</option>
                    <option value="510">08:30</option>
                    <option value="540">09:00</option>
                    <option value="570">09:30</option>
                    <option value="600">10:00</option>
                  </Form.Select> 
                
                </Form.Group>
                <Button type="submit"    >Publish</Button>
                <br />  
                <br />  
              </Form>
          </>)
      );
  }


export  {FilterRiddles, AuthorList, CreateForm};
