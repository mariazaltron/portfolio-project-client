import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrendingSeries } from "../../store/serie/thunks";
import { selectTrendingSeries} from "../../store/serie/selectors";
import { selectAppLoading } from "../../store/appState/selectors";
import { movieDbImgUrl } from "../../config/constants.js";
import Carousel from "react-bootstrap/Carousel";
import { Button } from "react-bootstrap"
import "./index.css";

export const TrendingSeries = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectAppLoading);
  const trendingSerie = useSelector(selectTrendingSeries);

  // console.log("oieeeee", trendingSerie);

  useEffect(() => {
    dispatch(fetchTrendingSeries());
  }, []);

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
                <h4>{serie.name}</h4> <Button>More</Button>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
};
