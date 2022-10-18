import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectSerieById } from "../store/serie/selectors";
import ListGroup from "react-bootstrap/ListGroup";
import { UpdateStatusButton } from "../components/UpdateStatusButton";
import { selectMyList, selectToken } from "../store/user/selectors";
import { AddListButton } from "../components/AddListButton";
import { Button, Container, Image, Col, Row } from "react-bootstrap";

export const SeriesDetails = () => {
  const serie = useSelector(selectSerieById);
  const myList = useSelector(selectMyList);
  const [serieWithWatchList, setSerieWithWatchList] = useState(undefined);
  const token = useSelector(selectToken);

  useEffect(() => {
    if (serie && myList.series) {
      const getSerieWithWatchList = () => {
        return myList.series.find((s) => s.id === serie.id);
      };
      setSerieWithWatchList(getSerieWithWatchList());
    }
  }, []);

  return (
    serie && (
      <Container fluid>
        <Row>
          <Col>
            <Image
              fluid
              variant="top"
              src={serie.poster_path}
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
                {!serieWithWatchList && (
                  <AddListButton
                    text="Add to my list"
                    serieId={serie.id}
                    sharedWatchListId={myList.id}
                  ></AddListButton>
                )}
                {serieWithWatchList && (
                  <UpdateStatusButton serie={serieWithWatchList} />
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
