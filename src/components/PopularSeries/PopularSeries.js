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
import DefaultImage from "../../assets/images/broken-image.png";


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
      <div className="cardSeries">
        <h1 className="title-carousel">Popular TV Shows</h1>
        <Carousel slide={false}>
          {popularSeries.map((serie) => (
            <Carousel.Item key={serie.id}>
              <img
                src={movieDbImgUrl + serie.backdrop_path}
                alt="tv serie poster"
                height="300px"
                onError={(e) => (e.target.src = DefaultImage)}
              />
              <Carousel.Caption>
                <h4>{serie.name}</h4>{" "}
                <Button variant="dark" onClick={() => viewMore(serie)}>
                  More
                </Button>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
    </div>
  );
};
