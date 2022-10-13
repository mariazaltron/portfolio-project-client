import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSerieById } from "../store/serie/selectors";
import { useParams } from "react-router-dom";
import { fetchSerieById } from "../store/serie/thunks";

export const SeriesDetails = () => {
  const dispatch = useDispatch();
  const serie = useSelector(selectSerieById);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchSerieById(id));
  }, [dispatch, id]);

  return (
    <div>
      <h2>Serie</h2>
      <div>
        <h2>{serie.name}</h2>
        <p>{serie.genres}</p>
        <p>Seasons: {serie.number_of_seasons}</p>
        <img src={serie.poster_path} alt="" width="200px" height="300px" />
        <p>{serie.overview}</p>
        <p>Rate: {serie.vote_average}</p>
      </div>
    </div>
  );
};
