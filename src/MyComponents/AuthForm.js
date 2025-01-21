import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

function AuthForm({ usernamePlaceholder, passwordPlaceholder, buttonText, redirectTo, endpoint }) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleButtonClick = async () => {
        try{
            const response = await axios.post(endpoint , { username,password});

            console.log('response from backend: ', response.data);

            // handle redirection or display success message based on response
            if(response.status === 200 || response.status === 201){
                alert(response.data.message);
                navigate(redirectTo); // redirect to the specified page
            }
            else{
                alert('action failed: ' + response.data.message);
            }
        }catch(error){

            if (error.response) {
                alert('Error: ' + error.response.data.message);
            } else {
                alert('An error occurred. Please try again.');
            }
            console.error('Error:', error);

        }
    }
    return (
        // <div className="container">
        <>
            <Form>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                        Username
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="username" 
                        placeholder={usernamePlaceholder}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} // update state on change
                         />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                        Password
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="password" 
                        placeholder={passwordPlaceholder}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} //update state on change
                        />
                    </Col>
                </Form.Group>
            </Form>

            <Button variant="success" onClick={handleButtonClick}>{buttonText}</Button>

        </>
    );
}

export default AuthForm;