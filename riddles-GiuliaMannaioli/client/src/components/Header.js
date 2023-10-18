import {Navbar, Container, Nav, Col, Row, Button} from "react-bootstrap";
import { questionIcon } from "./Icons";
import { LogoutButton } from "./Authentication";
import { useNavigate } from 'react-router-dom';

import "./ComponentsStyle.css";



function HomeButton(props) {
  
    const navigate = useNavigate();
    return(
      <Row>
        <Col >
          <Button className="log" onClick={()=>{navigate('/');  props.setAnonymous(false);} }>Home</Button>
        </Col>
      </Row>
    )
  }
  
function Header(props) {


    return(
      <Container fluid>
        <Navbar>         
            <Navbar.Brand>
            <h1>Riddle {questionIcon} </h1>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Nav className="justify-content-flex-end me-auto">
                </Nav>
                 <Nav>
                   {props.anonymous && <HomeButton setAnonymous={props.setAnonymous}/>}
                   {props.loggedIn && <LogoutButton logout={props.logout} />}
                 </Nav>
         </Navbar>
     </Container>
      
    );
}

export{Header};