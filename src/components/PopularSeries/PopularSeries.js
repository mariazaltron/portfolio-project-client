import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularSeries } from "../../store/serie/thunks";
import { previewSerie } from "../../store/serie/slice";
import {
  selectPopularSeries,
  selectSerieById,
} from "../../store/serie/selectors";
import { movieDbImgUrl } from "../../config/constants.js";
import Carousel from "react-bootstrap/Carousel";
import { Button } from "react-bootstrap";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap"


export const PopularSeries = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const serieDetails = useSelector(selectSerieById);

  const popularSeries = useSelector(selectPopularSeries);
  // console.log("oie",popularSeries);

  const viewMore = (result) => {
    dispatch(previewSerie(result));
    navigate(`/serie/details`);
  };

  useEffect(() => {
    dispatch(fetchPopularSeries());
  }, [dispatch]);

  return (
    <div>
      <h1>Popular TV Shows</h1>
      <div className="cardSeries">
        {/* <Carousel cols={4} rows={1} gap={10} loop>
          {popularSeries.map((serie) => (
            <Carousel.Item key={serie.id}>
              <Card key={serie.id} width={100} height={150}>
                <Card.Img
                  variant="top"
                  src={movieDbImgUrl + serie.backdrop_path}

                />
                <Card.Body>
                  <Card.Title>{serie.name}</Card.Title>
                  <Button variant="primary" onClick={() => viewMore(serie)}>
                    More
                  </Button>
                </Card.Body>
              </Card>
            </Carousel.Item>
          ))}
        </Carousel> */}
      </div>
    </div>
  );
};
