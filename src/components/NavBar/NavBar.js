import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "../../store/user/selectors";
import { logOut } from "../../store/user/slice";
import { clearSerieById } from "../../store/serie/slice";
import { fetchSerieByName } from "../../store/serie/thunks";
import { NavLink } from "react-router-dom";
import "./index.css";
export const NavBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const navigate = useNavigate();

  const clearUser = () => {
    dispatch(logOut());
    navigate("/");
  };

  const onChangeSearch = (event) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
  };

  const onSearch = (event) => {
    event.preventDefault();
    dispatch(fetchSerieByName(searchTerm));
    dispatch(clearSerieById());
    navigate("/search");
  };

  return (
    <Navbar expand="lg">
      <Container fluid className="navbar">
        <Navbar.Brand className="links">WATCHLIST</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link onClick={() => navigate("/")} className="links">
              Home
            </Nav.Link>
            {token && (
              <Nav.Link onClick={() => navigate("/mylists")} className="links">
                My Lists
              </Nav.Link>
            )}
            {token && (
              <Nav.Link onClick={clearUser} className="links">
                Logout
              </Nav.Link>
            )}
            {!token && (
              <Nav.Link onClick={() => navigate("/login")} className="links">
                Login
              </Nav.Link>
            )}
          </Nav>

          <Form className="d-flex">
            <Form.Control
              value={searchTerm}
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={onChangeSearch}
            />
            <button
              variant="dark"
              type="button"
              onClick={onSearch}
              className="button"
            >
              Search
            </button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
