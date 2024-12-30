import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function AuthForm({ usernamePlaceholder, passwordPlaceholder, buttonText, redirectTo }) {
    const navigate = useNavigate();
    const handleButtonClick = () => {
        navigate(redirectTo); // redirect to the specified page
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
                        <Form.Control type="username" placeholder={usernamePlaceholder} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                        Password
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="password" placeholder={passwordPlaceholder} />
                    </Col>
                </Form.Group>
            </Form>
            <Button variant="success" onClick={handleButtonClick}>{buttonText}</Button>

        </>
    );
}

export default AuthForm;