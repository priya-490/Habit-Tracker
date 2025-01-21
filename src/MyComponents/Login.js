// import Col from 'react-bootstrap/Col';
// import Form from 'react-bootstrap/Form';
// import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import AuthForm from './AuthForm';
import { Link } from 'react-router-dom';


function LoginPage() {
    return (
        <>
            <div className="container">
                <AuthForm

                    usernamePlaceholder="Enter your username"
                    passwordPlaceholder="Enter your password"
                    buttonText = "Login"
                    redirectTo = "/mainPage"
                    endpoint = "http://127.0.0.1:5000/login"  //login endpoint

                />
                <br />

                <span>dont have an account?</span>

                <Link to = "/signup"><Button variant="link">sign up</Button></Link>

            </div>
        </>
    );

}

function SignupPage() {
    return (
        <>
            <div className='container'>

                <AuthForm
                    usernamePlaceholder= "Choose a username"
                    passwordPlaceholder= "Set your password"
                    buttonText= "Sign Up"
                    redirectTo= '/'
                    endpoint = "http://127.0.0.1:5000/signup" // signup endpoint
                />

            </div>
        </>
    );
}

export { LoginPage, SignupPage };