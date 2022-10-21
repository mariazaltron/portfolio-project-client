import { useSelector, useDispatch } from "react-redux";
import { selectMyList } from "../store/user/selectors";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { UpdateStatusButton } from "../components/UpdateStatusButton";
import { WatchListFilters } from "../components/WatchListFilters/WatchListFilters";
import { selectActiveFilter } from "../store/user/selectors";
import { deleteSerieFromWatchlist } from "../store/watchList/thunks";
import { Button, ListGroup } from "react-bootstrap";
import { movieDbImgUrl } from "../config/constants";
import DefaultImage from "../assets/images/broken-image.png";

import "./index.css";
import {useEffect, useState} from "react";

export const MyLists = () => {
  const myList = useSelector(selectMyList);
  const activeFilter = useSelector(selectActiveFilter);
  const [series, setSeries] = useState([]);
  const dispatch = useDispatch();
  console.log("myList is", myList);

  const deleteSerie = (watchlistsId, serieId) => {
    dispatch(deleteSerieFromWatchlist(watchlistsId, serieId));
  };

  const getSeriesByFilter = () => {
    if(!myList && !myList.series) return [];
    return myList.series.filter(s => activeFilter === "all" || s.watchListSeries.status === activeFilter).sort()
  }

  useEffect(() => {
    setSeries(getSeriesByFilter())
  }, [activeFilter, myList]);

  return (
    <Container fluid className="mylist-container">
      <Row>
        <Col xs={4} md={2}>
          <WatchListFilters />
        </Col>
        <Col xs={12} md={8}>
          {myList && activeFilter !== "share" && (
            <ListGroup bg="dark" >
              {myList.series && myList.series.length > 0 ? (
                series.map(serie => {
                  // <p>{serie.name}</p>
                  // console.log("serie", serie);
                  return (
                    <ListGroup.Item key={serie.id}>
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
                              onError={(e) => (e.target.src = DefaultImage)}
                            />
                          </ListGroup.Item>
                          <ListGroup.Item className="title-serie-list">
                            <h6>{serie.name}</h6>
                          </ListGroup.Item>
                        </div>
                        <div className="list-buttons">
                          <ListGroup.Item md="auto">
                            <UpdateStatusButton
                              serie={serie.watchListSeries}
                              className="button-mylist"
                            />
                          </ListGroup.Item>
                          <ListGroup.Item xs="true" lg="2">
                            <Button
                              variant="danger"
                              onClick={() => deleteSerie(myList.id, serie.id)}
                              className="button-mylist"
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
