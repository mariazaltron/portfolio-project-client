import { useDispatch, useSelector } from "react-redux";
import {
  getAllWatchlists,
  addNewSharedList,
  shareWithProfile,
} from "../../store/watchList/thunks";
import { useEffect, useState } from "react";
import {
  selectSharedWithOthers,
  selectSharedWithMe,
} from "../../store/watchList/selectors";
import { selectProfiles, selectUser } from "../../store/user/selectors";
import { Table } from "react-bootstrap";
import { RiUser5Fill } from "react-icons/ri";
import { Button, Form, ListGroup, Container } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import "./index.css";
import { getUsers } from "../../store/user/thunks";

export const SharedWatchlists = () => {
  const dispatch = useDispatch();
  const me = useSelector(selectUser);
  const profiles = useSelector(selectProfiles);
  const sharedWithOthers = useSelector(selectSharedWithOthers);
  const sharedWithMe = useSelector(selectSharedWithMe);
  const [editing, setEditing] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [currentSharing, setCurrentSharing] = useState(null);
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

  const doShareWith = (profile, sharedWatchListId) => {
    dispatch(shareWithProfile(profile, sharedWatchListId));
    setSharing(false);
  };

  useEffect(() => {
    dispatch(getAllWatchlists());
  }, [dispatch]);
  return (
    <Container fluid>
      <div>
        <Button onClick={() => setEditing(!editing)}>New shared list</Button>
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
              <Button variant="primary" type="submit" onClick={submitForm}>
                Save shared list
              </Button>
            </Form.Group>
          </Form>
        )}
      </div>

      <div>
        <div className="panel">
          <h5>Watchlists shared with me</h5>
          {sharedWithMe && sharedWithMe.length > 0 ? (
            sharedWithMe.map((sm) => (
              <div>
                <div>
                  <p>{sm.name}</p>
                  <span>
                    <p>Shared with:&nbsp;</p>
                    {sm.users && sm.users.length > 0 ? (
                      sm.users.map((u) => (
                        <span key={u.id}>
                          <RiUser5Fill />
                          <p>{u.name}</p>
                        </span>
                      ))
                    ) : (
                      <p>-</p>
                    )}
                  </span>
                </div>
                <Table striped hover size="sm">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sm.series.map((s) => (
                      <tr>
                        <td>{s.name}</td>
                        <td>{s.sharedWatchListSeries.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            ))
          ) : (
            <p> - </p>
          )}
        </div>
        <div className="panel">
          <h5>Watchlists I've shared with others</h5>
          {sharedWithOthers && sharedWithOthers.length > 0 ? (
            sharedWithOthers.map((so) => (
              <div>
                <div>
                  <p>{so.name}</p>
                  <span>
                    <p>Shared with:&nbsp;</p>
                    {so.users && so.users.length > 0 ? (
                      so.users.map((u) => (
                        <span key={u.id}>
                          <RiUser5Fill />
                          <p>{u.name}</p>
                        </span>
                      ))
                    ) : (
                      <p>-</p>
                    )}
                  </span>
                </div>
                <Table striped hover size="sm">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {so.series.map((s) => (
                      <tr>
                        <td>{s.name}</td>
                        <td>{s.sharedWatchListSeries.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Button onClick={() => startSharing(so.id)}>Share</Button>
                {sharing && currentSharing && currentSharing === so.id && (
                  <ListGroup variant="flush" className="stripped">
                    {profiles &&
                      profiles
                        .filter((p) => p.id !== so.owner)
                        .filter((p) => !so.users.includes(p.id))
                        .map((p) => (
                          <ListGroup.Item key={p.id}>
                            <RiUser5Fill />
                            &nbsp;{p.name}&nbsp;
                            <Button onClick={() => doShareWith(p, so.id)}>
                              Add
                            </Button>
                          </ListGroup.Item>
                        ))}
                  </ListGroup>
                )}
              </div>
            ))
          ) : (
            <p> - </p>
          )}
        </div>
      </div>
    </Container>
  );
};

export default SharedWatchlists;
