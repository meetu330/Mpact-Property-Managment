import React from "react"; 
import { Link } from 'react-router-dom';

import { Navbar, Nav,Container} from 'react-bootstrap';


const Header = () =>{
    return(
        <div className="header">
        <Navbar variant="dark" bg="dark" expand="lg">
            <Container fluid>
            <Nav>
                    <Nav.Link to="/"> <Link to="/" className="link home">REACT APP</Link></Nav.Link>
            </Nav>
                <Navbar.Toggle aria-controls="navbar-dark-example" />
                <Navbar.Collapse id="navbar-dark-example">
                <Nav>
                    <Nav.Link> <Link to="/csv" className="link home">Upload</Link></Nav.Link>
                    

                    <Nav.Link><Link to="/importdata" className="link1 home">Inner Import Data</Link></Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        </div>

        
    )
}

export default Header;