import { useSelector, useDispatch } from "react-redux";
import { selectMyFilteredList, selectToken } from "../store/user/selectors";
import { selectAppLoading } from "../store/appState/selectors";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { UpdateStatusButton } from "../components/UpdateStatusButton";
import { WatchListFilters } from "../components/WatchListFilters";
import { SharedWatchlists } from "../components/SharedWatchlists/SharedWatchlists";
import { selectActiveFilter } from "../store/user/selectors";
import { getUserWithStoredToken } from "../store/user/thunks";
import { deleteSerieFromWatchlist } from "../store/watchList/thunks";
import { Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { movieDbImgUrl } from "../config/constants";

import "./index.css";

export const MyLists = () => {
  const loading = useSelector(selectAppLoading);
  const myList = useSelector(selectMyFilteredList);
  const activeFilter = useSelector(selectActiveFilter);
  const token = useSelector(selectToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log("myList is", myList);

  const deleteSerie = (watchlistsId, serieId) => {
    dispatch(deleteSerieFromWatchlist(watchlistsId, serieId));
  };

  // useEffect(() => {
  //   if (myList === null) {
  //     dispatch(getUserWithStoredToken());
  //   }
  // }, [dispatch, myList]);

  return (
    // <div>My lists</div>
    <Container fluid className="mylist-container">
      <Row>
        <Col xs={4} md={2}>
          <WatchListFilters />
        </Col>
        <Col xs={12} md={8}>
          {myList && activeFilter !== "share" && (
            <ListGroup>
              {myList.series && myList.series.length > 0 ? (
                myList.series.map((serie) => {
                  // <p>{serie.name}</p>
                  // console.log("serie", serie);
                  return (
                    <ListGroup.Item>
                      <ListGroup
                        key={serie.id}
                        horizontal
                        className="series-list"
                      >
                        <div className="img-name-list">
                          <ListGroup.Item className="image-list">
                            <img
                              src={movieDbImgUrl + serie.poster_path}
                              alt="tv serie poster"
                              height="100px"
                            />
                          </ListGroup.Item>
                          <ListGroup.Item className="title-serie-list">
                            <h6>{serie.name}</h6>
                          </ListGroup.Item>
                        </div>
                        <div className="list-buttons">
                          <ListGroup.Item md="auto">
                            <UpdateStatusButton serie={serie.watchListSeries} />
                          </ListGroup.Item>
                          <ListGroup.Item xs="true" lg="2">
                            <Button
                              variant="danger"
                              onClick={() => deleteSerie(myList.id, serie.id)}
                            >
                              Delete
                            </Button>
                          </ListGroup.Item>
                        </div>
                      </ListGroup>
                    </ListGroup.Item>
                  );
                })
              ) : (
                <p> - </p>
              )}
            </ListGroup>
          )}
          {/* {activeFilter === "share" && <SharedWatchlists />} */}
        </Col>
      </Row>
    </Container>
  );
};
