import { useDispatch, useSelector } from "react-redux";
import {
  getAllWatchlists,
  addNewSharedList,
  shareWithProfile, addSerieToSomeList,
} from "../../store/watchList/thunks";
import { useEffect, useState } from "react";
import {
  selectSharedWithOthers,
  selectSharedWithMe,
} from "../../store/watchList/selectors";
import { selectProfiles } from "../../store/user/selectors";
import {Accordion, Row, Table} from "react-bootstrap";
import { RiUser5Fill } from "react-icons/ri";
import { Button, Form, Container, ListGroup } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import "./index.css";
import { getUsers } from "../../store/user/thunks";
import {fetchSerieByName} from "../../store/serie/thunks";
import {selectSearchSeries} from "../../store/serie/selectors";
import {IoMdShare} from "react-icons/io";
import {IoSearchCircle} from "react-icons/io5";

export const SharedWatchlists = () => {
  const dispatch = useDispatch();
  const profiles = useSelector(selectProfiles);
  const sharedWithOthers = useSelector(selectSharedWithOthers);
  const sharedWithMe = useSelector(selectSharedWithMe);
  const searchedSeries = useSelector(selectSearchSeries);
  const [editing, setEditing] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [adding, setAdding] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentSharing, setCurrentSharing] = useState(null);
  const [currentAdding, setCurrentAdding] = useState(null);
  const [name, setName] = useState("");

  const submitForm = (event) => {
    event.preventDefault();
    dispatch(addNewSharedList(name));
    setName("");
    setEditing(false);
  };

  const startSharing = (listId) => {
    dispatch(getUsers());
    setCurrentSharing(listId);
    setSharing(!sharing);
  };

  const startAdding = (listId) => {
    setCurrentAdding(listId);
    setAdding(!adding);
  };

  const doShareWith = (profile, sharedWatchListId) => {
    dispatch(shareWithProfile(profile, sharedWatchListId));
    setSharing(false);
  };

  const onChangeSearchTerm = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  }

  const onSearch = () => {
    dispatch(fetchSerieByName(searchTerm))
  }

  const addSerieToList = (serie, listId) => {
    dispatch(addSerieToSomeList(serie, listId))
  }

  useEffect(() => {
    dispatch(getAllWatchlists());
    }, [dispatch]);
  return (
    <Container>
      <div>
        <div className="button-newshared">
          <Button onClick={() => setEditing(!editing)} variant="dark">
            New shared list
          </Button>
        </div>
        {editing && (
          <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
            <Form.Group>
              <Form.Label>Shared List's name</Form.Label>
              <Form.Control
                value={name}
                onChange={(event) => setName(event.target.value)}
                type="text"
                placeholder="Name of your shared list"
                required
              />
            </Form.Group>
            <Form.Group className="mt-5">
              <Button variant="dark" type="submit" onClick={submitForm}>
                Save shared list
              </Button>
            </Form.Group>
          </Form>
        )}
      </div>
      <div className="shared-div">
        <div className="sharedlist-div">
          <h5>Watchlists shared with me</h5>
          {sharedWithMe && sharedWithMe.length > 0 ? (
            sharedWithMe.map((sm) => (
              <Accordion variant="dark" key={sm.id}>
                <Accordion.Item eventKey="0">
                  <Accordion.Header className="acc-head">
                    {sm.name}
                  </Accordion.Header>
                  <Accordion.Body className="acc-body">
                    <Table striped hover variant="dark">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Shared with:</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{sm.name}</td>
                          <td>
                            {sm.users && sm.users.length > 0 ? (
                              sm.users.map((u) => (
                                <div key={u.id}>
                                  <RiUser5Fill />
                                  <p>{u.name}</p>
                                </div>
                              ))
                            ) : (
                              <p> Not shared.</p>
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                    <ListGroup variant="flush">
                      {sm.series ? (
                        sm.series.map((s) => (
                          <ListGroup.Item
                            key={s.id}
                            className="list-group-item-color"
                          >
                            {s.name}
                          </ListGroup.Item>
                        ))
                      ) : (
                        <p> No series in this list.</p>
                      )}
                    </ListGroup>
                    <Button
                      size="xs"
                      onClick={() => startAdding(sm.id)}
                      className="button-space-between"
                    >
                      <IoSearchCircle /> Search for series
                    </Button>
                    {adding && currentAdding && currentAdding === sm.id && (
                      <div>
                        <Form className="d-flex">
                          <Form.Control
                            value={searchTerm}
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            onChange={onChangeSearchTerm}
                          />
                          <Button
                            variant="dark"
                            type="button"
                            onClick={onSearch}
                            className="button"
                          >
                            Search
                          </Button>
                        </Form>
                        <ListGroup variant="flush" className="stripped">
                          {searchedSeries ? (
                            searchedSeries.map((s) => (
                              <ListGroup.Item
                                key={s.id}
                                className="list-group-item-color"
                              >
                                <Row>
                                  <Col>{s.name}</Col>
                                  <Col>
                                    <Button
                                      size="xs"
                                      variant="success"
                                      onClick={() => addSerieToList(s, sm.id)}
                                    >
                                      Add
                                    </Button>
                                  </Col>
                                </Row>
                              </ListGroup.Item>
                            ))
                          ) : (
                            <ListGroup.Item className="list-group-item-color">
                              No series found.
                            </ListGroup.Item>
                          )}
                        </ListGroup>
                      </div>
                    )}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            ))
          ) : (
            <p> No lists. </p>
          )}
        </div>
      </div>
      <div className="shared-div">
        <div className="sharedlist-div">
          <h5>Watchlists I shared with others</h5>
          {sharedWithOthers && sharedWithOthers.length > 0 ? (
            sharedWithOthers.map((so) => (
              <Accordion variant="dark" key={so.id}>
                <Accordion.Item eventKey="0">
                  <Accordion.Header className="acc-head">
                    {so.name}
                  </Accordion.Header>
                  <Accordion.Body className="acc-body">
                    <Table striped hover variant="dark">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Shared with:</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{so.name}</td>
                          <td>
                            {so.users && so.users.length > 0 ? (
                              so.users.map((u) => (
                                <div key={u.id}>
                                  <RiUser5Fill />
                                  <p>{u.name}</p>
                                </div>
                              ))
                            ) : (
                              <p> Not shared.</p>
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                    <ListGroup variant="flush">
                      {so.series ? (
                        so.series.map((s) => (
                          <ListGroup.Item
                            key={s.id}
                            className="list-group-item-color"
                          >
                            {s.name}
                          </ListGroup.Item>
                        ))
                      ) : (
                        <p> No series in this list.</p>
                      )}
                    </ListGroup>
                    <div className="buttons-inside-accordion">
                      <Button
                        onClick={() => startSharing(so.id)}
                        className="button-space-between"
                      >
                        <IoMdShare /> Share
                      </Button>
                      {sharing && currentSharing && currentSharing === so.id && (
                        <ListGroup variant="flush" className="stripped">
                          {profiles &&
                            profiles
                              .filter((p) => p.id !== so.owner)
                              .filter(
                                (p) =>
                                  so.users.filter((u) => u.id === p.id)
                                    .length <= 0
                              )
                              .map((p) => (
                                <ListGroup.Item
                                  key={p.id}
                                  className="list-group-item-color"
                                >
                                  <RiUser5Fill />
                                  &nbsp;{p.name}&nbsp;
                                  <Button onClick={() => doShareWith(p, so.id)}>
                                    Add
                                  </Button>
                                </ListGroup.Item>
                              ))}
                          {!profiles ||
                            (profiles
                              .filter((p) => p.id !== so.owner)
                              .filter(
                                (p) =>
                                  so.users.filter((u) => u.id === p.id)
                                    .length <= 0
                              ).length <= 0 && (
                              <ListGroup.Item className="list-group-item-color">
                                {" "}
                                No users available for sharing.
                              </ListGroup.Item>
                            ))}
                          ))
                        </ListGroup>
                      )}
                      <Button
                        size="xs"
                        onClick={() => startAdding(so.id)}
                        className="button-space-between"
                      >
                        <IoSearchCircle /> Search for series
                      </Button>
                    </div>
                    {adding && currentAdding && currentAdding === so.id && (
                      <div>
                        <Form className="d-flex">
                          <Form.Control
                            value={searchTerm}
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            onChange={onChangeSearchTerm}
                          />
                          <Button
                            variant="dark"
                            type="button"
                            onClick={onSearch}
                            className="button"
                          >
                            Search
                          </Button>
                        </Form>
                        <ListGroup variant="flush" className="stripped">
                          {searchedSeries ? (
                            searchedSeries.map((s) => (
                              <ListGroup.Item
                                key={s.id}
                                className="list-group-item-color"
                              >
                                <Row>
                                  <Col>{s.name}</Col>
                                  <Col>
                                    <Button
                                      size="xs"
                                      variant="success"
                                      onClick={() => addSerieToList(s, so.id)}
                                    >
                                      Add
                                    </Button>
                                  </Col>
                                </Row>
                              </ListGroup.Item>
                            ))
                          ) : (
                            <ListGroup.Item className="list-group-item-color">
                              No series found.
                            </ListGroup.Item>
                          )}
                        </ListGroup>
                      </div>
                    )}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            ))
          ) : (
            <p> No lists. </p>
          )}
        </div>
      </div>
    </Container>
  );
};

export default SharedWatchlists;
