import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSerieById } from "../store/serie/selectors";
import { fetchSerieById } from "../store/serie/thunks";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { UpdateStatusButton } from "../components/UpdateStatusButton";
import { selectMyList } from "../store/user/selectors";
import { AddListButton } from "../components/AddListButton";

export const SeriesDetails = ({ serieId }) => {
  const serie = useSelector(selectSerieById);
  const myList = useSelector(selectMyList);
  const [serieWithWatchList, setSerieWithWatchList] = useState(undefined);

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
      <Card style={{ width: "30%" }}>
        <Card.Img variant="top" src={serie.poster_path} alt="" />
        <Card.Body>
          <Card.Title>{serie.name}</Card.Title>
          <Card.Text>{serie.overview}</Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>Genres: {serie.genres}</ListGroup.Item>
          <ListGroup.Item>Seasons: {serie.number_of_seasons}</ListGroup.Item>
          <ListGroup.Item>Rate: {serie.vote_average}</ListGroup.Item>
        </ListGroup>
        <Card.Body>
          {!serieWithWatchList && (
            <AddListButton
              text="Add to list"
              serieId={serie.id}
              sharedWatchListId={myList.id}
            ></AddListButton>
          )}
          {serieWithWatchList && (
            <UpdateStatusButton serie={serieWithWatchList} />
          )}
        </Card.Body>
      </Card>
    )
  );
};
