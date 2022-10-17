import { useDispatch, useSelector } from "react-redux";
import { getAllWatchlists } from "../store/watchList/thunks";
import { useEffect } from "react";
import {
  selectSharedWithOthers,
  selectSharedWithMe,
} from "../store/watchList/selectors";
import { Table } from "react-bootstrap";
import { RiUser5Fill } from "react-icons/ri";

export const SharedWatchlists = () => {
  const dispatch = useDispatch();
  const sharedWithOthers = useSelector(selectSharedWithOthers);
  const sharedWithMe = useSelector(selectSharedWithMe);

  useEffect(() => {
    dispatch(getAllWatchlists());
  }, [dispatch]);
  return (
    <div>
      <h3>Watchlists shared with me</h3>
      {sharedWithMe &&
        sharedWithMe.map((sm) => (
          <div>
            <p>Owner:</p>
            <p>{sm.owner}</p>
            <p>Shared with:</p>
            <p>
              {sm.users.map((u) => (
                <span>
                  <RiUser5Fill /> {u.name}
                </span>
              ))}
            </p>
            <Table striped bordered hover>
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
        ))}

      <h3>Watchlists I've shared with others</h3>
      {sharedWithMe &&
        sharedWithOthers.map((so) => (
          <div>
            <p>Owner:</p>
            <p>{so.owner}</p>
            <p>Shared with:</p>
            <p>
              {so.users.map((u) => (
                <span>
                  <RiUser5Fill /> {u.name}
                </span>
              ))}
            </p>
            <Table striped bordered hover>
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
          </div>
        ))}
    </div>
  );
};

export default SharedWatchlists;
