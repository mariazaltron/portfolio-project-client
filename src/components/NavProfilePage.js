import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";


export const NavProfilePage = () => {
  return (
    <Nav defaultActiveKey="/home" className="flex-column">
      <Nav.Link href="">Watching</Nav.Link>
      <Nav.Link eventKey="link-1">Completed</Nav.Link>
      <Nav.Link eventKey="link-2">Want to see</Nav.Link>
      <NavDropdown title="Shared WatchList" id="nav-dropdown">
        <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>
        <NavDropdown.Item eventKey="4.2">Another action</NavDropdown.Item>
        <NavDropdown.Item eventKey="4.3">Something else here</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item eventKey="4.4">Separated link</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  );
}

export default NavProfilePage;
