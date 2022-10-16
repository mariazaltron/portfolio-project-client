import { selectSearchSeries, selectSerieById } from "../store/serie/selectors";
import { useSelector, useDispatch } from "react-redux";
import { Button, Card, Col, Row } from "react-bootstrap";
import { movieDbImgUrl } from "../config/constants.js";
import { saveSerie } from "../store/serie/thunks";
import { useNavigate } from "react-router-dom";

export const SearchResults = () => {
  const results = useSelector(selectSearchSeries);
  const serieDetails = useSelector(selectSerieById);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const viewMore = (result) => {
    dispatch(saveSerie(result));
    navigate(`/series/${serieDetails.id}`);
  };

  return (
    <div>
      <Row xs={1} md={5} className="g-4">
        {results.map((result) => (
          <Col key={result.id}>
            <Card>
              <Card.Img
                variant="top"
                src={movieDbImgUrl + result.poster_path}
                height="350px"
                width="383px"
              />
              <Card.Body>
                <Card.Title>{result.name}</Card.Title>
                {/* <Card.Text>{result.overview}</Card.Text> */}
                <Button onClick={() => viewMore(result)}>More</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};
