import { useSelector, useDispatch } from "react-redux";
import { selectMyFilteredList, selectToken } from "../store/user/selectors";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { UpdateStatusButton } from "../components/UpdateStatusButton";
import { WatchListFilters } from "../components/WatchListFilters";
import { SharedWatchlists } from "../components/SharedWatchlists";
import { selectActiveFilter } from "../store/user/selectors";
import { getUserWithStoredToken } from "../store/user/thunks";
import "./index.css";
import { act } from "react-dom/test-utils";

export const MyLists = () => {
  const myList = useSelector(selectMyFilteredList);
  const activeFilter = useSelector(selectActiveFilter);
  const token = useSelector(selectToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log("myList is", myList);

  useEffect(() => {
    if (myList === null) {
      dispatch(getUserWithStoredToken());
    }
  }, [dispatch, myList]);

  return (
    <Container>
      <Row>
        <Col xs={4} md={2}>
          <WatchListFilters />
        </Col>
        <Col xs={12} md={8}>
          {myList &&
            activeFilter !== "share" &&
            myList.series.map((serie) => (
              <div key={serie.id}>
                <h6>{serie.name}</h6>
                <UpdateStatusButton serie={serie} />
              </div>
            ))}
          {activeFilter === "share" && <SharedWatchlists />}
        </Col>
      </Row>
    </Container>
  );
};
