import { selectSearchSeries } from "../store/serie/selectors";
import { useSelector } from "react-redux";
import { Button, Card, Col, Row } from "react-bootstrap";
import { movieDbImgUrl } from "../config/constants.js";

export const SearchResults = () => {
    const results = useSelector(selectSearchSeries)

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
                <Button>More</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};
