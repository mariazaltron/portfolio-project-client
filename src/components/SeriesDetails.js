import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSerieById } from "../store/serie/selectors";
import { useParams } from "react-router-dom";
import { fetchSerieById } from "../store/serie/thunks";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Button } from "react-bootstrap"

export const SeriesDetails = () => {
  const dispatch = useDispatch();
  const serie = useSelector(selectSerieById);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchSerieById(id));
  }, [dispatch, id]);

  return (
    <Card style={{ width: '30%' }}>
      <Card.Img variant="top" src={serie.poster_path} alt=""/>
      <Card.Body>
        <Card.Title>{serie.name}</Card.Title>
        <Card.Text>
          {serie.overview}
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Genres: {serie.genres}</ListGroup.Item>
        <ListGroup.Item>Seasons: {serie.number_of_seasons}</ListGroup.Item>
        <ListGroup.Item>Rate: {serie.vote_average}</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Button>Add to list</Button>
      </Card.Body>
    </Card>
    
  );
};
