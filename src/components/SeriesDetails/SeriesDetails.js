import {useDispatch, useSelector} from "react-redux";
import { UpdateStatusButton } from "../UpdateStatusButton";
import { selectMyList, selectToken } from "../../store/user/selectors";
import { Button, Container, Image, Col, Row, Card } from "react-bootstrap";
import { selectSeriePreview } from "../../store/serie/selectors";
import { addSerieToMyList } from "../../store/watchList/thunks";
import { movieDbImgUrl } from "../../config/constants";
import { IoMdLogIn, IoMdAddCircleOutline } from "react-icons/io";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import "./index.css";
import DefaultImage from "../../assets/images/broken-image.png";


export const SeriesDetails = () => {
  const serie = useSelector(selectSeriePreview);
  const token = useSelector(selectToken);
  const myList = useSelector(selectMyList);
  const [serieInMyList, setSerieInMyList] = useState(false)
  const [serieFromMyList, setSerieFromMyList] = useState(null)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isSerieInMyList = () => {
    return serie && myList && myList.series.filter((s) => s.tmdb_id === serie.id).length > 0;
  };

  const getSerieFromMyList = () => {
    return serie && myList
    ? myList.series
    .filter((s) => s.tmdb_id === serie.id)
    .map((s) => s.watchListSeries).at(0)
    : null;
  };

  useEffect(() => {
    // console.log("seriePreview", serie)
    // console.log("is serie in my list ? ", isSerieInMyList())
    // console.log("serie from my list ? ", getSerieFromMyList())
    setSerieInMyList(isSerieInMyList());
    setSerieFromMyList(getSerieFromMyList());
    }, [serie, myList]);

  const addToList = () => {
    dispatch(addSerieToMyList(serie, myList.id))
  }

  // console.log("serie", serie);
  // console.log("mylist", myList);

  return (
    serie && (
      <Container fluid>
        <Row className="row-seriedetailspage">
          <Col>
            <Image
              className="img-seriedetailspage"
              fluid
              variant="top"
              src={movieDbImgUrl + serie.poster_path}
              alt=""
              width={400}
              height={300}
              onError={(e) => e.target.src = DefaultImage}
            />
          </Col>
          <Col className="col-seriedetailspage">
            <Card bg="dark" border="light" className="card-seriedetailspage">
              <Card.Body>
                <Card.Title className="title-seriedetailspage">{serie.name}</Card.Title>
                <Card.Text className="text-seriedetailspage">{serie.overview}</Card.Text>
                <Card.Text className="text-seriedetailspage">Rate: {serie.vote_average}</Card.Text>
                {token ? (
                  <div>
                    {!serieInMyList && (
                      <Button size="sm" onClick={() => addToList()}>
                        <IoMdAddCircleOutline /> Add
                      </Button>
                    )}
                    {serieInMyList && (
                      <UpdateStatusButton serie={serieFromMyList} />
                    )}
                  </div>
                ) : (
                  <div>
                    <Button size="sm" onClick={() => navigate("/login")}>
                      <IoMdLogIn /> Login to add
                    </Button>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <div></div>
      </Container>
    )
  );
};
