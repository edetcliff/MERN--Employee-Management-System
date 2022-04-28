import React, {} from 'react';
import {Container, Nav, Navbar} from 'react-bootstrap';

 function Header(){
    return (
        
        <Navbar collapseOnSelect expand = "lg" bg ="dark" variant = "dark">
                <Container>
                    <Navbar.Brand>Employee Management System</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href ="/" >
                                {/* <Link to="/">Home</Link> */}
                                Home
                            </Nav.Link>
                            <Nav.Link href = "/add">
                                {/* <Link to="/newUser">Add A User</Link> */}
                                Add Employee
                            </Nav.Link>                            
                        </Nav>
                    </Navbar.Collapse>                    
                </Container>
            </Navbar>

        
    )
}
export default Header;