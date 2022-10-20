import { selectSearchSeries } from "../store/serie/selectors";
import { previewSerie } from "../store/serie/slice";
import { selectAppLoading } from "../store/appState/selectors";
import { useSelector, useDispatch } from "react-redux";
import { Button, Card, Col, Row } from "react-bootstrap";
import { movieDbImgUrl } from "../config/constants.js";
import { useNavigate } from "react-router-dom";

export const SearchResults = () => {
  const loading = useSelector(selectAppLoading);
  const results = useSelector(selectSearchSeries);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const viewMore = (result) => {
    dispatch(previewSerie(result));
    navigate(`/serie/details`);
  };

  return loading ? (
    <p>Loading...</p>
  ) : (
    <div className="container-searchresults">
      <Row xs={1} md={6} className="container-searchresults">
        {results.map((result) => (
          <Col key={result.id}>
            <Card className="text-center" border="light">
              <Card.Img
                variant="top"
                src={movieDbImgUrl + result.poster_path}
                // height="350px"
                width="383px"
              />
              <Card.Body>
                <Card.Title className="card-title">{result.name}</Card.Title>
                <Button
                  variant="dark"
                  size="sm"
                  onClick={() => viewMore(result)}
                >
                  More
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};
