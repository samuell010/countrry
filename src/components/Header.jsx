import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import { auth, logout } from "../auth/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Header = () => {
  const [user] = useAuthState(auth);

  return (
    <Container fluid>
      <Row>
        <Navbar bg="light" variant="light" className="w-100">
          <Container>
            <Navbar.Brand href="/">MyApp</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Link to="/" className="nav-link">
                  Home
                </Link>
                <Link to="/countries" className="nav-link">
                  Countries
                </Link>
                <Link to="/favourites" className="nav-link">
                  Favourites
                </Link>
              </Nav>
              <Nav>
                {!user ? (
                  <>
                    <Link to="/register" className="nav-link">
                      Register
                    </Link>
                    <Link to="/login" className="nav-link">
                      Login
                    </Link>
                  </>
                ) : (
                  <>
                    <span className="navbar-text me-3">
                      Welcome, {user.displayName || user.email}
                    </span>
                    <Button variant="outline-secondary" onClick={logout}>
                      Logout
                    </Button>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Row>
    </Container>
  );
};

export default Header;
