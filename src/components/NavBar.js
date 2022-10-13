import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "../store/user/selectors";
import { logOut } from "../store/user/slice";
import { clearSerieById } from "../store/serie/slice";
import { fetchSerieByName } from "../store/serie/thunks";

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
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">WatchList</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
            {token ? (
              <div>
                <Button onClick={clearUser}>Logout</Button>
                <Nav.Link href="/mylists">My Lists</Nav.Link>
              </div>
            ) : (
              <div>
                <Nav.Link href="/signup">SignUp</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
              </div>
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
            <Button variant="outline-success" type="button" onClick={onSearch}>
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
