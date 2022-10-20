import {useDispatch, useSelector} from "react-redux";
import ListGroup from "react-bootstrap/ListGroup";
import { UpdateStatusButton } from "../UpdateStatusButton";
import { selectMyList, selectToken } from "../../store/user/selectors";
import { Button, Container, Image, Col, Row } from "react-bootstrap";
import { selectSeriePreview } from "../../store/serie/selectors";
import { addSerieToMyList } from "../../store/watchList/thunks";
import { movieDbImgUrl } from "../../config/constants";
import { IoMdLogIn, IoMdAddCircleOutline } from "react-icons/io";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

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
    console.log("seriePreview", serie)
    console.log("is serie in my list ? ", isSerieInMyList())
    console.log("serie from my list ? ", getSerieFromMyList())
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
              <ListGroup.Item>Rate: {serie.vote_average}</ListGroup.Item>
            </ListGroup>
            {token ? (
              <div>
                {!serieInMyList && (
                  <Button size="sm" onClick={() => addToList()}><IoMdAddCircleOutline /> Add</Button>
                )}
                {serieInMyList && (
                  <UpdateStatusButton serie={serieFromMyList} />
                )}
              </div>
            ) : (
              <div>
                <Button size="sm" onClick={() => navigate("/login")}><IoMdLogIn /> Login to add</Button>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    )
  );
};
