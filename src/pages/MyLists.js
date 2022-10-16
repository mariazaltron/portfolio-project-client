import { useSelector, useDispatch } from "react-redux";
import { selectMyList, selectToken } from "../store/user/selectors";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import "./index.css";

export const MyLists = () => {
    const myList = useSelector(selectMyList);
    const token = useSelector(selectToken);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    console.log("oie from watchlist", myList)

      // if (token === null) {
      //   navigate("/");
      // }

      // if (myList === null) {
      //   return <p>Loading...</p>;
      // }
  return (
    <Container>
      {/* Stack the columns on mobile by making one full-width and the other half-width */}
      <Row>
        <Col xs={4} md={2}>
          <h6>Watching</h6>
          <h6>Completed</h6>
          <h6>Want to see</h6>
          <h6> Shared WatchLists</h6>
        </Col>
        <Col xs={12} md={8}>
          {myList.series.map((serie) => (
            <div>
              <h6>{serie.name}</h6>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {serie}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    Another action
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    Something else
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          ))}
        </Col>
      </Row>
    </Container>
  );
};
