import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrendingSeries, saveSerie } from "../../store/serie/thunks";
import {
  selectTrendingSeries,
  selectSerieById,
} from "../../store/serie/selectors";
import { movieDbImgUrl } from "../../config/constants.js";
import Carousel from "react-bootstrap/Carousel";
import { Button } from "react-bootstrap";
import "./index.css";
import { useNavigate } from "react-router-dom";

export const TrendingSeries = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const serieDetails = useSelector(selectSerieById);
  const trendingSerie = useSelector(selectTrendingSeries);

  // console.log("oieeeee", trendingSerie);
  const viewMore = (result) => {
    dispatch(saveSerie(result));
  };

  useEffect(() => {
    if (serieDetails !== null) {
      navigate(`/series/${serieDetails.id}`);
    }
    dispatch(fetchTrendingSeries());
  }, [dispatch, navigate, serieDetails]);

  return (
    <div>
      <h1>Trending TV Shows</h1>
      <div className="cardSeries">
        <Carousel fade="true">
          {trendingSerie.map((serie) => (
            <Carousel.Item key={serie.id}>
              <img
                src={movieDbImgUrl + serie.backdrop_path}
                alt="tv serie poster"
                height="300px"
              />
              <Carousel.Caption>
                <h4>{serie.name}</h4>{" "}
                <Button onClick={() => viewMore(serie)}>More</Button>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
};
