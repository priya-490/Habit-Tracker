import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Header() {
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand>Habit Tracker</Navbar.Brand>
                </Container>
            </Navbar>
            <br />

        </>
    );
}

export default Header;