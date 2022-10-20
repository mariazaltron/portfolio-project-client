import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrendingSeries } from "../../store/serie/thunks";
import { previewSerie } from "../../store/serie/slice";
import { selectTrendingSeries } from "../../store/serie/selectors";
import { movieDbImgUrl } from "../../config/constants.js";
import Carousel from "react-bootstrap/Carousel";
import { Button } from "react-bootstrap";
import "./index.css";
import { useNavigate } from "react-router-dom";
import DefaultImage from "../../assets/images/broken-image.png";

export const TrendingSeries = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const trendingSerie = useSelector(selectTrendingSeries);

  // console.log("oieeeee", trendingSerie);
  const viewMore = (result) => {
    dispatch(previewSerie(result));
    navigate(`/serie/details`);
  };

  useEffect(() => {
    dispatch(fetchTrendingSeries());
  }, [dispatch]);

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
                onError={(e) => e.target.src = DefaultImage}
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
