'use strict';

import "./ComponentsStyle.css";
import { LoginForm } from './Authentication';
import {FilterRiddles, AuthorList, CreateForm} from './AuthorList';
import { Button, Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';



function NotFoundRoute() {
    return(
        <>
          <h2>This is not the route you are looking for!</h2>
          <Link to="/">
            <Button variant="primary">Go Home!</Button>
          </Link>
        </>
    );
  }
  
  function LoginRoute(props) {
    return(
      <>
          <Col>
            <Row>
                <LoginForm  login={props.login} />
            </Row>
            <Row>
                <OpenAnonymousButton setAnonymous={props.setAnonymous}></OpenAnonymousButton>
            </Row>
          </Col>
      </>
    );
  }

  function OpenAnonymousButton(props) {

    const navigate = useNavigate();
    return(
      <Row>
        <Col >
          <Button className="log" onClick={()=>{navigate('/anonymous'); props.setAnonymous(true);} }>Enter As anonymous</Button>
        </Col>
      </Row>
    )
  }

  function AuthorRoute(props) {

    return(
      <Row>
        <Col >
        <FilterRiddles updateFilterCondition = {props.updateFilterCondition} />
        {/* </Col>
        <Col> */}
        {props.filterCondition === "Create" ? <CreateForm addRiddle={props.addRiddle} updateFilterCondition = {props.updateFilterCondition} > </CreateForm> 
              : <AuthorList addAnswer={props.addAnswer} setSelectedRiddle = {props.setSelectedRiddle} riddlesauthor={props.riddlesauthor} riddles={props.riddles} 
                       winner={props.winner} filterCondition = {props.filterCondition}  answers={props.answers} getAnswers={props.getAnswers} getUserById={props.getUserById}></AuthorList>
        }</Col>
      </Row>
    )
  }

  

  export {AuthorRoute, LoginRoute, NotFoundRoute};