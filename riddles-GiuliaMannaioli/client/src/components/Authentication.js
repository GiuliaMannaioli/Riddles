
import "./ComponentsStyle.css";
import { useState } from 'react';
import {Form, Button, Row, Col} from 'react-bootstrap';

function LoginForm(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  

// the submission of the form will cause the clien to send a login request to the server
  const handleSubmit = (event) => {
      event.preventDefault();
      const credentials = { username, password };

      props.login(credentials);
  };

  return (
    <div className="Login below-nav main-content text-center">
      <h2>Login</h2>
    <Form onSubmit={handleSubmit} className="formLogin">
      <Form.Group size="lg" controlId='username'>
          <Form.Label> E-mail</Form.Label>
          <Form.Control autoFocus type='email' value={username} onChange={ev => setUsername(ev.target.value)} required={true} />
      </Form.Group>

      <Form.Group size="lg" controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' value={password} onChange={ev => setPassword(ev.target.value)} required={true} minLength={6}/>
      </Form.Group>
      <Button className="loginform" type = "submit" >Login</Button>
  </Form>
  </div>
  )
};


  
function LogoutButton(props) {
  
  return(
    <Row>
       <Col>
          <Button className="log" variant="success" onClick={props.logout}>Logout</Button>
      </Col>
    </Row>
  )
}




  export {LogoutButton, LoginForm};