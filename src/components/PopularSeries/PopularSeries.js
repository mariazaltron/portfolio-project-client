import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularSeries } from "../../store/serie/thunks";
import { selectPopularSeries } from "../../store/serie/selectors";
import { selectAppLoading } from "../../store/appState/selectors";
import { movieDbImgUrl } from "../../config/constants.js";
import Carousel from "react-bootstrap/Carousel";
import { Button } from "react-bootstrap"
import "./index.css";

export const PopularSeries = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectAppLoading);
  const popularSeries = useSelector(selectPopularSeries);

  // console.log("oie",popularSeries);

  useEffect(() => {
    dispatch(fetchPopularSeries());
  }, []);

  return (
    <div>
      <h1>Popular TV Shows</h1>
      <div className="cardSeries">
        <Carousel fade="true">
          {popularSeries.map((serie) => (
            <Carousel.Item>
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
