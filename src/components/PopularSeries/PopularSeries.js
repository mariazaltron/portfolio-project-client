import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularSeries, saveSerie } from "../../store/serie/thunks";
import {
  selectPopularSeries,
  selectSerieById,
} from "../../store/serie/selectors";
import { movieDbImgUrl } from "../../config/constants.js";
import Carousel from "react-bootstrap/Carousel";
import { Button } from "react-bootstrap";
import "./index.css";
import { useNavigate } from "react-router-dom";

export const PopularSeries = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const serieDetails = useSelector(selectSerieById);

  const popularSeries = useSelector(selectPopularSeries);
  // console.log("oie",popularSeries);

  const viewMore = (result) => {
    dispatch(saveSerie(result)).then(() => {
      navigate(`/series/${serieDetails.id}`);
    });
  };

  useEffect(() => {
    dispatch(fetchPopularSeries());
  }, [dispatch]);

  return (
    <div>
      <h1>Popular TV Shows</h1>
      <div className="cardSeries">
        <Carousel fade="true">
          {popularSeries.map((serie) => (
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
