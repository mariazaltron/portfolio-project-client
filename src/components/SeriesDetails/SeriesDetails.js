import { useSelector } from "react-redux";
import ListGroup from "react-bootstrap/ListGroup";
import { UpdateStatusButton } from "../../components/UpdateStatusButton";
import { selectMyList, selectToken } from "../../store/user/selectors";
import { AddListButton } from "../../components/AddListButton";
import { Button, Container, Image, Col, Row } from "react-bootstrap";
import { selectSeriePreview } from "../../store/serie/selectors";
import { movieDbImgUrl } from "../../config/constants";
import { useEffect, useState } from "react";

export const SeriesDetails = () => {
  const serie = useSelector(selectSeriePreview);
  const token = useSelector(selectToken);
  const myList = useSelector(selectMyList);

  const serieInMyList = () => {
    console.log(
      "serieInMyList",
      serie && myList && myList.series.includes((s) => s.tmdb_id === serie.id)
    );
    return (
      serie && myList && myList.series.includes((s) => s.tmdb_id === serie.id)
    );
  };

  const getSerieFromMyList = () => {
    return serie && myList
      ? myList.series
          .filter((s) => s.tmdb_id === serie.id)
          .map((s) => s.watchListSeries)
      : null;
  };

  // console.log("serie", serie);
  // console.log("mylist", myList);

  return (
    serie && (
      <Container fluid>
        <Row>
          <Col>
            <Image
              fluid
              variant="top"
              src={movieDbImgUrl + serie.poster_path}
              alt=""
              width={400}
              height={300}
            />
          </Col>
          <Col>
            <h5>{serie.name}</h5>
            <p>{serie.overview}</p>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>Genres: {serie.genres}</ListGroup.Item>
              <ListGroup.Item>
                Seasons: {serie.number_of_seasons}
              </ListGroup.Item>
              <ListGroup.Item>Rate: {serie.vote_average}</ListGroup.Item>
            </ListGroup>
            {token ? (
              <div>
                {!serieInMyList() && (
                  <AddListButton
                    text="Add to my list"
                    serie={serie}
                    sharedWatchListId={myList.id}
                  ></AddListButton>
                )}
                {serieInMyList() && (
                  <UpdateStatusButton serie={getSerieFromMyList()} />
                )}
              </div>
            ) : (
              <div>
                <Button to="/login">Login to add to lists</Button>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    )
  );
};
