import React, { useContext } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider';

const Header = () => {
    const { user, logout } = useContext(AuthContext);
    const handleLogOut = () => {
        logout()
            .then(() => { })
            .catch((error) => console.log(error.message))
    }
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Link to='/' className="navbar-brand">Task</Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to='/addTask' className='nav-link'>Add Task</Link>
                        <Link to='/myTask' className='nav-link'>My Task</Link>
                        <Link to='/completedTasks' className='nav-link'>Completed Tasks</Link>
                        {
                            user?.uid ?
                                <>
                                    <Link to='/' onClick={handleLogOut} className='nav-link'>Logout</Link>
                                </>
                                :
                                <Link to='/login' className='nav-link'>Login</Link>
                        }
                        <Link to='/about' className='nav-link'>About</Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;